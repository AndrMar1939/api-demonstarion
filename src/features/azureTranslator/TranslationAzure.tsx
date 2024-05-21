'use client'
import React, {useEffect, useState} from 'react'
import { synthesizeSpeech } from '@/entity';
import { textMedium, convertTextToArr, prepareWordToTranslate, PlayButton } from '@/shared';
import { getDictionaryLookup, translateTextAzure } from './lib';

export const TranslationAzure = () => {
  const [initText, setInitText] = useState('')
  const [translatedTextList, setTranslatedTextList] = useState([])
  const [initHighlightedText, setInitHighlightedText] = useState('')
  const [translatedHighlightedText, setHighlightedTranslatedText] = useState('')

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection ? selection.toString().trim() : ''
    if (selectedText) {
      setInitHighlightedText(selectedText);
      setInitText('')
      setTranslatedTextList([])
    }
  };

  const handleSynthesize = (text: string) => {
    synthesizeSpeech(text);
  };

  const handleWordClick = (e: any) => {
    const word = e.target.innerText;
  
    const preparedText = prepareWordToTranslate(word)
  
    setInitText(preparedText)
    setInitHighlightedText('')
    setHighlightedTranslatedText('')
  }

  useEffect(() => {
    if (initText) {
      getDictionaryLookup(initText).then(words => {
        setTranslatedTextList(words)
      })
    }

    if (initHighlightedText) {
      translateTextAzure(initHighlightedText).then((text: string) => {
        setHighlightedTranslatedText(text)
      })
    }
  }, [initText, initHighlightedText])

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
        {initText && <p className='text-5xl font-bold'>{initText}</p>}

        {initText && <p className='font-bold'>---</p>}

        {!!translatedTextList.length && (
          <>
            <p className='text-5xl font-bold flex flex-col gap-2'>
              {translatedTextList.map((term: any, index) => (
                <span key={index}>
                  {`${term.displayTarget}: `}
                  <span className='italic'>
                    {term.posTag}
                  </span>
                </span>
              ))}
            </p>
          </>
        )}

        {!!translatedHighlightedText && (
          <div>
            {initHighlightedText && <p className='text-5xl font-bold'>{initHighlightedText}</p>}

            {initHighlightedText && <p className='font-bold'>---</p>}

            <p className='text-5xl font-bold flex flex-col gap-2'>
              {translatedHighlightedText}
            </p>

            <PlayButton
              onClick={() => {
                handleSynthesize(translatedHighlightedText)
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
