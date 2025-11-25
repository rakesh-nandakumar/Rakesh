# RAG System Migration Script
# This script helps you run the SQL migration to create the rag_config table

Write-Host "🚀 RAG System Migration Helper" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$migrationFile = "supabase\migrations\create_rag_config.sql"

if (-not (Test-Path $migrationFile)) {
    Write-Host "❌ Migration file not found: $migrationFile" -ForegroundColor Red
    exit 1
}

Write-Host "📄 Migration file found: $migrationFile" -ForegroundColor Green
Write-Host ""

# Read migration content
$sqlContent = Get-Content $migrationFile -Raw

Write-Host "📋 Migration Preview:" -ForegroundColor Yellow
Write-Host "---" -ForegroundColor DarkGray
Write-Host $sqlContent.Substring(0, [Math]::Min(300, $sqlContent.Length)) -ForegroundColor Gray
if ($sqlContent.Length > 300) {
    Write-Host "..." -ForegroundColor Gray
}
Write-Host "---" -ForegroundColor DarkGray
Write-Host ""

Write-Host "🔧 Migration Options:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Option 1: Supabase Dashboard (Recommended)" -ForegroundColor Yellow
Write-Host "  1. Go to: https://supabase.com/dashboard" -ForegroundColor White
Write-Host "  2. Select your project" -ForegroundColor White
Write-Host "  3. Go to SQL Editor" -ForegroundColor White
Write-Host "  4. Copy the contents of: $migrationFile" -ForegroundColor White
Write-Host "  5. Paste and execute in the SQL Editor" -ForegroundColor White
Write-Host ""

Write-Host "Option 2: Supabase CLI" -ForegroundColor Yellow
Write-Host "  Run: supabase db push" -ForegroundColor White
Write-Host "  (Requires Supabase CLI installed and linked)" -ForegroundColor DarkGray
Write-Host ""

Write-Host "Option 3: Copy SQL to Clipboard" -ForegroundColor Yellow
$choice = Read-Host "Copy SQL to clipboard? (y/n)"

if ($choice -eq 'y' -or $choice -eq 'Y') {
    try {
        Set-Clipboard -Value $sqlContent
        Write-Host "✅ SQL copied to clipboard!" -ForegroundColor Green
        Write-Host "   Now paste it in Supabase SQL Editor" -ForegroundColor White
    } catch {
        Write-Host "❌ Failed to copy to clipboard: $_" -ForegroundColor Red
        Write-Host "   Please copy manually from: $migrationFile" -ForegroundColor Yellow
    }
} else {
    Write-Host "ℹ️  You can manually copy from: $migrationFile" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "📊 After Running Migration:" -ForegroundColor Cyan
Write-Host "  1. Test the RAG system: node scripts/test-rag-system.js" -ForegroundColor White
Write-Host "  2. Visit admin dashboard: http://localhost:3000/admin/rag" -ForegroundColor White
Write-Host "  3. Test chat functionality on your site" -ForegroundColor White
Write-Host ""

Write-Host "✨ Migration helper completed!" -ForegroundColor Green
