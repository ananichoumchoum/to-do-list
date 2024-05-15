const express = require('express');
const { HfInference } = require('@huggingface/inference');
const router = express.Router();

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Generate Task Description Endpoint
router.post('/generate-task-description', async (req, res) => {
  const { taskName } = req.body;
  try {
    const input =  `List 5 general tasks to consider for the task: ${taskName},
     with a maximum of 50 words in total. Only list the tasks and do not write anything else.`;
    const response = await hf.textGeneration({
      model: 'gpt2',
      inputs: input,
      parameters: {
        max_new_tokens: 250,
        temperature: 0.7,
      },
    });

    let generatedText = response.generated_text;

    res.json({ description: generatedText });
    console.log(generatedText)
  } catch (error) {
    console.error('Error generating task description:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to generate task description' });
  }
});

// Prioritize Tasks Endpoint TODO IN THE FUTURE !!! 
router.post('/prioritize-tasks', async (req, res) => {
    const { tasks } = req.body;
  
    try {
      const responses = await Promise.all(tasks.map(async (task) => {
        const input = `Task: ${task.name}\nDescription: ${task.description}`;
        const response = await hf.textClassification({
          model: 'your-prioritization-model', 
          inputs: input,
        });
  
   
        const sentiment = response[0].label; // hypothesis of what the output would be like
        let priority;
        if (sentiment === 'POSITIVE') {
          priority = 'High';
        } else if (sentiment === 'NEGATIVE') {
          priority = 'Low';
        } else {
          priority = 'Medium'; 
        }
  
        return { ...task, priority }; ///testing is needed to understand more
      }));
  
      const prioritizedTasks = responses.sort((a, b) => {
        const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  
      res.json({ prioritizedTasks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to prioritize tasks' });
    }
  });

module.exports = router;