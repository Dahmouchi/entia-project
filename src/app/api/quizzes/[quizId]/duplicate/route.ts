/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/quizzes/[quizId]/duplicate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { duplicateQuiz } from '@/actions/quizResults';

// POST - Dupliquer un quiz
export async function POST(
  request: NextRequest, 
   { params }: { params: Promise<{ quizId: any }>; }
) {
  const quizId = (await params).quizId;
  try {

    if (!quizId) {
      return NextResponse.json(
        { success: false, error: 'ID du quiz manquant' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const newTitle = body.title;

    const result = await duplicateQuiz(quizId, newTitle);

    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }

  } catch (error) {
    console.error('Erreur dans POST /api/quizzes/[quizId]/duplicate:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}