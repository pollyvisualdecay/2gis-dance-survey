const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const N8N_URL = process.env.N8N_URL || 'https://n8n.2gis.io';
const N8N_API_KEY = process.env.N8N_API_KEY;
const N8N_WORKFLOW_ID = process.env.N8N_WORKFLOW_ID;

const workflowPath = path.join(__dirname, 'n8n-workflow', 'dance-survey-workflow.json');

async function deployWorkflow() {
  if (!N8N_API_KEY) {
    console.error('❌ Ошибка: N8N_API_KEY не установлен в .env файле');
    process.exit(1);
  }

  if (!N8N_WORKFLOW_ID) {
    console.error('❌ Ошибка: N8N_WORKFLOW_ID не установлен в .env файле');
    process.exit(1);
  }

  try {
    const workflowData = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

    console.log('📡 Отправка workflow в n8n...');

    const response = await fetch(`${N8N_URL}/rest/workflows/${N8N_WORKFLOW_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-N8N-API-KEY': N8N_API_KEY
      },
      body: JSON.stringify(workflowData)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const result = await response.json();
    console.log('✅ Workflow успешно обновлён!');
    console.log('   ID:', result.id);
    console.log('   Имя:', result.name);

  } catch (error) {
    console.error('❌ Ошибка при обновлении workflow:', error.message);
    process.exit(1);
  }
}

deployWorkflow();
