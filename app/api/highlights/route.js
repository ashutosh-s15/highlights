import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

async function extractKeyPoints(model = 'gpt-3.5-turbo-instruct', language = "English", temperature = 0, tokenLength, text) {
  const prompt = `You are a proficient AI with a specialty in distilling information into key points. Based on the following text, identify and list the main points that were discussed or brought up. These should be the most important ideas, findings, or topics that are crucial to the essence of the discussion. Your goal is to provide a list that someone could read to quickly understand what was talked about.\n\nKey points should be in ${language}\n\nText: ${text}`;
  const completions = await openai.completions.create({
    model,
    prompt,
    max_tokens: tokenLength ? tokenLength : 1024,
    temperature
  });

  const message = completions.choices[0].text.trim();
  return message.split('\n');
}


export const POST = async (req, res) => {
  const { model, language, text, tokenLength, temperature } = await req.json();
  try {
    const points = await extractKeyPoints(model, language, temperature, tokenLength, text);
    return new Response(JSON.stringify({ points }), { status: 201 });
  } catch (e) {
    console.log(e)
    return new Response("Failed to create highlights", { status: 500 })
  }
}