@echo off
title ZSE Backend Server
color 0B

cd /d "%~dp0backend"

echo ================================================
echo   ZSE Backend Server
echo ================================================
echo.
echo Starting on port 5000...
echo.

npm run dev

pause


