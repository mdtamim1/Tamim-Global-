# Tamim Global — Pre-Deployment Health Check Script
Write-Host '==================================================' -ForegroundColor Cyan
Write-Host '  Tamim Global — Deployment Health Check' -ForegroundColor Cyan
Write-Host '==================================================' -ForegroundColor Cyan

$allGood = $true

# 1. Content JSON syntax check
Write-Host "`n[1/5] Checking data/content.json..." -NoNewline
try {
    $content = Get-Content 'data/content.json' -Raw | ConvertFrom-Json
    Write-Host " OK! (Valid JSON with $($content.projects.Count) projects)" -ForegroundColor Green
} catch {
    Write-Host ' FAILED! Invalid JSON' -ForegroundColor Red
    $allGood = $false
}

# 2. Asset checklist
Write-Host "`n[2/5] Checking Public Assets..."
$assets = @(
    @{ Path = 'public/images/tamim-portrait.jpg'; Label = 'Portrait photo (About section)'; Required = $false },
    @{ Path = 'public/og-image.png'; Label = 'OpenGraph share image (1200x630)'; Required = $false },
    @{ Path = 'public/textures/noise.png'; Label = 'Noise background texture'; Required = $false },
    @{ Path = 'public/robots.txt'; Label = 'Robots.txt'; Required = $true }
)

foreach ($a in $assets) {
    if (Test-Path $a.Path) {
        Write-Host "  [+] $($a.Label) exists" -ForegroundColor Green
    } else {
        if ($a.Required) {
            Write-Host "  [x] $($a.Label) MISSING (Required)" -ForegroundColor Red
            $allGood = $false
        } else {
            Write-Host "  [-] $($a.Label) not added yet (fallback in place)" -ForegroundColor Yellow
        }
    }
}

# 3. Environment Variables
Write-Host "`n[3/5] Checking .env.local..."
if (Test-Path '.env.local') {
    $envContent = Get-Content '.env.local' -Raw
    if ($envContent -match 'tamim2024') {
        Write-Host '  [!] NEXT_PUBLIC_ADMIN_PASSWORD is set to default tamim2024.' -ForegroundColor Yellow
        Write-Host '      Please change it in Vercel Dashboard for production!' -ForegroundColor Yellow
    } else {
        Write-Host '  [+] Custom admin password configured' -ForegroundColor Green
    }
} else {
    Write-Host '  [!] .env.local not found (Vercel will use dashboard env vars)' -ForegroundColor Yellow
}

# 4. ESLint Check
Write-Host "`n[4/5] Running ESLint check..."
npm run lint
if ($LASTEXITCODE -eq 0) {
    Write-Host '  [+] Lint clean! (0 errors, 0 warnings)' -ForegroundColor Green
} else {
    Write-Host '  [x] Lint failed! Please fix issues before deploying.' -ForegroundColor Red
    $allGood = $false
}

# 5. Production Build
Write-Host "`n[5/5] Testing production build..."
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host '  [+] Production build successful!' -ForegroundColor Green
} else {
    Write-Host '  [x] Build failed! Check error logs above.' -ForegroundColor Red
    $allGood = $false
}

# Summary
Write-Host "`n==================================================" -ForegroundColor Cyan
if ($allGood) {
    Write-Host '  READY FOR DEPLOYMENT! Vercel is good to go.' -ForegroundColor Green
    Write-Host '  Refer to DEPLOYMENT.md for step-by-step instructions.' -ForegroundColor Green
} else {
    Write-Host '  ATTENTION: Fix flagged errors before deploying!' -ForegroundColor Red
}
Write-Host '==================================================' -ForegroundColor Cyan
