@echo off
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --user-data-dir="%TEMP%\chrome-full" --window-size=1440,5600 --screenshot="%TEMP%\bb-desktop-full.png" http://localhost:3000
copy "%TEMP%\bb-desktop-full.png" "d:\bricksBazar\public\bb-desktop-full.png"
echo FULL_DESKTOP_DONE

