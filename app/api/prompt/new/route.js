import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async(req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    //lambda function - dies once it does it's job
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag
    })

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 }) //status is success
  } catch (error) {
    return new Response('Failed to create a new prompt', { status: 500 })
  }
}
