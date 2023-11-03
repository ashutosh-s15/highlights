'use client';

import { useState } from 'react';
import { useAtom } from 'jotai';
import { textOutputAtom } from '@atoms/textOutput';
import TextOutput from '@components/TextOutput';
import HighlightsCard from '@components/HighlightsCard';

const text =
  "Hey Rahul, Manish here. Hi Manish, what's up. So I called to talk about the trip's location. I've been thinking, and what do you reckon about Hawaii for our next adventure? It has those beautiful beaches, lush jungles, and incredible volcanoes. Yes, I think that will be great. Hawaii offers a perfect mix of relaxation and adventure. We can lounge on the pristine beaches, go hiking in the rainforests, and even explore some fascinating volcanic landscapes. It's a diverse destination with plenty of activities to choose from. But, just to make sure, are there any other places you had in mind? I'm open to suggestions and want this trip to be amazing for both of us.";

const CreateHighlights = () => {
  const [keyPoints, setKeyPoints] = useState([]);
  const [textOutput] = useAtom(textOutputAtom);

  const handleExtract = async () => {
    try {
      const response = await fetch('/api/highlights', {
        method: 'POST',
        body: JSON.stringify({
          text: textOutput,
          model: 'text-davinci-002',
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
  };
  return (
    <div className="md:flex w-full">
      <TextOutput text={textOutput} handleExtract={handleExtract} />
      <HighlightsCard keyPoints={keyPoints} />
    </div>
  );
};

export default CreateHighlights;
