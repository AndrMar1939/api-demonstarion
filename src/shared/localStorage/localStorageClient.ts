import type { TextInLibrary } from "@/types";

const LOCAL_STORAGE_LIBRARY_KEY = 'library'
const IS_SERVER_COMPONENT = typeof window === 'undefined';


export const saveTextToStorage = (text: TextInLibrary) => {
  if(IS_SERVER_COMPONENT) {
    return false
  }

  const stored = localStorage.getItem(LOCAL_STORAGE_LIBRARY_KEY);
  const storedTexts: TextInLibrary[] = stored ? JSON.parse(stored) : []; 
  const isTextInStorage = storedTexts.some((item: TextInLibrary) => item?.id === text.id);

  if (!isTextInStorage) {
    storedTexts.push(text);
    localStorage.setItem(LOCAL_STORAGE_LIBRARY_KEY, JSON.stringify(storedTexts));
  }
}

export const deleteTextFromStorage = (textId: number) => {
  if(IS_SERVER_COMPONENT) {
    return false
  }

  const stored = localStorage.getItem(LOCAL_STORAGE_LIBRARY_KEY);
  const storedTexts: TextInLibrary[] = stored ? JSON.parse(stored) : [];
  
  const updatedTexts = storedTexts.filter((item: TextInLibrary) => item.id !== textId);

  if (updatedTexts.length !== storedTexts.length) {
    localStorage.setItem(LOCAL_STORAGE_LIBRARY_KEY, JSON.stringify(updatedTexts));
  }
}

export const isTextInStorage = (textId: number): boolean => {
  if(IS_SERVER_COMPONENT) {
    return false
  }

  const stored = localStorage.getItem(LOCAL_STORAGE_LIBRARY_KEY);
  const storedTexts: TextInLibrary[] = stored ? JSON.parse(stored) : [];

  return storedTexts.some((item: TextInLibrary) => item.id === textId);
}
