# 🚀 QUICK REFERENCE CARD - Selenium Test Suite

## ⚡ Quick Start (30 seconds)

```powershell
cd c:\Users\Admin\Desktop\Rakesh\test
.\setup_and_run.ps1
```

## 📋 Common Commands

### Run Tests

```powershell
python run_tests.py smoke       # Quick tests (3 min)
python run_tests.py all         # All tests (15 min)
python run_tests.py critical    # Critical tests (5 min)
python run_tests.py blogs       # Blog tests only
python run_tests.py portfolio   # Portfolio tests only
python run_tests.py gallery     # Gallery tests only
```

### Direct Pytest

```powershell
pytest tests/ -v                # All tests, verbose
pytest tests/test_login.py      # Specific file
pytest -m "smoke"               # Smoke tests only
pytest -m "critical"            # Critical tests only
pytest tests/ -n 4              # Parallel (4 workers)
pytest tests/ -x                # Stop on first failure
```

## 📁 Key Files

| File                | Purpose              |
| ------------------- | -------------------- |
| `run_tests.py`      | Main test runner     |
| `setup_and_run.ps1` | Automated setup      |
| `base_page.py`      | Core page object     |
| `conftest.py`       | Pytest configuration |
| `.env`              | Configuration        |

## 🗂️ Directory Structure

```
test/
├── pages/          # Page Objects (7 files)
├── tests/          # Test Suites (7 files)
├── screenshots/    # Failure screenshots
├── reports/        # HTML reports
└── test_data/      # Test data
```

## 🧪 Test Suites

| Suite       | Tests | Time  |
| ----------- | ----- | ----- |
| Login       | 8     | 1 min |
| Dashboard   | 7     | 1 min |
| Blogs       | 25+   | 4 min |
| Portfolio   | 15+   | 3 min |
| Gallery     | 12+   | 2 min |
| Site Config | 10+   | 2 min |
| Backups     | 10+   | 2 min |

## 🎯 Test Markers

```powershell
-m "smoke"          # Quick validation
-m "critical"       # Critical paths
-m "login"          # Login tests
-m "blogs"          # Blog tests
-m "portfolio"      # Portfolio tests
-m "gallery"        # Gallery tests
-m "site_config"    # Config tests
-m "backups"        # Backup tests
```

## ⚙️ Configuration (.env)

```env
ADMIN_URL=http://localhost:5173
ADMIN_PASSWORD=admin
HEADLESS_MODE=False
EXPLICIT_WAIT=20
```

## 📊 Expected Output

```
✓ test_login.py ........               [  8%]
✓ test_dashboard.py .......            [ 15%]
✓ test_blogs_crud.py ........          [ 40%]
...
========= 100+ passed in 12:34 =========
```

## 🐛 Debugging

```powershell
# Screenshots on failure
ls screenshots/

# View HTML report
start reports/test_report_*.html

# Increase timeout
# Edit .env: EXPLICIT_WAIT=30

# Run in visible mode
# Edit .env: HEADLESS_MODE=False
```

## 🔧 Prerequisites Check

```powershell
python --version    # Python 3.8+
pip --version       # pip installed
node --version      # Node.js installed

# Check servers
curl http://localhost:5173  # Admin panel
curl http://localhost:1420  # Backend
```

## 🚦 Start Servers

```powershell
# Terminal 1
cd admin; npm run dev

# Terminal 2
cd admin/server; node index.js
```

## 📖 Documentation

| File                        | Content             |
| --------------------------- | ------------------- |
| `QUICKSTART.md`             | 5-min setup guide   |
| `README.md`                 | Full documentation  |
| `MASTER_GUIDE.md`           | Complete reference  |
| `IMPLEMENTATION_SUMMARY.md` | This implementation |

## 🎓 Page Object Methods

### Navigation

```python
navigate(url)
refresh_page()
get_current_url()
```

### Element Interaction

```python
click(locator)
type_text(locator, text)
find_element(locator)
find_elements(locator)
```

### Waits

```python
wait_for_clickable(locator)
wait_for_visible(locator)
wait_for_invisible(locator)
wait_for_page_load()
```

### Validation

```python
is_element_present(locator)
is_element_visible(locator)
get_text(locator)
get_attribute(locator, attr)
```

### Logging

```python
log(message)          # Info (Cyan)
log_success(message)  # Success (Green)
log_warning(message)  # Warning (Yellow)
log_error(message)    # Error (Red)
```

## 🎯 Test Pattern

```python
def test_feature(authenticated_driver):
    """Test description"""
    page = PageObject(authenticated_driver)
    page.navigate()

    page.perform_action()

    assert page.verify_result(), "Error message"
    page.log_success("✓ Test passed")
```

## ⚡ Quick Fixes

| Problem            | Solution                          |
| ------------------ | --------------------------------- |
| Tests fail         | Check servers are running         |
| Element not found  | Increase `EXPLICIT_WAIT`          |
| ChromeDriver error | Auto-downloads, check internet    |
| Login fails        | Verify `ADMIN_PASSWORD` in `.env` |
| Tests too slow     | Run `python run_tests.py smoke`   |

## 📈 Success Criteria

- ✅ All tests pass (100% green)
- ✅ No screenshots in screenshots/
- ✅ HTML report shows pass rate
- ✅ Execution under 15 minutes

## 🎉 Quick Win

```powershell
# 1. Navigate to test folder
cd c:\Users\Admin\Desktop\Rakesh\test

# 2. Install dependencies (one-time)
pip install -r requirements.txt

# 3. Run smoke tests
python run_tests.py smoke

# Done! Check reports/ for results
```

## 🔗 CI/CD Integration

```yaml
# GitHub Actions
- name: Run Tests
  run: |
    cd test
    python run_tests.py smoke
```

## 💡 Pro Tips

1. Run smoke tests before committing
2. Check screenshots on failures
3. Use `-x` to stop on first failure
4. Run in parallel with `-n 4`
5. Use markers to run specific suites

## 🆘 Help

```powershell
python run_tests.py --help
pytest --help
```

---

**📚 Full docs:** `README.md` | `MASTER_GUIDE.md`
**🚀 Quick start:** `QUICKSTART.md`
**📊 Summary:** `IMPLEMENTATION_SUMMARY.md`

**Ready? Run:** `python run_tests.py smoke` 🎯
