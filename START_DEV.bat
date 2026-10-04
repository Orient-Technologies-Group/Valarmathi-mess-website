@echo off
title Tapriwala - The Contemporary Tea Cafe
cd /d "%~dp0"

echo ============================================================
echo   TAPRIWALA - THE CONTEMPORARY TEA CAFE (COIMBATORE)
echo ============================================================
echo.
echo [1/3] Checking dependencies...
if not exist "node_modules\" (
    echo Installing required packages...
    call npm install
)

echo.
echo [2/3] Building production bundle for maximum speed...
call npm run build

echo.
echo [3/3] Launching Tapriwala Web Server...
echo Opening browser at http://localhost:5173 ...
start "" "http://localhost:5173"

call npm run preview -- --port 5173
pause
