'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import SavedHighlight from '@components/SavedHighlight';

const MyHighlights = () => {
  const { data: session } = useSession();
  const [savedHighlights, setSavedHighlights] = useState([]);

  useEffect(() => {
    const fetchSavedHighlights = async () => {
      try {
        const response = await fetch(
          `/api/users/${session?.user.id}/highlights`
        );
        const data = await response.json();

        setSavedHighlights(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (session?.user.id) fetchSavedHighlights();
  }, []);

  return (
    <>
      <h1 className="head_text">My Highlights</h1>
      {savedHighlights && savedHighlights.length > 0 ? (
        <div className="py-[10%] lg:py-[4%] lg:px-[10%] flex flex-row flex-wrap md-flex-col gap-x-[5%] gap-y-[2rem]">
          {savedHighlights.map((item, i) => (
            <SavedHighlight key={i} id={item.id} keyPoints={item.keyPoints} />
          ))}
        </div>
      ) : (
        <p className="mt-[4rem] text-lg text-gray-600 sm:text-xl max-w-2xl text-center">
          No Highlights found
        </p>
      )}
    </>
  );
};

export default MyHighlights;
