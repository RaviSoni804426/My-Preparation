@echo off
echo ===================================================
echo 🚀 FAANG Prep Tracker - Setup and Git Push
echo ===================================================

echo.
echo 1. Initializing Git Repository...
git init
git add .
git commit -m "Initial commit: 10-week FAANG Prep System and Tracker App"
git branch -M main
git remote add origin https://github.com/RaviSoni804426/My-Preparation.git

echo.
echo 2. Pushing code to GitHub...
echo (Note: You may be prompted to authenticate with GitHub)
git push -u origin main

echo.
echo 3. Installing Node.js dependencies for Tracker App...
cd tracker-app
call npm install

echo.
echo 4. Starting Tracker App locally...
echo App will open in your browser. Press Ctrl+C in this terminal to stop the server.
call npm run dev

pause
