@echo off

:: rushed

setlocal enabledelayedexpansion

cd /d "%~dp0..\..\"
if not exist .env (
    echo .env file not found in project directory
    exit /b 1
)
set ENV_FILE=.env

for /f "delims=" %%A in ('powershell -Command "[guid]::NewGuid().ToString()"') do set API_KEY=%%A

if exist .env (
    for /f "delims=" %%B in ('findstr /r "^API_KEY=" "%ENV_FILE%"') do (
        echo API key already exists in .env file
        exit /b 1
    )
)

echo API_KEY=%API_KEY% >> "%ENV_FILE%"
echo API key generated