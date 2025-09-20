/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import prisma from "@/lib/prisma"
import OpenAI from "openai";
// AI Client (if you need MagicNote generation here)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// -------------------------------
// CRUD Functions for Notes
// -------------------------------

// ✅ Create a new note
export async function createNote(userId: string, courseId: string, content: string) {
  return prisma.note.create({
    data: {
      content,
      userId,
      courseId,
    },
  });
}

// ✅ Get all notes for a user (optionally by course)
export async function getNotes(userId: string, courseId?: string) {
  return prisma.note.findMany({
    where: {
      userId,
      ...(courseId ? { courseId } : {}),
    },
    include: {
      magicNote: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

// ✅ Get one note by ID
export async function getNoteById(noteId: string) {
  return prisma.note.findUnique({
    where: { id: noteId },
    include: { magicNote: true },
  });
}

// ✅ Update a note
export async function updateNote(noteId: string, content: string) {
  return prisma.note.update({
    where: { id: noteId },
    data: { content },
  });
}

// ✅ Delete a note
export async function deleteNote(noteId: string) {
  return prisma.note.delete({
    where: { id: noteId },
  });
}

// -------------------------------
// AI: Generate MagicNote
// -------------------------------
export async function generateMagicNoteServer(
  type: string,
  noteIds: string[],
  courseTitle: string,
  lang: "fr" | "ar" | "en" = "fr"
) {
  
  // 1. Fetch notes content
  const notes = await prisma.note.findMany({
    where: { id: { in: noteIds } },
    select: { content: true },
  });

  const combinedNotes = notes.map((n) => n.content.trim()).join("\n\n");

  // Early check: no notes or very short
  if (!combinedNotes || combinedNotes.length < 30) {
    return {
      summary: `⚠️ Vos notes sont trop courtes ou inexistantes pour générer un résumé utile.`,
      schema: {},
    };
  }

  // 2. AI prompt with validation instructions
  const prompt = `
  You are an AI study assistant for Moroccan students.
  Course title: "${courseTitle}".
  Language: ${lang}.
  
  TASK:
  - Analyze the provided student notes.
  - If the notes are unrelated to the course OR too poor to extract value,
    respond with:
    {
      "summary": "⚠️ Notes insuffisantes ou non pertinentes pour générer un résumé.",
      "schema": {}
    }
  - Otherwise:
    - "summary": generate concise exam-focused notes.
    - "schema": generate a structured hierarchical JSON outline (intro, points, conclusion).

  NOTES:
  ${combinedNotes}
  `;

  // 3. Call OpenAI
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  let result: any;
  try {
    result = JSON.parse(response.choices[0].message?.content || "{}");
  } catch (err) {
    console.error("AI response parsing failed:", err);
    result = {
      summary: "⚠️ Erreur lors de la génération de contenu.",
      schema: {},
    };
  }

  // 4. Post-check: make sure both fields exist
  if (!result.summary || typeof result.summary !== "string") {
    result.summary =
      "⚠️ Notes insuffisantes ou non pertinentes pour générer un résumé.";
  }
  if (!result.schema || typeof result.schema !== "object") {
    result.schema = {};
  }

  console.log("AI Magic Note Result:", result);
  return result as {
    summary: string;
    schema: any;
  };
}

export async function generateMagicNote(noteId: string, lang: "fr" | "ar" | "en" = "en") {
  // 1. Fetch the note
  const note = await prisma.note.findUnique({ where: { id: noteId } });
  if (!note) throw new Error("Note not found");

  // 2. AI prompt
  const prompt = `
  You are an AI helping students in Morocco. 
  Summarize these notes in ${lang} (short version for exams).
  Generate 5 flashcards (Q&A).
  Finally, create a hierarchical schema in JSON (mindmap structure).

  Notes:
  ${note.content}
  `;

  // 3. Call OpenAI
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // or "gpt-4o"
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  const result = JSON.parse(response.choices[0].message?.content || "{}");

  // 4. Save MagicNote
  const magicNote = await prisma.magicNote.upsert({
    where: { noteId: noteId },
    update: {
      summary: result.summary || "",
      schema: result.schema || {},
      flashcards: result.flashcards || [],
    },
    create: {
      noteId: noteId,
      summary: result.summary || "",
      schema: result.schema || {},
      flashcards: result.flashcards || [],
    },
  });

  return magicNote;
}

// ✅ Get MagicNote (summary, flashcards, schema)
export async function getMagicNote(noteId: string) {
  return prisma.magicNote.findUnique({
    where: { noteId },
  });
}
