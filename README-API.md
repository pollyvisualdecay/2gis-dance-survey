# Автоматическое обновление n8n workflow

## Настройка

1. **Получи API ключ в n8n:**
   - Зайди в https://n8n.2gis.io
   - **Settings** → **API**
   - Включи API (если выключен)
   - Создай API ключ

2. **Получи ID workflow:**
   - Открой workflow в n8n
   - Скопируй ID из URL или настроек workflow

3. **Создай файл `.env` (или установи переменные среды):**
   ```
   N8N_API_KEY=твой_ключ
   N8N_WORKFLOW_ID=id_workflow
   ```

## Использование

После любых изменений в `n8n-workflow/dance-survey-workflow.json`:

```powershell
$env:N8N_API_KEY="твой_ключ"
$env:N8N_WORKFLOW_ID="id_workflow"
.\deploy-workflow.ps1
```

Или установи переменные среды в системе один раз, и тогда просто:

```powershell
.\deploy-workflow.ps1
```

Workflow автоматически обновится в n8n без ручных действий!
