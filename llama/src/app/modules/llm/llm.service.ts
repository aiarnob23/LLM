import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: "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",
});

//mcj service
export async function getGroqChatCompletionService(mcj : string) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: mcj,
        },
      ],
      model: "llama-3.3-70b-versatile", 
    });

    return chatCompletion.choices[0]?.message?.content || "No content returned";
  } catch (error) {
    console.error("Error during Groq chat completion:", error);
    throw new Error("Failed to fetch Groq chat completion");
  }
}
//file read service
export async function getGroqFileReadService(extractedText: string) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Based on the following extracted text (from a pdf), respond accordingly: \n\n${extractedText}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    return chatCompletion.choices[0]?.message?.content || "No content returned";
  } catch (error) {
    console.error("Error during Groq chat completion:", error);
    throw new Error("Failed to fetch Groq chat completion");
  }
}


export const llmaServices = {
    getGroqChatCompletionService,
    getGroqFileReadService,
}