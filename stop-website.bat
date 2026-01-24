@echo off
title ZSE Store - Stopping Servers
color 0C

echo ================================================
echo   ZSE Store - Stopping Servers
echo ================================================
echo.

echo Stopping Node.js processes...
taskkill /FI "WINDOWTITLE eq ZSE Backend Server*" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq ZSE Frontend Server*" /T /F >nul 2>&1

echo.
echo Stopping processes on ports 5000, 3000, and 3001...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5000" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3001" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1

echo.
echo ✅ Servers stopped!
echo.
pause

