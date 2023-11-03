'use client';

import { useState } from 'react';
import Image from 'next/image';

const HighlightsCard = ({ keyPoints, isExtractingHighlights }) => {
  const [copied, setCopied] = useState('');

  const handleCopy = () => {
    setCopied(text);
    navigator.clipboard.writeText(text);
    setTimeout(() => setCopied(''), 3000);
  };

  console.log('key: ', keyPoints);
  return (
    <div className="highlights_card">
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

        {/* <div className="copy_btn" onClick={handleCopy}>
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
        </div> */}
      </div>

      {keyPoints && keyPoints?.length > 0 ? (
        <ul className="h-[75%] overflow-y-auto my-4 font-satoshi text-sm text-gray-700">
          {keyPoints.map((str, index) => (
            <li key={index}>{str}</li>
          ))}
        </ul>
      ) : isExtractingHighlights ? (
        <div className="h-[75%] flex-center">
          <Image
            src="assets/icons/loader.svg"
            width={80}
            height={80}
            alt="loader"
            className="object-contain"
          />
        </div>
      ) : (
        <p className="h-[75%] my-4 font-satoshi text-sm text-gray-700">
          Key Notes...
        </p>
      )}
      <button className="mt-5 w-full cta_btn" onClick={() => {}}>
        Export
      </button>
    </div>
  );
};

export default HighlightsCard;
