@echo off
title ZSE Store - Starting Servers
color 0A

echo ================================================
echo   ZSE Store - Starting Backend and Frontend
echo ================================================
echo.

cd /d "%~dp0"

echo [1/2] Starting Backend Server...
if not exist "%~dp0backend\node_modules" (
    echo Installing backend dependencies...
    cd /d "%~dp0backend"
    call npm install
)
start "ZSE Backend Server" cmd /k "cd /d %~dp0backend && echo === BACKEND SERVER === && npm run dev"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend Server...
if not exist "%~dp0frontend\node_modules" (
    echo Installing frontend dependencies...
    cd /d "%~dp0frontend"
    call npm install
)
start "ZSE Frontend Server" cmd /k "cd /d %~dp0frontend && echo === FRONTEND SERVER === && npm run dev"

echo.
echo ================================================
echo   Servers are starting in separate windows!
echo ================================================
echo.
echo Backend:  http://localhost:5000/api
echo Frontend: http://localhost:3000
echo.
echo Wait 15-30 seconds for servers to start...
echo Then open: http://localhost:3000
echo.
echo Press any key to exit this window...
pause >nul

