import axios from 'axios';

const subscriptionKey = process.env.NEXT_PUBLIC_AZURE_TRANSLATOR_KEY;
const endpoint = process.env.NEXT_PUBLIC_AZURE_TRANSLATOR_ENDPOINT;
const location = 'italynorth';

export const translateTextAzure = async (text: string) => {
  const url = `${endpoint}/translate?api-version=3.0&from=en&to=it`;

  const headers = {
    'Ocp-Apim-Subscription-Key': subscriptionKey,
    'Ocp-Apim-Subscription-Region': location,
    'Content-Type': 'application/json',
  };

  const body = [
    {
      Text: text,
    },
  ];

  try {
    const response = await axios.post(url, body, { headers });
    return response.data[0].translations[0].text;
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Translation failed');
  }
};



export const getDictionaryLookup = async (text: string) => {
  const url = `https://api.cognitive.microsofttranslator.com/dictionary/lookup?api-version=3.0&from=en&to=it`;
  
  const headers = {
    'Ocp-Apim-Subscription-Key': subscriptionKey,
    'Ocp-Apim-Subscription-Region': location,
    'Content-Type': 'application/json',
    'Content-Length': `${text.length}`
  };

  const body = [
    { "Text": text}
  ];

  try {
    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (error) {
    console.error('Dictionary lookup error:', error);
  }
};
