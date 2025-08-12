/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/quizzes/[quizId]/validate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { validateQuizAnswers } from '@/actions/quizResults';

// POST - Valider les réponses d'un quiz
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
    
    if (!body.answers || !Array.isArray(body.answers)) {
      return NextResponse.json(
        { success: false, error: 'Réponses requises sous forme de tableau' },
        { status: 400 }
      );
    }

    const result = await validateQuizAnswers(quizId, body.answers);

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }

  } catch (error) {
    console.error('Erreur dans POST /api/quizzes/[quizId]/validate:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}