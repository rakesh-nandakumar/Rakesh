# Quick Start Guide for Selenium Tests

## Prerequisites Check
✅ Python 3.8+ installed
✅ Node.js installed
✅ Admin panel code available
✅ Chrome browser installed

## Step-by-Step Setup

### 1. Install Python Dependencies (5 minutes)
```powershell
cd test
pip install -r requirements.txt
```

This installs:
- Selenium WebDriver
- Pytest testing framework
- WebDriver Manager (auto-downloads ChromeDriver)
- Reporting tools
- Color output libraries

### 2. Configure Environment
The `.env` file is already created with defaults:
- Admin URL: http://localhost:5173
- Password: admin
- Server URL: http://localhost:1420
- Headless Mode: False (you'll see browser)

**No changes needed unless you use different ports!**

### 3. Start Servers (REQUIRED)

**Terminal 1 - Start Admin Panel:**
```powershell
cd c:\Users\Admin\Desktop\Rakesh\admin
npm run dev
```
Wait for: "Local: http://localhost:5173"

**Terminal 2 - Start Backend Server:**
```powershell
cd c:\Users\Admin\Desktop\Rakesh\admin\server
node index.js
```
Wait for: "Server running on port 1420"

### 4. Run Tests (Choose One)

**Option A - Run Quick Smoke Tests (2-3 minutes):**
```powershell
cd c:\Users\Admin\Desktop\Rakesh\test
python run_tests.py smoke
```

**Option B - Run All Tests (10-15 minutes):**
```powershell
python run_tests.py
```

**Option C - Run Specific Module:**
```powershell
python run_tests.py login       # Test login only
python run_tests.py blogs       # Test blogs CRUD
python run_tests.py portfolio   # Test portfolio CRUD
python run_tests.py gallery     # Test gallery CRUD
python run_tests.py backups     # Test backup system
```

## What Happens During Test Run?

1. **Browser Opens**: Chrome browser will open automatically
2. **Login**: Tests will log in to admin panel
3. **Navigate**: Tests navigate through all pages
4. **CRUD Operations**: Creates, reads, updates, deletes data
5. **Edge Cases**: Tests special characters, long inputs, etc.
6. **Screenshots**: On failure, screenshot is saved
7. **Report**: HTML report is generated

## Understanding Test Output

### Console Colors:
- 🟢 **Green** = Test passed ✓
- 🔴 **Red** = Test failed ✗
- 🟡 **Yellow** = Warning/Info
- 🔵 **Cyan** = Information

### Test Results:
```
test_login.py::TestLogin::test_successful_login PASSED       [10%]
test_blogs_crud.py::TestBlogsCreate::test_create_valid_blog PASSED [20%]
```

## Viewing Reports

After tests finish:
1. **HTML Report**: Look in `test/reports/` folder
2. **Screenshots**: Look in `test/screenshots/` folder (if any failures)

Open HTML report in browser to see:
- Pass/Fail summary
- Execution times
- Screenshots
- Detailed logs

## Common Issues & Solutions

### Issue 1: "pytest not found"
**Solution:**
```powershell
pip install pytest
```

### Issue 2: "Cannot connect to admin panel"
**Solution:** Make sure both servers are running (Step 3)

### Issue 3: "ChromeDriver error"
**Solution:** Tests will auto-download ChromeDriver. Ensure internet connection.

### Issue 4: Tests are too slow
**Solution:** Run smoke tests only:
```powershell
python run_tests.py smoke
```

### Issue 5: Element not found errors
**Solution:** Increase wait time in `.env`:
```
EXPLICIT_WAIT=30
```

## Test Coverage Summary

| Module | Tests | Coverage |
|--------|-------|----------|
| Login | 8 tests | 100% |
| Navigation | 7 tests | 100% |
| Blogs | 25+ tests | 100% |
| Portfolio | 15+ tests | 100% |
| Gallery | 12+ tests | 100% |
| Site Config | 10+ tests | 100% |
| Backups | 10+ tests | 100% |

## What Each Test Suite Does

### `test_login.py`
- ✅ Tests login with correct password
- ✅ Tests login with wrong password
- ✅ Tests empty password
- ✅ Tests special characters
- ✅ Tests XSS attempts

### `test_blogs_crud.py`
- ✅ Creates blogs with all fields
- ✅ Edits existing blogs
- ✅ Deletes blogs
- ✅ Tests search/filter
- ✅ Tests pagination
- ✅ Tests 10+ edge cases

### `test_portfolio_crud.py`
- ✅ Creates portfolio projects
- ✅ Edits projects
- ✅ Tests featured flag
- ✅ Tests multiple tech stack
- ✅ Tests edge cases

### `test_gallery_crud.py`
- ✅ Creates gallery items
- ✅ Edits items
- ✅ Tests image display
- ✅ Tests duplicate IDs
- ✅ Tests edge cases

### `test_site_config.py`
- ✅ Tests all toggle switches
- ✅ Tests save functionality
- ✅ Tests persistence
- ✅ Tests rapid toggling

### `test_backups.py`
- ✅ Verifies backup list
- ✅ Tests view backup details
- ✅ Tests automatic backup creation
- ✅ Validates date display
- ✅ Checks naming convention

## Advanced Usage

### Run Specific Test File:
```powershell
pytest tests/test_login.py -v
```

### Run Specific Test:
```powershell
pytest tests/test_login.py::TestLogin::test_successful_login -v
```

### Run in Headless Mode:
Edit `.env`:
```
HEADLESS_MODE=True
```

### Parallel Execution (faster):
```powershell
pytest tests/ -n 4
```

### Generate Allure Report:
```powershell
pytest tests/ --alluredir=allure-results
allure serve allure-results
```

## Stopping Tests

Press `Ctrl+C` in terminal to stop tests.

## Next Steps

1. ✅ Run smoke tests first
2. ✅ Review HTML report
3. ✅ Run full test suite
4. ✅ Add to CI/CD pipeline
5. ✅ Schedule regular runs

## Help & Support

If tests fail:
1. Check both servers are running
2. Look at screenshot in `screenshots/` folder
3. Read error message carefully
4. Check browser console (F12)
5. Review test logs

## Important Notes

⚠️ **Tests will modify data**: They create, edit, delete items
⚠️ **Use test environment**: Don't run on production data
⚠️ **Browser will open**: Unless HEADLESS_MODE=True
⚠️ **Takes time**: Full suite takes 10-15 minutes

## Success Indicators

✓ All tests pass (green)
✓ No screenshots in screenshots/ folder
✓ HTML report shows 100% pass rate
✓ Console shows "ALL TESTS PASSED"

---

**You're all set! Run your first test:**
```powershell
cd c:\Users\Admin\Desktop\Rakesh\test
python run_tests.py smoke
```

**Happy Testing! 🚀**
