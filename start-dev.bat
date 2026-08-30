@echo off
cd /d C:\Users\User\Desktop\milano-menswear
start "Arena Server" /min node server/src/index.js
cd /d C:\Users\User\Desktop\milano-menswear\client
start "Arena Frontend" /min npx vite --host
echo Both servers starting...
