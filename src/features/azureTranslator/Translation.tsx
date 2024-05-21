'use client'
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { synthesizeSpeech } from '@/entity';

let regexForSingleWord = /[-!.,?/]/g;
'An old silent pond... A frog jumps into the pond, splash! Silence again.'
const TEXT_TO_TRANSLATE = [
  'An',
  'old',
  'silent',
  'pond...',
  'A',
  'frog',
  'jumps',
  'into',
  'the',
  'pond,',
  'splash!',
  'Silence',
  'again.',
]

const translate = async (text: string) => {
  let res = await axios.post(
  `https://translation.googleapis.com/language/translate/v2?key=${process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_KEY}`,
  { q: text, source: 'en', target: "de" }
  );

  console.log('api google')

  let translation = res.data.data.translations[0].translatedText;
  return translation;
}

function Translation() {
  const [initText, setInitText] = useState('')
  const [translatedTextList, setTranslatedTextList] = useState([])

  console.log('rerender')

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

  useEffect(() => {
    if (initText) {
      getDictionaryLookup(initText).then(words => {
        console.log(words)
        setTranslatedTextList(words)
      })

      // translateTextAzure(initText).then(text => {
      //   setTranslatedText(text)
      // })
    }
  }, [initText])

  return (
    <div className='flex flex-col gap-2 text-2xl items-center'>
      <p className='mb-[60px] rounded-xl bg-white p-9 flex flex-wrap w-[600px]'>
        {TEXT_TO_TRANSLATE
          .map(word => 
            (<span 
                className='hover:bg-slate-200 rounded-full px-1 py-1 transition-all duration-300 cursor-pointer'
                key={word}
                onClick={(e: any) => {
                  const text = e.target.innerText;
                
                  const preparedText = !!text
                    ? text
                      .replace(regexForSingleWord, '')
                      .toLowerCase()
                    : '';

                    console.log(preparedText)
                
                  setInitText(preparedText)
                }}
              >
                {word}
              </span>
          ))}
      </p>

    {initText && <p className='text-5xl font-bold'>{initText}</p>}

    {initText && <p className='font-bold'>---</p>}

    {!!translatedTextList.length && (
      <>
      <p className='text-5xl font-bold flex flex-col gap-2'>{
      translatedTextList.map((term: any, index) => (
        <span key={index}>
          {`${term.displayTarget} ${term.posTag}`}
        </span>
      ))}</p>

      {/* <button
        className='mt-3 p-5 rounded-full bg-gray-100 border-[1px] border-solid border-green flex justify-center items-center hover:bg-gray-200 active:bg-gray-300'
        onClick={() => {
        // handleSynthesize(translatedText)
      }}
      >
        play sound
      </button> */}
      
      </>
    )}
    </div>
  )
}

export default Translation
