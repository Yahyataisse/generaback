import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function GET(request: NextRequest) {
  let connection;
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('userEmail');
    const threadId = searchParams.get('threadId');

    if (!userEmail || !threadId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      `SELECT id, user_email, thread_id, message_text, response_text, message_type, created_at 
       FROM chat_conversations 
       WHERE user_email = ? AND thread_id = ? 
       ORDER BY created_at ASC`,
      [userEmail, threadId]
    );

    return NextResponse.json({ messages: rows });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chat history' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}