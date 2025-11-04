@echo off
echo Setting up Project Idea Finder...
echo.

echo Installing root dependencies...
call npm install

echo.
echo Installing server dependencies...
cd server
call npm install
cd ..

echo.
echo Installing client dependencies...
cd client
call npm install
cd ..

echo.
echo Setting up environment file...
if not exist "server\.env" (
    copy "server\.env.example" "server\.env"
    echo Environment file created at server\.env
    echo Please edit server\.env with your MongoDB URI and JWT secret
) else (
    echo Environment file already exists
)

echo.
echo Setup complete! 
echo.
echo To start the application:
echo   npm run dev
echo.
echo Make sure MongoDB is running before starting the app.
pause