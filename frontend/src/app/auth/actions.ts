'use server';

import { createTrialCheckout } from '@/lib/api/billing-v2';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// نظام البريد الإلكتروني الموجود (يبقى كما هو)
async function sendWelcomeEmail(email: string, name?: string) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const adminApiKey = process.env.KORTIX_ADMIN_API_KEY;
    
    if (!adminApiKey) {
      console.error('KORTIX_ADMIN_API_KEY not configured');
      return;
    }
    
    const response = await fetch(`${backendUrl}/api/send-welcome-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Api-Key': adminApiKey,
      },
      body: JSON.stringify({
        email,
        name,
      }),
    });

    if (response.ok) {
      console.log('✅ Welcome email sent successfully');
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error(`❌ Failed to queue welcome email for ${email}:`, errorData);
    }
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
  }
}

// ==================== دوال MySQL المساعدة ====================

/**
 * تخزين المستخدم في MySQL
 */
async function storeUserInMySQL(email: string, password: string, supabaseUserId: string, provider: string = 'supabase') {
  try {
    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // إدخال المستخدم في جدول genera
    await query(
      `INSERT INTO genera (email, password, provider, provider_id, supabase_uid, email_verified, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, TRUE, NOW(), NOW())`,
      [email, hashedPassword, provider, supabaseUserId, supabaseUserId]
    );
    
    console.log('✅ User stored in MySQL successfully');
    return true;
  } catch (error) {
    console.error('❌ Error storing user in MySQL:', error);
    return false;
  }
}

/**
 * تحديث بيانات المستخدم في MySQL
 */
async function updateUserInMySQL(email: string, updates: any) {
  try {
    const updateFields = [];
    const updateValues = [];
    
    for (const [key, value] of Object.entries(updates)) {
      updateFields.push(`${key} = ?`);
      updateValues.push(value);
    }
    
    if (updateFields.length > 0) {
      await query(
        `UPDATE genera SET ${updateFields.join(', ')}, updated_at = NOW() WHERE email = ?`,
        [...updateValues, email]
      );
      console.log('✅ User updated in MySQL successfully');
    }
    return true;
  } catch (error) {
    console.error('❌ Error updating user in MySQL:', error);
    return false;
  }
}

/**
 * التحقق من وجود المستخدم في MySQL
 */
async function checkUserInMySQL(email: string) {
  try {
    const users = await query(
      'SELECT id FROM genera WHERE email = ?',
      [email]
    ) as any[];
    
    return users.length > 0;
  } catch (error) {
    console.error('❌ Error checking user in MySQL:', error);
    return false;
  }
}

// ==================== دوال المصادقة الرئيسية ====================

export async function signIn(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const returnUrl = formData.get('returnUrl') as string | undefined;

  if (!email || !email.includes('@')) {
    return { message: 'Please enter a valid email address' };
  }

  if (!password || password.length < 6) {
    return { message: 'Password must be at least 6 characters' };
  }

  const supabase = await createClient();

  // ✅ 1. تسجيل الدخول عبر Supabase (النظام الحالي)
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { message: error.message || 'Could not authenticate user' };
  }

  // ✅ 2. التخزين/التحديث في MySQL (الإضافة الجديدة)
  if (data.user) {
    try {
      const userExists = await checkUserInMySQL(email);
      
      if (!userExists) {
        // تخزين المستخدم الجديد في MySQL
        await storeUserInMySQL(email, password, data.user.id, 'supabase');
      } else {
        // تحديث آخر وقت تسجيل دخول
        await updateUserInMySQL(email, { 
          last_login: new Date(),
          supabase_uid: data.user.id 
        });
      }
    } catch (mysqlError) {
      console.error('❌ MySQL operation failed during sign in:', mysqlError);
      // لا نعيد الخطأ حتى لا نؤثر على تجربة المستخدم
    }
  }

  // Use client-side navigation instead of server-side redirect
  return { success: true, redirectTo: returnUrl || '/dashboard' };
}

export async function signUp(prevState: any, formData: FormData) {
  const origin = formData.get('origin') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const returnUrl = formData.get('returnUrl') as string | undefined;

  if (!email || !email.includes('@')) {
    return { message: 'Please enter a valid email address' };
  }

  if (!password || password.length < 6) {
    return { message: 'Password must be at least 6 characters' };
  }

  if (password !== confirmPassword) {
    return { message: 'Passwords do not match' };
  }

  const supabase = await createClient();

  // ✅ 1. إنشاء حساب عبر Supabase (النظام الحالي)
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?returnUrl=${encodeURIComponent(returnUrl || '/dashboard')}`,
    },
  });

  if (error) {
    return { message: error.message || 'Could not create account' };
  }

  // ✅ 2. تخزين المستخدم في MySQL (الإضافة الجديدة)
  if (data.user) {
    await storeUserInMySQL(email, password, data.user.id, 'supabase');
  }

  const userName = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // محاولة تسجيل الدخول تلقائياً
  const { error: signInError, data: signInData } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInData && signInData.user) {
    sendWelcomeEmail(email, userName);
  }

  if (signInError) {
    return {
      message: 'Account created! Check your email to confirm your registration.',
    };
  }

  // Use client-side navigation instead of server-side redirect
  return { success: true, redirectTo: returnUrl || '/dashboard' };
}

export async function forgotPassword(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const origin = formData.get('origin') as string;

  if (!email || !email.includes('@')) {
    return { message: 'Please enter a valid email address' };
  }

  const supabase = await createClient();

  // ✅ 1. استعادة كلمة المرور عبر Supabase (النظام الحالي)
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/reset-password`,
  });

  if (error) {
    return { message: error.message || 'Could not send password reset email' };
  }

  // ✅ 2. تحديث حالة استعادة كلمة المرور في MySQL (الإضافة الجديدة)
  try {
    const resetToken = uuidv4();
    const resetTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    await updateUserInMySQL(email, {
      reset_token: resetToken,
      reset_token_expires: resetTokenExpires
    });
  } catch (mysqlError) {
    console.error('❌ Failed to update MySQL for password reset:', mysqlError);
  }

  return {
    success: true,
    message: 'Check your email for a password reset link',
  };
}

export async function resetPassword(prevState: any, formData: FormData) {
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || password.length < 6) {
    return { message: 'Password must be at least 6 characters' };
  }

  if (password !== confirmPassword) {
    return { message: 'Passwords do not match' };
  }

  const supabase = await createClient();

  // ✅ 1. إعادة تعيين كلمة المرور عبر Supabase (النظام الحالي)
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return { message: error.message || 'Could not update password' };
  }

  // ✅ 2. تحديث كلمة المرور في MySQL (الإضافة الجديدة)
  if (data.user?.email) {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      await updateUserInMySQL(data.user.email, {
        password: hashedPassword,
        reset_token: null,
        reset_token_expires: null
      });
    } catch (mysqlError) {
      console.error('❌ Failed to update password in MySQL:', mysqlError);
    }
  }

  return {
    success: true,
    message: 'Password updated successfully',
  };
}

export async function signOut() {
  const supabase = await createClient();
  
  // ✅ الحصول على البريد الإلكتروني قبل تسجيل الخروج
  const { data: { user } } = await supabase.auth.getUser();
  
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { message: error.message || 'Could not sign out' };
  }

  // ✅ تحديث آخر وقت تسجيل خروج في MySQL (الإضافة الجديدة)
  if (user?.email) {
    try {
      await updateUserInMySQL(user.email, { last_logout: new Date() });
    } catch (mysqlError) {
      console.error('❌ Failed to update logout time in MySQL:', mysqlError);
    }
  }

  return redirect('/');
}