"use server";

import { queryHuggingFace } from "@/lib/huggingface";
import prisma from "@/lib/prisma";
import OpenAI from "openai";

// AI Client (if you need MagicNote generation here)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// -------------------------------
// CRUD Functions for Notes
// -------------------------------

// ✅ Create a new note
export async function createNote(
  userId: string,
  courseId: string,
  content: string
) {
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
export async function deleteNoteById(noteId: string) {
  return prisma.note.delete({
    where: { id: noteId },
  });
}

// -------------------------------
// AI: Generate MagicNote
// -------------------------------
export async function generateMagicNote(
  type: "summary" | "schema" | "map",
  notes: string[],
  courseTitle: string
) {
  if (!notes.length) return null;

  const allNotes = notes.join("\n\n");

  const model = "csebuetnlp/mT5_multilingual_XLSum"; // multilingual summarization
  let prompt = "";

  switch (type) {
    case "summary":
      prompt = `Summarize the following notes for the course "${courseTitle}" in bullet points:\n${allNotes}`;
      break;
    case "schema":
      prompt = `Create a structured schema (intro, main points, conclusion) from the following notes:\n${allNotes}`;
      break;
    case "map":
      prompt = `Generate a mind map style breakdown of these notes:\n${allNotes}`;
      break;
  }

  const result = await queryHuggingFace(model, prompt);

  // The result format depends on the model; summarization models usually return an array
  return Array.isArray(result)
    ? result[0].summary_text || JSON.stringify(result)
    : JSON.stringify(result);
}

// ✅ Get MagicNote (summary, flashcards, schema)
export async function getMagicNote(noteId: string) {
  return prisma.magicNote.findUnique({
    where: { noteId },
  });
}
