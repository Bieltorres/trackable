# Script para forçar regeneração do Prisma Client
Write-Host "Parando TODOS os processos Node.js..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host "Aguardando 5 segundos..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "Removendo cache do Prisma..." -ForegroundColor Yellow
Remove-Item -Path ".\node_modules\.prisma" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Regenerando Prisma Client..." -ForegroundColor Green
npx prisma generate

Write-Host "`nPronto! Agora você pode reiniciar o servidor com: npm run dev" -ForegroundColor Green
Write-Host "Pressione qualquer tecla para sair..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
