'use client'
import React, {useEffect, useState} from 'react'
import { synthesizeSpeech } from '@/entity';
import { textSmall, convertTextToArr, prepareWordToTranslate, PlayButton } from '@/shared';
import { getDictionaryLookup, translateTextAzure } from './lib';
import { isTextInStorage, saveTextToStorage, deleteTextFromStorage } from '@/shared/localStorage';

export const TranslationAzure = () => {
  const [initText, setInitText] = useState('')
  const [translatedTextList, setTranslatedTextList] = useState([])
  const [initHighlightedText, setInitHighlightedText] = useState('')
  const [translatedHighlightedText, setHighlightedTranslatedText] = useState('')
  const [isTextSaved, setTextSaved] = useState(isTextInStorage(textSmall.id))
  const [isClient, setIsClient] = useState(false)

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

  useEffect(() => {
    setIsClient(true)
  }, [])

  if(!isClient) {
    return null
  }


  return (
    <><button
      className='b bg-slate-100 rounded-sm mb-5'
      onClick={() => {
        setTextSaved(prev => !prev);

        if (isTextSaved) {
          deleteTextFromStorage(textSmall.id);
          return;
        }

        saveTextToStorage(textSmall);
      } }
    >
      {isTextSaved ? 'delete saved text' : 'save text'}
    </button>
    
    <div className='flex gap-20 text-2xl justify-between'>
        <p
          className='mb-[60px] rounded-xl bg-white p-9 flex flex-wrap w-[800px]'
          onMouseUp={handleTextSelection}
        >
          {convertTextToArr(textSmall.content)
            .map((word, index) => (<span
              className='hover:bg-slate-200 rounded-full px-1 py-1 transition-all duration-300 cursor-pointer'
              key={index}
              onClick={handleWordClick}
            >
              {word}
            </span>
            ))}
        </p>

        <div className='w-[400px]'>
          {initText && <p className='text-2xl font-bold'>{initText}</p>}

          {initText && <p className='font-bold'>---</p>}

          {!!translatedTextList.length && (
            <>
              <PlayButton
                onClick={() => {
                  handleSynthesize(initText);
                } } />

              <ul className='font-bold flex flex-col gap-2 text-2xl'>
                {translatedTextList.map((term: any, index) => (
                  <li key={index}>
                    <span>
                      <span className=''>
                        {`${term.displayTarget}: `}
                      </span>

                      <span className='italic'>
                        {term.posTag}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {!!translatedHighlightedText && (
            <div>
              {initHighlightedText && <p className='font-bold'>{initHighlightedText}</p>}

              {initHighlightedText && <p className='font-bold'>---</p>}

              <p className='font-bold flex flex-col gap-2'>
                {translatedHighlightedText}
              </p>

              <PlayButton
                onClick={() => {
                  handleSynthesize(initHighlightedText);
                } } />
            </div>
          )}
        </div>
      </div></>
  )
}
