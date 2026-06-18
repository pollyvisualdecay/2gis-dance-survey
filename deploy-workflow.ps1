# deploy-workflow.ps1 - Обновление n8n workflow через Python скрипт

$pythonScript = Join-Path $PSScriptRoot "..\n8n-manager\n8n-manager\scripts\update_workflow.py"
$workflowId = "50eaQSaKlvJ8IxFp"
$workflowJson = Join-Path $PSScriptRoot "n8n-workflow\dance-survey-workflow.json"

Write-Host "Updating n8n workflow..." -ForegroundColor Cyan
python $pythonScript $workflowId $workflowJson

if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCESS: Workflow updated!" -ForegroundColor Green
} else {
    Write-Host "ERROR: Failed to update workflow" -ForegroundColor Red
    exit 1
}
