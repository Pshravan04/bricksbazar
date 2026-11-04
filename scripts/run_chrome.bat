@echo off
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --user-data-dir="%TEMP%\chrome-temp" --window-size=1440,2400 --screenshot="%TEMP%\bb-desktop-1440.png" http://localhost:3000
copy "%TEMP%\bb-desktop-1440.png" "d:\bricksBazar\public\bb-desktop-1440.png"

"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --user-data-dir="%TEMP%\chrome-temp-mobile" --window-size=390,2400 --screenshot="%TEMP%\bb-mobile-390.png" http://localhost:3000
copy "%TEMP%\bb-mobile-390.png" "d:\bricksBazar\public\bb-mobile-390.png"

echo DONE
