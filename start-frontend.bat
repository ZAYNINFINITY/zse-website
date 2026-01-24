@echo off
title ZSE Frontend Server
color 0E

cd /d "%~dp0frontend"

echo ================================================
echo   ZSE Frontend Server
echo ================================================
echo.
echo Starting on port 3000...
echo.

npm run dev

pause


