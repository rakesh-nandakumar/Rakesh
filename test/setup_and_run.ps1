# Admin Panel Test Suite - Installation & Execution Script
# Run this script to set up and execute the test suite

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ADMIN PANEL SELENIUM TEST SUITE" -ForegroundColor Cyan
Write-Host "  Setup & Execution Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if command exists
function Test-CommandExists {
    param($command)
    $null = Get-Command $command -ErrorAction SilentlyContinue
    return $?
}

# Step 1: Check Prerequisites
Write-Host "[1/6] Checking Prerequisites..." -ForegroundColor Yellow

if (-not (Test-CommandExists python)) {
    Write-Host "  ✗ Python not found. Please install Python 3.8+!" -ForegroundColor Red
    exit 1
}
Write-Host "  ✓ Python installed" -ForegroundColor Green

$pythonVersion = python --version 2>&1
Write-Host "  $pythonVersion" -ForegroundColor Gray

if (-not (Test-CommandExists pip)) {
    Write-Host "  ✗ pip not found. Please install pip!" -ForegroundColor Red
    exit 1
}
Write-Host "  ✓ pip installed" -ForegroundColor Green

# Step 2: Navigate to test directory
Write-Host ""
Write-Host "[2/6] Navigating to test directory..." -ForegroundColor Yellow
$testDir = "c:\Users\Admin\Desktop\Rakesh\test"

if (Test-Path $testDir) {
    Set-Location $testDir
    Write-Host "  ✓ Test directory found: $testDir" -ForegroundColor Green
} else {
    Write-Host "  ✗ Test directory not found: $testDir" -ForegroundColor Red
    exit 1
}

# Step 3: Install Python dependencies
Write-Host ""
Write-Host "[3/6] Installing Python dependencies..." -ForegroundColor Yellow
Write-Host "  This may take a few minutes..." -ForegroundColor Gray

try {
    pip install -r requirements.txt --quiet --disable-pip-version-check
    Write-Host "  ✓ Dependencies installed successfully" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Failed to install dependencies" -ForegroundColor Red
    Write-Host "  Error: $_" -ForegroundColor Red
    exit 1
}

# Step 4: Create necessary directories
Write-Host ""
Write-Host "[4/6] Creating directories..." -ForegroundColor Yellow

$dirs = @("screenshots", "reports", "test_data")
foreach ($dir in $dirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir | Out-Null
        Write-Host "  ✓ Created: $dir/" -ForegroundColor Green
    } else {
        Write-Host "  ✓ Exists: $dir/" -ForegroundColor Green
    }
}

# Step 5: Verify configuration
Write-Host ""
Write-Host "[5/6] Verifying configuration..." -ForegroundColor Yellow

if (Test-Path ".env") {
    Write-Host "  ✓ .env file found" -ForegroundColor Green
    
    # Read and display config
    $envContent = Get-Content .env
    $adminUrl = ($envContent | Select-String "ADMIN_URL=").ToString().Split("=")[1]
    $serverUrl = ($envContent | Select-String "SERVER_URL=").ToString().Split("=")[1]
    
    Write-Host "  Admin URL: $adminUrl" -ForegroundColor Gray
    Write-Host "  Server URL: $serverUrl" -ForegroundColor Gray
} else {
    Write-Host "  ⚠ .env file not found, using defaults" -ForegroundColor Yellow
}

# Step 6: Check if servers are running
Write-Host ""
Write-Host "[6/6] Checking servers..." -ForegroundColor Yellow

# Check admin panel
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173" -TimeoutSec 2 -UseBasicParsing -ErrorAction SilentlyContinue
    Write-Host "  ✓ Admin panel is running (port 5173)" -ForegroundColor Green
} catch {
    Write-Host "  ⚠ Admin panel not responding (port 5173)" -ForegroundColor Yellow
    Write-Host "    Start with: cd admin; npm run dev" -ForegroundColor Gray
}

# Check backend server
try {
    $response = Invoke-WebRequest -Uri "http://localhost:1420" -TimeoutSec 2 -UseBasicParsing -ErrorAction SilentlyContinue
    Write-Host "  ✓ Backend server is running (port 1420)" -ForegroundColor Green
} catch {
    Write-Host "  ⚠ Backend server not responding (port 1420)" -ForegroundColor Yellow
    Write-Host "    Start with: cd admin/server; node index.js" -ForegroundColor Gray
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SETUP COMPLETE!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Ask user what to do
Write-Host "What would you like to do?" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Run SMOKE tests (quick, ~2-3 minutes)" -ForegroundColor White
Write-Host "2. Run CRITICAL tests (important paths, ~5 minutes)" -ForegroundColor White
Write-Host "3. Run ALL tests (comprehensive, ~10-15 minutes)" -ForegroundColor White
Write-Host "4. Run specific module tests" -ForegroundColor White
Write-Host "5. Exit" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-5)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Running SMOKE tests..." -ForegroundColor Cyan
        python run_tests.py smoke
    }
    "2" {
        Write-Host ""
        Write-Host "Running CRITICAL tests..." -ForegroundColor Cyan
        python run_tests.py critical
    }
    "3" {
        Write-Host ""
        Write-Host "Running ALL tests..." -ForegroundColor Cyan
        python run_tests.py all
    }
    "4" {
        Write-Host ""
        Write-Host "Available modules:" -ForegroundColor Yellow
        Write-Host "  - login" -ForegroundColor White
        Write-Host "  - dashboard" -ForegroundColor White
        Write-Host "  - blogs" -ForegroundColor White
        Write-Host "  - portfolio" -ForegroundColor White
        Write-Host "  - gallery" -ForegroundColor White
        Write-Host "  - site_config" -ForegroundColor White
        Write-Host "  - backups" -ForegroundColor White
        Write-Host ""
        $module = Read-Host "Enter module name"
        Write-Host ""
        Write-Host "Running $module tests..." -ForegroundColor Cyan
        python run_tests.py $module
    }
    "5" {
        Write-Host ""
        Write-Host "Exiting. To run tests later, use:" -ForegroundColor Yellow
        Write-Host "  python run_tests.py [test_type]" -ForegroundColor White
        Write-Host ""
        exit 0
    }
    default {
        Write-Host ""
        Write-Host "Invalid choice. To run tests manually, use:" -ForegroundColor Yellow
        Write-Host "  python run_tests.py [test_type]" -ForegroundColor White
        Write-Host ""
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Test execution complete!" -ForegroundColor Cyan
Write-Host "  Check reports/ folder for HTML report" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
