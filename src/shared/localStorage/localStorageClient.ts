import type { TextInLibrary } from "@/types";

const LOCAL_STORAGE_LIBRARY_KEY = 'library'


export const saveTextToStorage = (text: TextInLibrary) => {
  const stored = localStorage.getItem(LOCAL_STORAGE_LIBRARY_KEY);
  const storedTexts: any[] = stored ? JSON.parse(stored) : [];
  const isTextInStorage = storedTexts.includes((item: TextInLibrary) => item.id === text.id)

  if (!isTextInStorage) {
    const updatedTexts = storedTexts.push(text);
  
    localStorage.setItem(LOCAL_STORAGE_LIBRARY_KEY, JSON.stringify(updatedTexts));

    return true; 
  }
  
  return false;
}

export const deleteTextFromStorage = (textId: number) => {
  const stored = localStorage.getItem(LOCAL_STORAGE_LIBRARY_KEY);
  const storedTexts: any[] = stored ? JSON.parse(stored) : [];
  
  const updatedTexts = storedTexts.filter((item: TextInLibrary) => item.id !== textId);

  if (updatedTexts.length !== storedTexts.length) {
    localStorage.setItem(LOCAL_STORAGE_LIBRARY_KEY, JSON.stringify(updatedTexts));
    return true; 
  }
  
  return false;
}

export const isTextInStorage = (textId: number): boolean => {
  const stored = localStorage.getItem(LOCAL_STORAGE_LIBRARY_KEY);
  const storedTexts: any[] = stored ? JSON.parse(stored) : [];

  return storedTexts.some((item: TextInLibrary) => item.id === textId);
}
