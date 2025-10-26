import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function POST(request: NextRequest) {
  let connection;
  try {
    const { userEmail, threadId, messageText, responseText, messageType } = await request.json();

    connection = await mysql.createConnection(dbConfig);

    const [result] = await connection.execute(
      `INSERT INTO chat_conversations 
       (user_email, thread_id, message_text, response_text, message_type) 
       VALUES (?, ?, ?, ?, ?)`,
      [userEmail, threadId, messageText, responseText, messageType]
    );

    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to save message' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}