@echo off
chcp 65001 >nul
title PUMKIN.DEV - PUMKIN MATH API BACKEND RUNNER
color 0A

echo ==============================================================================
echo             PUMKIN.DEV - MAY CHU TOAN HOC VA AI SO HOC (FASTAPI)
echo ==============================================================================
echo.

REM 1. Dinh vi thu muc chua ma nguon backend
set "BACKEND_DIR="
if exist "%~dp0pumkin-math-api\app\main.py" set "BACKEND_DIR=%~dp0pumkin-math-api"
if not defined BACKEND_DIR if exist "%~dp0PUMKIN2\pumkin-math-api\app\main.py" set "BACKEND_DIR=%~dp0PUMKIN2\pumkin-math-api"
if not defined BACKEND_DIR if exist "c:\Users\ADMIN\Downloads\hoctap\PUMKIN2\pumkin-math-api\app\main.py" set "BACKEND_DIR=c:\Users\ADMIN\Downloads\hoctap\PUMKIN2\pumkin-math-api"
if not defined BACKEND_DIR if exist "c:\Users\ADMIN\Downloads\hoctap\pumkin-math-api\app\main.py" set "BACKEND_DIR=c:\Users\ADMIN\Downloads\hoctap\pumkin-math-api"
if not defined BACKEND_DIR if exist "%~dp0app\main.py" set "BACKEND_DIR=%~dp0"

if not defined BACKEND_DIR goto err_no_backend

cd /d "%BACKEND_DIR%"

REM 2. Dinh vi trinh thong dich Python Virtual Environment
set "PYTHON_EXE="
if exist "c:\Users\ADMIN\Downloads\hoctap\pumkin-math-api-venv\Scripts\python.exe" set "PYTHON_EXE=c:\Users\ADMIN\Downloads\hoctap\pumkin-math-api-venv\Scripts\python.exe"
if not defined PYTHON_EXE if exist "%~dp0..\pumkin-math-api-venv\Scripts\python.exe" set "PYTHON_EXE=%~dp0..\pumkin-math-api-venv\Scripts\python.exe"
if not defined PYTHON_EXE if exist "%~dp0pumkin-math-api-venv\Scripts\python.exe" set "PYTHON_EXE=%~dp0pumkin-math-api-venv\Scripts\python.exe"
if not defined PYTHON_EXE set "PYTHON_EXE=python"

echo [OK] Thu muc backend : %CD%
echo [OK] Trinh thong dich: %PYTHON_EXE%

REM 3. Kiem tra tep cau hinh .env
if not exist .env if exist .env.example copy /y .env.example .env >nul

findstr /C:"AIzaSy_YOUR_GEMINI_API_KEY_HERE" .env >nul 2>nul
if errorlevel 1 goto has_api_key
echo [!] LUU Y: Ban chua dien GEMINI_API_KEY that vao file .env.
echo     He thong se chay o che do offline (FakeLLM / CAS Only).
echo     Mo file: %CD%\.env de dien khoa neu can goi AI online.
goto env_check_done

:has_api_key
echo [OK] Da cau hinh GEMINI_API_KEY.

:env_check_done
echo.
echo ==============================================================================
echo [THONG TIN TRUY CAP]:
echo   - Backend API URL   : http://localhost:8000
echo   - Kiem tra he thong : http://localhost:8000/health
echo   - Tai lieu Swagger  : http://localhost:8000/docs
echo   - AI Model thiet lap: Gemini 2.0 Flash-Lite (tu file .env)
echo   - Dung may chu      : Bam to hop phim [Ctrl + C]
echo ==============================================================================
echo.
echo Dang khoi dong may chu Uvicorn...
echo.

"%PYTHON_EXE%" -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

echo.
echo [THONG BAO]: May chu backend da dung lai.
pause
exit /b 0

:err_no_backend
echo [LOI]: Khong tim thay thu muc chua app\main.py cua pumkin-math-api!
echo Vui long kiem tra lai vi tri dat tep START_BACKEND.bat.
pause
exit /b 1
