'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tooltip } from '@nextui-org/react';
import { useAtom } from 'jotai';
import { textOutputAtom } from '@atoms/textOutput';
import Image from 'next/image';

const TextGenerator = () => {
  const [formData, setFormData] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [textOutput, setTextOutput] = useAtom(textOutputAtom);
  const router = useRouter();

  const getAudioInput = e => {
    const target = e.target;
    const file = target.files[0];

    const data = new FormData();
    data.append('file', file);
    data.append('model', 'whisper-1');
    data.append('language', 'en');

    setFormData(data);
    setIsButtonDisabled(false);
  };

  const extractText = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        'https://api.openai.com/v1/audio/transcriptions',
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
          method: 'POST',
          body: formData,
        }
      );
      const data = await res.json();

      // navigate to create highlights page
      if (res.ok) {
        setTextOutput(data.text);
        router.push('/create-highlights');
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-16">
      <input
        onChange={getAudioInput}
        type="file"
        accept="audio/*"
        className="block w-full p-1 rounded-full text-sm text-slate-500 bg-gray-200
          file:py-2 file:px-4
          file:rounded-full file:border-none
          file:text-sm file:font-semibold
          file:bg-black file:text-white
          hover:file:bg-[#1975D4] hover:file:text-black
          hover:file:bg-opacity-25  hover:cursor-pointer
          hover:file:cursor-pointer
        "
      />

      <Tooltip
        content="Please upload an audio for transcribing."
        size="md"
        offset={-7}
        placement="bottom"
        className={`tootip ${!isButtonDisabled && 'hidden'}`}
      >
        <button
          className="mt-5 w-full cta_btn"
          onClick={extractText}
          disabled={isButtonDisabled}
        >
          {isLoading ? (
            <Image
              src="assets/icons/button-loader.svg"
              width={32}
              height={32}
              alt="loader"
              className="object-contain"
            />
          ) : (
            'Transcribe'
          )}
        </button>
      </Tooltip>
    </div>
  );
};

export default TextGenerator;
