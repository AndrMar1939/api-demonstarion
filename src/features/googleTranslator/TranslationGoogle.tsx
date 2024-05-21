'use client'

import React, {useEffect, useState} from 'react'
import { synthesizeSpeech } from '@/entity';
import { textMedium, convertTextToArr, prepareWordToTranslate, PlayButton } from '@/shared';
import { translateGoogle } from './lib';



export const TranslationGoogle = () => {
  const [initText, setInitText] = useState('')
  const [translatedText, setTranslatedText] = useState('')

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection ? selection.toString().trim() : ''
    if (selectedText) {
      setInitText(selectedText);
    }
  };

  const handleSynthesize = (text: string) => {
    synthesizeSpeech(text);
  };

  const handleWordClick = (e: any) => {
    const word = e.target.innerText;
  
    const preparedText = prepareWordToTranslate(word)

    console.log(preparedText)
  
    setInitText(preparedText)
  }

  useEffect(() => {
    if (initText) {
      translateGoogle (initText).then(words => {
        setTranslatedText(words)
      })
    }
  }, [initText])

  return (
    <div className='flex gap-20 text-2xl justify-between'>
      <p
        className='mb-[60px] rounded-xl bg-white p-9 flex flex-wrap w-[800px]'
        onMouseUp={handleTextSelection}
      >
        {convertTextToArr(textMedium)
          .map(word => 
            (<span 
                className='hover:bg-slate-200 rounded-full px-1 py-1 transition-all duration-300 cursor-pointer'
                key={word}
                onClick={handleWordClick}
              >
                {word}
              </span>
          ))}
      </p>

      <div className='w-[400px]'>
        {initText && <p className='text-2xl font-bold'>{initText}</p>}

        {initText && <p className='font-bold'>---</p>}

        {!!translatedText.length && (
          <>
            <p className='text-2xl font-bold flex flex-col gap-2'>
              { translatedText} 
            </p>

            <PlayButton
              onClick={() => {
                handleSynthesize(translatedText)
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}
