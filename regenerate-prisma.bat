@echo off
echo Parando processos Node...
taskkill /F /IM node.exe 2>nul

echo.
echo Aguardando 2 segundos...
timeout /t 2 /nobreak >nul

echo.
echo Regenerando Prisma Client...
npx prisma generate

echo.
echo Pronto! Agora voce pode reiniciar o servidor com: npm run dev
pause
