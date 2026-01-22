@echo off

:: Create Environment Script
:: by: VTILServer.com (ErringPaladin10)
:: started: 01/22/2026
:: heve fun!

:: get the current directory
set "CURRENT_DIR=%~dp0"

:: navigate to the project root
cd /d "%CURRENT_DIR%..\.."

:: create .env file if it doesn't exist
if not exist ".env" (
    echo Creating .env file...
    echo PORT=3000> .env
    echo WAIT_TIME_MS=1000>> .env
    echo .env file created.
) else (
    echo .env file already exists. Skipping creation.
)

echo Environment setup complete, run the /generator/generateapikey.bat to create an API key.

pause
exit /b 0