@echo off
title Fix Port Conflicts
color 0C

echo ================================================
echo   Fixing Port Conflicts (3000, 3001, 5000)
echo ================================================
echo.

echo Stopping processes on port 5000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5000" ^| findstr "LISTENING"') do (
    echo   Killing process %%a
    taskkill /F /PID %%a >nul 2>&1
)

echo Stopping processes on port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do (
    echo   Killing process %%a
    taskkill /F /PID %%a >nul 2>&1
)

echo Stopping processes on port 3001...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3001" ^| findstr "LISTENING"') do (
    echo   Killing process %%a
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo ✅ Ports cleared!
echo.
echo Now you can:
echo   1. Close current server windows
echo   2. Run start-website.bat
echo.
pause


