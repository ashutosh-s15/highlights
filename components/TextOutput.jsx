'use client';

import { useState } from 'react';
import Image from 'next/image';

const TextOutput = ({ text, handleExtract }) => {
  const [copied, setCopied] = useState('');

  const handleCopy = () => {
    setCopied(text);
    navigator.clipboard.writeText(text);
    setTimeout(() => setCopied(''), 3000);
  };

  return (
    <div className="text_result">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              Model: text-davinci-002
            </h3>
            <p className="font-inter text-sm text-gray-500">Confidence: 12</p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === text
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            alt="copy"
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{text}</p>
      {handleExtract && (
        <button className="mt-5 w-full cta_btn" onClick={handleExtract}>
          Create Highlights
        </button>
      )}
    </div>
  );
};

export default TextOutput;
