// app/api/quizzes/[quizId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  getQuizById,
  updateQuiz,
  deleteQuiz,
  getQuizStats,
} from "@/actions/quizResults";

// GET - Récupérer un quiz spécifique par ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: any }> }
) {
  const quizId = (await params).quizId;
  try {
    const { searchParams } = new URL(request.url);
    const includeStats = searchParams.get("stats") === "true";

    if (!quizId) {
      return NextResponse.json(
        { success: false, error: "ID du quiz manquant" },
        { status: 400 }
      );
    }

    let result;
    if (includeStats) {
      result = await getQuizStats(quizId);
    } else {
      result = await getQuizById(quizId);
    }

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 404 });
    }
  } catch (error) {
    console.error("Erreur dans GET /api/quizzes/[quizId]:", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un quiz
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: any }> }
) {
  const quizId = (await params).quizId;
  try {
    if (!quizId) {
      return NextResponse.json(
        { success: false, error: "ID du quiz manquant" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const result = await updateQuiz(quizId, body);

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    console.error("Erreur dans PUT /api/quizzes/[quizId]:", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un quiz
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: any }> }
) {
  const quizId = (await params).quizId;
  try {
    if (!quizId) {
      return NextResponse.json(
        { success: false, error: "ID du quiz manquant" },
        { status: 400 }
      );
    }

    const result = await deleteQuiz(quizId);

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 404 });
    }
  } catch (error) {
    console.error("Erreur dans DELETE /api/quizzes/[quizId]:", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
