@echo off
title Valarmathi Mess - Localhost Launcher
color 0E

echo ======================================================================
echo          VALARMATHI MESS - RACE COURSE, COIMBATORE
echo          Authentic Kongu Regional Cuisine Since 1986
echo ======================================================================
echo.

:: Check if Node.js is available
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please download and install Node.js from https://nodejs.org
    echo.
    pause
    exit /b 1
)

:: Check if root dependencies are installed
if not exist "node_modules\" (
    echo [1/3] Installing root dependencies...
    call npm install
)

:: Check if client dependencies are installed
if not exist "client\node_modules\" (
    echo [2/3] Installing client dependencies...
    cd client
    call npm install
    cd ..
)

:: Build the project if dist doesn't exist yet
if not exist "client\dist\" (
    echo [3/3] Compiling website build...
    call npm run build
) else if not exist "dist\server.js" (
    echo [3/3] Compiling server bundle...
    call npm run build
)

echo.
echo ======================================================================
echo   Website is starting at: http://localhost:5000
echo   Admin Dashboard at:     http://localhost:5000/#admin
echo ======================================================================
echo.
echo Launching your default browser in 2 seconds...
echo (Keep this black command window open while browsing the site)
echo.

:: Launch browser in background
start "" http://localhost:5000

:: Start the production server
node server.js

pause
