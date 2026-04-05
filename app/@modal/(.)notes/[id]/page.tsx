import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import NotePreviewClient from "./NotePreview.client";

export default async function NoteModalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <Modal>
      <NotePreviewClient note={note} />
    </Modal>
  );
}