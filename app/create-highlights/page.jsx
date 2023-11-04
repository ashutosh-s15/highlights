'use client';

import { useState } from 'react';
import { useAtom } from 'jotai';
import { textOutputAtom } from '@atoms/textOutput';
import { highlightsPayloadAtom } from '@atoms/highlightsPayload';
import TextOutput from '@components/TextOutput';
import HighlightsCard from '@components/HighlightsCard';
import TextGenerator from '@components/TextGenerator';

const CreateHighlights = () => {
  const [keyPoints, setKeyPoints] = useState([]);
  const [textOutput] = useAtom(textOutputAtom);
  const [highlightsPayload] = useAtom(highlightsPayloadAtom);
  const [isExtractingHighlights, setIsExtractingHighlights] = useState(false);

  const handleExtract = async () => {
    setIsExtractingHighlights(true);
    try {
      const response = await fetch('/api/highlights', {
        method: 'POST',
        body: JSON.stringify({
          text: textOutput,
          model: 'gpt-3.5-turbo-instruct',
          language: highlightsPayload.language,
          tokenLength: highlightsPayload.tokenLength,
          temperature: highlightsPayload.temperature,
        }),
      });
      const data = await response.json();
      console.log('data: ', data);
      if (response.ok && Array.isArray(data.points)) {
        setKeyPoints(data.points);
        /* todo: add success toast */
      }
    } catch (e) {
      console.log(e);
    }
    setIsExtractingHighlights(false);
  };

  if (!textOutput)
    return (
      <div className="w-full flex-center flex-col">
        <h1 className="mt-5 text-3xl font-bold leading-[1.15] text-black sm:text-4xl text-center">
          Upload audio to create highlights
        </h1>
        <TextGenerator />
      </div>
    );

  return (
    <div className="md:flex w-full">
      <TextOutput
        text={textOutput}
        handleExtract={handleExtract}
        isExtractingHighlights={isExtractingHighlights}
      />
      <HighlightsCard
        keyPoints={keyPoints}
        isExtractingHighlights={isExtractingHighlights}
      />
    </div>
  );
};

export default CreateHighlights;
