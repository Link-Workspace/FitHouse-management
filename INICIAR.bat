@echo off
chcp 65001 >nul
cls
echo ===============================================
echo     FIT HOUSE - SISTEMA DE GESTAO
echo ===============================================
echo.
where node >nul 2>&1
if errorlevel 1 (
  echo Node.js nao foi encontrado. Instale o Node.js 20 LTS e tente novamente.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Instalando dependencias pela primeira vez...
  call npm install --no-audit --no-fund
  if errorlevel 1 (
    echo.
    echo Nao foi possivel instalar as dependencias.
    pause
    exit /b 1
  )
)
echo Iniciando o sistema...
call npm run dev
pause
