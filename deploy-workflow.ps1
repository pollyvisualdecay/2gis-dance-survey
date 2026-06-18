# deploy-workflow.ps1 - Автоматическое обновление n8n workflow

$N8N_URL = "https://n8n.2gis.io"
$N8N_API_KEY = $env:N8N_API_KEY
$N8N_WORKFLOW_ID = $env:N8N_WORKFLOW_ID

$workflowPath = Join-Path $PSScriptRoot "n8n-workflow\dance-survey-workflow.json"

if (-not $N8N_API_KEY) {
    Write-Host "❌ Ошибка: N8N_API_KEY не установлен" -ForegroundColor Red
    exit 1
}

if (-not $N8N_WORKFLOW_ID) {
    Write-Host "❌ Ошибка: N8N_WORKFLOW_ID не установлен" -ForegroundColor Red
    exit 1
}

try {
    $workflowData = Get-Content $workflowPath -Raw
    
    Write-Host "📡 Отправка workflow в n8n..." -ForegroundColor Cyan
    
    $headers = @{
        "Content-Type" = "application/json"
        "X-N8N-API-KEY" = $N8N_API_KEY
    }
    
    $response = Invoke-RestMethod -Uri "$N8N_URL/rest/workflows/$N8N_WORKFLOW_ID" `
        -Method Put `
        -Headers $headers `
        -Body $workflowData
    
    Write-Host "✅ Workflow успешно обновлён!" -ForegroundColor Green
    Write-Host "   ID: $($response.id)"
    Write-Host "   Имя: $($response.name)"
    
} catch {
    Write-Host "❌ Ошибка при обновлении workflow: $_" -ForegroundColor Red
    exit 1
}
