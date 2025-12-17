/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { Note, NoteColor } from "@/types/student";
import {
  addNotesGlobal,
  deleteNotesGlobal,
  getNotesGlobal,
  updateNotesGlobal,
} from "@/actions/student";

export function useNotes(userId: string) {
  const [notes, setNotes] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load notes from backend on mount or when user changes
  useEffect(() => {
    if (!userId) return;

    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const notesGlobal = await getNotesGlobal(userId);
        setNotes(notesGlobal || []);
      } catch (err) {
        console.error("Failed to load notes:", err);
      }
      setIsLoading(false);
      setIsLoaded(true);
    };

    fetchNotes();
  }, [userId]);

  // Create new note + sync to backend
  const addNote = async (content: string, color: NoteColor, emoji?: string) => {
    const tempNote: any = {
      id: crypto.randomUUID(),
      content,
      color,
      emoji,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId,
    };

    // Optimistic update
    setNotes((prev: any) => [tempNote, ...prev]);

    try {
      const saved = await addNotesGlobal(userId, {
        content,
        color,
        emoji,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Replace temp note with saved note
      setNotes((prev: any) =>
        prev.map((n: any) => (n.id === tempNote.id ? saved : n))
      );

      return saved;
    } catch (err) {
      console.error("Failed to save note:", err);

      // Rollback optimistic update
      setNotes((prev: any) => prev.filter((n: any) => n.id !== tempNote.id));
      throw err;
    }
  };

  // Update note + backend sync
  const updateNote = async (
    id: string,
    updates: Partial<Pick<Note, "content" | "color" | "emoji">>
  ) => {
    // Optimistic update
    const old = notes.find((n: any) => n.id === id);

    setNotes((prev: any) =>
      prev.map((note: any) =>
        note.id === id ? { ...note, ...updates, updatedAt: new Date() } : note
      )
    );

    try {
      await updateNotesGlobal(id, updates);
    } catch (err) {
      console.error("Failed to update note:", err);

      // Rollback
      if (old) {
        setNotes((prev: any) => prev.map((n: any) => (n.id === id ? old : n)));
      }
    }
  };

  // Delete note + backend sync
  const deleteNote = async (id: string) => {
    const old = notes;

    // Optimistic delete
    setNotes((prev: any) => prev.filter((note: any) => note.id !== id));

    try {
      await deleteNotesGlobal(id);
    } catch (err) {
      console.error("Failed to delete note:", err);

      // Rollback
      setNotes(old);
    }
  };

  return {
    notes,
    isLoaded,
    isLoading,
    addNote,
    updateNote,
    deleteNote,
    refresh: async () => {
      // optional refresh method
      const res = await getNotesGlobal(userId);
      setNotes(res || []);
    },
  };
}
