import Highlight from "@models/highlight";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB()

    const highlights = await Highlight.find({ creator: params.id }).populate("creator")

    return new Response(JSON.stringify(highlights), { status: 200 })
  } catch (error) {
    return new Response("Failed to fetch saved highlights created by user", { status: 500 })
  }
} 