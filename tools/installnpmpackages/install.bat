@echo off

:: Install script for this sample web server
:: by: VTILServer.com (ErringPaladin10)
:: started: 01/22/2026
:: heve fun!

:: get the current directory
set "CURRENT_DIR=%~dp0"

:: navigate to the project root
cd /d "%CURRENT_DIR%..\.."

:: install dependencies
npm install

:: installation complete
echo Installation complete. You can now run the server using 'npm run start'.

pause

exit /b 0