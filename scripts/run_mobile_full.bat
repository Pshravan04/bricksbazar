@echo off
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --user-data-dir="%TEMP%\chrome-mobile-full" --window-size=390,7500 --screenshot="%TEMP%\bb-mobile-full.png" http://localhost:3000
copy "%TEMP%\bb-mobile-full.png" "d:\bricksBazar\public\bb-mobile-full.png"
echo MOBILE_FULL_DONE

