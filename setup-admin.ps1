#!/usr/bin/env pwsh

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Admin Panel Setup Script" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Install root dependencies
Write-Host "[1/3] Installing root dependencies (concurrently)..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install root dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Root dependencies installed" -ForegroundColor Green
Write-Host ""

# Step 2: Install server dependencies
Write-Host "[2/3] Installing server dependencies..." -ForegroundColor Yellow
Set-Location admin\server
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install server dependencies" -ForegroundColor Red
    Set-Location ..\..
    exit 1
}
Write-Host "✅ Server dependencies installed" -ForegroundColor Green
Set-Location ..\..
Write-Host ""

# Step 3: Install admin dependencies
Write-Host "[3/3] Installing admin dependencies..." -ForegroundColor Yellow
Set-Location admin
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install admin dependencies" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Write-Host "✅ Admin dependencies installed" -ForegroundColor Green
Set-Location ..
Write-Host ""

# Create uploads directory
Write-Host "Creating upload directory..." -ForegroundColor Yellow
if (-not (Test-Path "public\assets\uploads")) {
    New-Item -Path "public\assets\uploads" -ItemType Directory -Force | Out-Null
    Write-Host "✅ Upload directory created" -ForegroundColor Green
} else {
    Write-Host "✅ Upload directory already exists" -ForegroundColor Green
}
Write-Host ""

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the admin panel:" -ForegroundColor Yellow
Write-Host "  cd admin" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "To start both Next.js and Admin:" -ForegroundColor Yellow
Write-Host "  npm run dev:all" -ForegroundColor White
Write-Host ""
Write-Host "Admin Panel: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Next.js Site: http://localhost:3000" -ForegroundColor Cyan
Write-Host "API Server: http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "Read SETUP_GUIDE.md for more information" -ForegroundColor Yellow
