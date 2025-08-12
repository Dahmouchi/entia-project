/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/courses/[courseId]/quizzes/route.ts
import { createQuiz, deleteAllCourseQuizzes, getQuizzesByCourse } from '@/actions/quizResults';
import { NextRequest, NextResponse } from 'next/server';

// GET - Récupérer tous les quiz d'un cours
export async function GET(
   req: NextRequest, 
   { params }: { params: Promise<{ courseId: any }>; }
) {
  const courseId = (await params).courseId;
  try {

    if (!courseId) {
      return NextResponse.json(
        { success: false, error: 'ID du cours manquant' },
        { status: 400 }
      );
    }

    const result = await getQuizzesByCourse(courseId);

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }

  } catch (error) {
    console.error('Erreur dans GET /api/courses/[courseId]/quizzes:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau quiz pour un cours
export async function POST(
  request: NextRequest, 
   { params }: { params: Promise<{ courseId: any }>; }
) {
  const courseId = (await params).courseId;
  try {

    if (!courseId) {
      return NextResponse.json(
        { success: false, error: 'ID du cours manquant' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // Valider la structure des données
    if (!body.title || !body.questions) {
      return NextResponse.json(
        { success: false, error: 'Titre et questions requis' },
        { status: 400 }
      );
    }

    const quizData = {
      title: body.title,
      courseId: courseId,
      questions: body.questions
    };

    const result = await createQuiz(quizData);

    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }

  } catch (error) {
    console.error('Erreur dans POST /api/courses/[courseId]/quizzes:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer tous les quiz d'un cours
export async function DELETE(
  req: NextRequest, 
   { params }: { params: Promise<{ courseId: any }>; }
) {
  const courseId = (await params).courseId;
  try {

    if (!courseId) {
      return NextResponse.json(
        { success: false, error: 'ID du cours manquant' },
        { status: 400 }
      );
    }

    const result = await deleteAllCourseQuizzes(courseId);

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }

  } catch (error) {
    console.error('Erreur dans DELETE /api/courses/[courseId]/quizzes:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}