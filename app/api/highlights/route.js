import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

async function extractKeyPoints(text, model = 'text-davinci-002') {
  const prompt = `You are a proficient AI with a specialty in distilling information into key points. Based on the following text, identify and list the main points that were discussed or brought up. These should be the most important ideas, findings, or topics that are crucial to the essence of the discussion. Your goal is to provide a list that someone could read to quickly understand what was talked about.\n\nText: ${text}`;
  const completions = await openai.completions.create({
    model: model,
    prompt: prompt,
    max_tokens: 1024,
  });

  const message = completions.choices[0].text.trim();
  return message.split('\n');
}


export const POST = async (req, res) => {
  const { text, model } = await req.json();
  try {
    const points = await extractKeyPoints(text, model);
    return new Response(JSON.stringify({ points }), { status: 201 });
  } catch (e) {
    console.log(e)
    return new Response("Failed to create highlights", { status: 500 })
  }
}