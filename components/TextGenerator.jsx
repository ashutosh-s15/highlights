'use client';
import { useState } from 'react';

const TextGenerator = () => {
  const [formData, setFormData] = useState(null);
  const [output, setOutput] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const getInput = e => {
    const target = e.target;
    const file = target.files[0];

    const data = new FormData();
    data.append('file', file);
    data.append('model', 'whisper-1');
    data.append('language', 'en');

    setFormData(data);
    setIsButtonDisabled(false);
  };

  const generateText = async () => {
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
      console.log('Data: ', data);
      setOutput(data.text);
    } catch (e) {
      console.log('error: ', e);
    }
  };

  return (
    <div className="flex flex-col items-center p-16">
      <input
        onChange={getInput}
        type="file"
        className="block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-none
          file:text-sm file:font-semibold
          file:bg-black file:text-white
          hover:file:bg-[#1975D4] hover:file:text-black
          hover:file:bg-opacity-25  hover:cursor-pointer
        "
      />
      <button
        className={`mt-5 w-full cta_btn ${
          isButtonDisabled ? 'bg-gradient-gray-300' : ''
        }`}
        onClick={generateText}
        disabled={isButtonDisabled}
      >
        Create
      </button>
    </div>
  );
};

export default TextGenerator;
