'use client'
import axios from 'axios';
import React, {useEffect, useState} from 'react'

const TEXT_TO_TRANSLATE = [
  'An old',
  'silent',
  'pond...',
  'A frog',
  'jumps',
  'into',
  'the pond,',
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
  const [translatedText, setTranslatedText] = useState('')

  console.log('rerender')

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection ? selection.toString().trim() : ''
    if (selectedText) {
      setInitText(selectedText);
    }
  };

  useEffect(() => {
    if (initText) {
      translate(initText).then(text => {
        setTranslatedText(text)
      })
    }
  }, [initText])

  return (
    <div className='flex flex-col gap-2 text-2xl items-center'>
      <p className='mb-[60px] rounded-xl bg-white p-9 flex flex-wrap w-[600px]' onMouseUp={handleTextSelection}>
        {TEXT_TO_TRANSLATE
          .map(word => 
            (<span 
                className='hover:bg-slate-200 rounded-full px-1 py-1 transition-all duration-300 cursor-pointer'
                key={word}
                onClick={(e: any) => {
                  const text = e.target.innerText
                  setInitText(text)
                }}
              >
                {word}
              </span>
          ))}
      </p>

    {initText && <p className='text-5xl font-bold'>{initText}</p>}

    {initText && <p className='font-bold'>---</p>}

    {translatedText && <p className='text-5xl font-bold'>{translatedText}</p>}
    </div>
  )
}

export default Translation
