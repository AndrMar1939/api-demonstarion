import AWS from 'aws-sdk';
import { Rationale } from 'next/font/google';

AWS.config.update({
  region: 'us-west-2',
  credentials: new AWS.Credentials(
    process.env.NEXT_PUBLIC_AMAZON_ACCESS as string,
    process.env.NEXT_PUBLIC_AMAZON_ACCESS_SECRET as string,)
});

const polly = new AWS.Polly();

export const synthesizeSpeech = (text: string) => {
  const params = {
    OutputFormat: 'mp3',
    Text: text,
    VoiceId: 'Joanna',
  };

  polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    if (data.AudioStream instanceof Buffer) {
      const audioUrl = URL.createObjectURL(new Blob([data.AudioStream], { type: 'audio/mp3' }));
      
      const audio = new Audio(audioUrl);
      audio.play();
    }
  });
};
