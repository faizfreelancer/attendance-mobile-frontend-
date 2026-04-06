import { useState } from "react";

const INITIAL_Lists = [];

export function useLists() {
  const [Lists, setLists] = useState(INITIAL_Lists);
  const [inputList, setInputList] = useState("");

  const handleAddList = () => {
    if (!inputList.trim()) return;
    setLists((prev) => [
      ...prev,
      { id: Date.now().toString(), text: inputList.trim() },
    ]);
    setInputList("");
  };

  const handleRemoveList = (id) =>
    setLists((prev) => prev.filter((t) => t.id !== id));

  return {
    Lists,
    inputList,
    setInputList,
    handleAddList,
    handleRemoveList,
  };
}
