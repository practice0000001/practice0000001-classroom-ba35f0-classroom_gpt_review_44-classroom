import { Configuration, OpenAIApi } from 'openai';
import fs from 'fs';

const OPENAI_API_KEY = 'sk-None-Btg57wnjrD3JydbDCltVT3BlbkFJNpL1Oo1yiNqS0IaHdYR5';
const apiKey = 'sk-proj-BYf3QBxj6sztULQDo2mwT3BlbkFJHzTsvuzRewq8kxfjbeK0';

if (!apiKey) {
  throw new Error('API key not found');
}

const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

async function analyzeTestResults() {
  const testResults = fs.readFileSync('build/result.log', 'utf8');
  const prompt = `테스트 결과를 분석하고 피드백을 제공합니다: ${testResults}`;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt }
    ]
  });

  const feedback = response.data.choices[0].message.content.trim();
  fs.writeFileSync('feedback.log', feedback);
}

analyzeTestResults().catch(error => {
  console.error(error);
  process.exit(1);
});
