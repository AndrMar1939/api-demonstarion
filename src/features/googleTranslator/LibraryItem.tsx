'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { synthesizeSpeech } from '@/entity';
import { convertTextToArr, prepareWordToTranslate, PlayButton, textAssets } from '@/shared';
import { translateGoogle } from './lib';
import { isTextInStorage, saveTextToStorage, deleteTextFromStorage } from '@/shared/localStorage';

export const LibraryItem = () => {
  const pathname = usePathname();
  const preparedPathName = pathname.split('/').pop();
  const currentText = textAssets.find(({ slug }) => slug === preparedPathName) || textAssets[0];
  const [initText, setInitText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTextSaved, setTextSaved] = useState(isTextInStorage(currentText.id));
  const [isClient, setIsClient] = useState(false);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection ? selection.toString().trim() : '';
    if (selectedText) {
      setInitText(selectedText);
    }
  };

  const handleSynthesize = (text: string) => {
    synthesizeSpeech(text);
  };

  const handleWordClick = (e: any) => {
    const word = e.target.innerText;

    const preparedText = prepareWordToTranslate(word);

    setInitText(preparedText);
  };

  useEffect(() => {
    if (initText) {
      translateGoogle(initText).then(words => {
        setTranslatedText(words);
      });
    }
  }, [initText]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <h1 className="text-3xl font-semibold mb-10">{currentText.title}</h1>

      <button
        className="py-2 px-6 bg-yellow-300 rounded-xl flex justify-center items-center mb-5"
        onClick={() => {
          setTextSaved(prev => !prev);

          if (isTextSaved) {
            deleteTextFromStorage(currentText.id);
            return;
          }

          saveTextToStorage(currentText);
        }}
      >
        {isTextSaved ? 'delete saved text' : 'save text'}
      </button>

      <div className="flex gap-20 text-2xl justify-between">
        <p
          className="mb-[60px] rounded-xl bg-white p-9 flex flex-wrap w-[800px]"
          onMouseUp={handleTextSelection}
        >
          {convertTextToArr(currentText.content).map((word, index) => (
            <span
              className="hover:bg-slate-200 rounded-full px-1 py-1 transition-all duration-300 cursor-pointer"
              key={index}
              onClick={handleWordClick}
            >
              {word}
            </span>
          ))}
        </p>

        <div className="w-[400px]">
          {initText && <p className="text-2xl font-bold">{initText}</p>}

          {initText && <p className="font-bold">---</p>}

          {!!translatedText?.length && (
            <>
              <p className="text-2xl font-bold flex flex-col gap-2">{translatedText}</p>

              <PlayButton
                onClick={() => {
                  handleSynthesize(initText);
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* {!!translatedText?.length && (
        <iframe
            src={`https://www.wordreference.com/deen/${encodeURIComponent(initText)}`}
            title="WordReference Translation"
            width="700"
            height="800"
        ></iframe>
      )} */}
    </>
  );
};
