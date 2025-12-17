import { Note } from "@/types/student";
import { NoteCard } from "./NoteCard";

interface NotesBoardProps {
  notes: Note[];
  onUpdate: (
    id: string,
    updates: Partial<Pick<Note, "content" | "color" | "emoji">>
  ) => void;
  onDelete: (id: string) => void;
}

export function NotesBoard({ notes, onUpdate, onDelete }: NotesBoardProps) {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4 animate-bounce-soft">📝</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Aucune note pour le moment
        </h3>
        <p className="text-sm text-muted-foreground max-w-[200px]">
          Commencez à ajouter des notes pour suivre votre parcours
          d&apos;apprentissage!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {notes.map((note, index) => (
        <div
          key={note.id}
          style={{ animationDelay: `${index * 50}ms` }}
          className="animate-slide-in-right"
        >
          <NoteCard note={note} onUpdate={onUpdate} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
