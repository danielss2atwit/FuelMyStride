import Constants from 'expo-constants';

const testOpenAI = async () => {
  const API_KEY = Constants.expoConfig.extra.openaiApiKey;
  
  console.log('API Key exists:', !!API_KEY); // Should log true
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{
          role: "user",
          content: "Generate a test insight for a runner"
        }]
      })
    });
    
    const data = await response.json();
    const aiMessage = data.choices[0].message.content;
    console.log('AI generated Insight:', aiMessage)
    console.log('OpenAI Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Call this function somewhere to test
testOpenAI();