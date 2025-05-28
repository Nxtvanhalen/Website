import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  defaultHeaders: { 'OpenAI-Beta': 'assistants=v2' }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const { prompt: userMessage = '', threadId: existingThreadId } = req.body;
  const assistantId = process.env.OPENAI_ASSISTANT_ID;
  if (!userMessage || !assistantId) {
    return res.status(400).json({ error: 'Missing prompt or OPENAI_ASSISTANT_ID' });
  }
  try {
    // 1. Create or reuse a thread
    let thread;
    if (existingThreadId) {
      thread = { id: existingThreadId };
    } else {
      thread = await openai.beta.threads.create();
    }

    // 2. Add user message to thread
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: userMessage
    });

    // 3. Start a run with the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId
    });

    // 4. Poll for run completion
    let runStatus;
    do {
      await new Promise((r) => setTimeout(r, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    } while (runStatus.status !== 'completed');

    // 5. Retrieve messages from the thread
    const messages = await openai.beta.threads.messages.list(thread.id);
    const replyMsg = messages.data.find((m) => m.role === 'assistant');
    
    let reply = 'No response received';
    if (replyMsg && Array.isArray(replyMsg.content)) {
      const textContent = replyMsg.content.find((content: any) => content.type === 'text') as any;
      if (textContent && textContent.text && textContent.text.value) {
        reply = textContent.text.value;
      }
    } else if (replyMsg && typeof replyMsg.content === 'string') {
      reply = replyMsg.content;
    }

    // 6. Return response with threadId for future messages
    return res.status(200).json({ reply, threadId: thread.id });
  } catch (error: any) {
    console.error('OpenAI API error', error);
    return res.status(500).json({ error: error.message || 'Unknown error' });
  }
}