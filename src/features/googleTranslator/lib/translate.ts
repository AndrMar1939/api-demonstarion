import axios from 'axios';

const URL = 'https://translation.googleapis.com/language/translate/v2?key='

export const translateGoogle = async (text: string) => {
  const res = await axios.post(
  `${URL}${process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_KEY}`,
  { q: text, source: 'de', target: "en" }
  );

  const translation = res.data.data.translations[0].translatedText;

  return translation;
}
