'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { isTextInStorage, saveTextToStorage, deleteTextFromStorage } from '@/shared/localStorage';
import type { TextInLibrary } from '@/types';

export const ListItem = (props: TextInLibrary) => {
  const { slug, title, description, id } = props;
  const [isClient, setIsClient] = useState(false);
  const [isTextSaved, setTextSaved] = useState(isTextInStorage(id));

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <li className="flex flex-col gap-10 w-[900px] min-h-[160px] bg-sky-200 rounded-2xl px-10 py-4 justify-between">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-5">
          <h3 className="bold text-3xl">{title}</h3>

          <p>{description}</p>
        </div>

        <button
          className="w-[80px] py-2 bg-yellow-300 rounded-xl flex justify-center items-center"
          onClick={() => {
            setTextSaved(prev => !prev);

            if (isTextSaved) {
              deleteTextFromStorage(id);
              return;
            }

            saveTextToStorage(props);
          }}
        >
          {isTextSaved ? 'delete' : 'save'}
        </button>
      </div>

      <Link href={`/library/${slug}`} className="self-center px-10 py-2 bg-green-400 rounded-xl">
        read
      </Link>
    </li>
  );
};
