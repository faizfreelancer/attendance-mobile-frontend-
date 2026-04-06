import { useState } from "react";

export function useNote() {
  const [note, setNote] = useState("");

  const clearNote = () => setNote("");

  const onChangeNote = (text) => setNote(text);

  return { note, setNote, clearNote };
}
