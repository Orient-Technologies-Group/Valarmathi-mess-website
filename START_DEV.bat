@echo off
title Valarmathi Mess - Development Mode (Hot Reload)
color 0A

echo ======================================================================
echo          VALARMATHI MESS - HOT-RELOAD DEVELOPMENT MODE
echo ======================================================================
echo.

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo Installing root dependencies...
    call npm install
)

if not exist "client\node_modules\" (
    echo Installing client dependencies...
    cd client
    call npm install
    cd ..
)

echo Starting development servers:
echo - Frontend with Hot Reload: http://localhost:5173
echo - Backend API:              http://localhost:5000
echo.
echo Launching your browser...
start "" http://localhost:5173

call npm run dev

pause
