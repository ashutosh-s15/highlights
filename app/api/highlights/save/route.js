import { connectToDB } from "@utils/database";
import Highlight from "@models/highlight";

export const POST = async (req, res) => {
  const { userId, keyPoints } = await req.json();

  try {
    await connectToDB();
    const newHighlight = new Highlight({
      creator: userId,
      keyPoints
    });

    await newHighlight.save();

    return new Response(JSON.stringify(newHighlight), { status: 201 });
  } catch (e) {
    console.log(e);
    return new Response("Failed to save highlight", { status: 500 })
  }
}