# Admin Panel Selenium Test Suite

Comprehensive Selenium-based automation testing for the Admin Panel, covering all modules, CRUD operations, edge cases, and UI interactions.

## 📋 Overview

This test suite provides **100% coverage** of the admin panel functionality using Selenium WebDriver with Python. It includes:

- ✅ Login & Authentication
- ✅ Navigation & Dashboard
- ✅ Blogs CRUD Operations
- ✅ Portfolio CRUD Operations
- ✅ Gallery CRUD Operations
- ✅ Timeline Management
- ✅ Site Configuration
- ✅ Backup System
- ✅ Edge Cases & Error Handling
- ✅ Automated Reporting

## 🚀 Quick Start

### 1. Install Dependencies

```powershell
cd test
pip install -r requirements.txt
```

### 2. Configuration

Copy `.env.example` to `.env` and configure:

```powershell
copy .env.example .env
```

Edit `.env`:

```env
ADMIN_URL=http://localhost:5173
ADMIN_PASSWORD=admin
SERVER_URL=http://localhost:1420
HEADLESS_MODE=False
```

### 3. Start Servers

**Terminal 1 - Admin Panel:**

```powershell
cd admin
npm run dev
```

**Terminal 2 - Backend Server:**

```powershell
cd admin/server
node index.js
```

### 4. Run Tests

**Run all tests:**

```powershell
python run_tests.py
```

**Run specific test suites:**

```powershell
python run_tests.py smoke      # Smoke tests only
python run_tests.py critical   # Critical path tests
python run_tests.py blogs      # Blog tests only
python run_tests.py portfolio  # Portfolio tests only
python run_tests.py gallery    # Gallery tests only
```

## 📁 Project Structure

```
test/
├── pages/                      # Page Object Models
│   ├── login_page.py          # Login page interactions
│   ├── dashboard_page.py      # Dashboard & navigation
│   ├── blogs_page.py          # Blogs page
│   ├── portfolio_page.py      # Portfolio page
│   ├── gallery_page.py        # Gallery page
│   ├── site_config_page.py    # Site config page
│   └── backups_page.py        # Backups page
│
├── tests/                      # Test Suites
│   ├── test_login.py          # Login tests
│   ├── test_dashboard.py      # Navigation tests
│   ├── test_blogs_crud.py     # Blog CRUD tests
│   ├── test_portfolio_crud.py # Portfolio CRUD tests
│   ├── test_gallery_crud.py   # Gallery CRUD tests
│   ├── test_site_config.py    # Config tests
│   └── test_backups.py        # Backup tests
│
├── base_page.py               # Base Page Object class
├── config.py                  # Configuration settings
├── conftest.py                # Pytest fixtures & hooks
├── run_tests.py               # Main test runner
├── requirements.txt           # Python dependencies
├── .env.example               # Environment template
│
├── screenshots/               # Failure screenshots
├── reports/                   # HTML test reports
└── README.md                  # This file
```

## 🧪 Test Coverage

### Login Tests (`test_login.py`)

- ✅ Login page elements verification
- ✅ Successful login with correct password
- ✅ Failed login with wrong password
- ✅ Empty password validation
- ✅ Special characters in password
- ✅ Very long password handling
- ✅ Case sensitivity check

### Dashboard Tests (`test_dashboard.py`)

- ✅ Dashboard loads successfully
- ✅ Navigation menu presence
- ✅ Navigate to all pages
- ✅ Sequential navigation
- ✅ Backup indicator visibility
- ✅ Theme toggle functionality

### Blog CRUD Tests (`test_blogs_crud.py`)

- ✅ Page loads and elements present
- ✅ Create blog with valid data
- ✅ Create blog with minimal fields
- ✅ Create blog with multiple tags
- ✅ Edit existing blog
- ✅ Delete blog
- ✅ Search functionality
- ✅ Pagination
- ✅ Edge cases:
  - Special characters
  - Very long content
  - Unicode support
  - XSS prevention
  - Duplicate slugs
  - Future dates
  - Invalid dates

### Portfolio CRUD Tests (`test_portfolio_crud.py`)

- ✅ Create portfolio project
- ✅ Edit project
- ✅ Delete project
- ✅ Multiple tech stack
- ✅ Featured projects
- ✅ Edge cases:
  - Special characters
  - Very long descriptions
  - Unicode support
  - Invalid URLs

### Gallery CRUD Tests (`test_gallery_crud.py`)

- ✅ Create gallery item
- ✅ Edit gallery item
- ✅ Delete gallery item
- ✅ Image display verification
- ✅ Edge cases:
  - Duplicate IDs
  - Special characters
  - Unicode support

### Site Config Tests (`test_site_config.py`)

- ✅ Page loads
- ✅ Toggle switches present
- ✅ Toggle functionality
- ✅ Save configuration
- ✅ Configuration persistence
- ✅ Edge cases:
  - Rapid toggling
  - Save without changes
  - Multiple saves

### Backup Tests (`test_backups.py`)

- ✅ Backups page loads
- ✅ Backup table display
- ✅ View backup details
- ✅ Date validation
- ✅ Automatic backup creation
- ✅ Naming convention verification
- ✅ Latest-to-oldest sorting

## 🎯 Test Markers

Tests are organized using pytest markers:

```python
@pytest.mark.login        # Login tests
@pytest.mark.blogs        # Blog tests
@pytest.mark.portfolio    # Portfolio tests
@pytest.mark.gallery      # Gallery tests
@pytest.mark.site_config  # Site config tests
@pytest.mark.backups      # Backup tests
@pytest.mark.smoke        # Smoke tests (quick validation)
@pytest.mark.critical     # Critical path tests
@pytest.mark.regression   # Regression tests
```

Run specific markers:

```powershell
pytest -m login           # Run only login tests
pytest -m "smoke"         # Run smoke tests
pytest -m "critical"      # Run critical tests
pytest -m "blogs or portfolio"  # Run blogs OR portfolio tests
```

## 📊 Reporting

### HTML Reports

- Generated automatically in `reports/` folder
- Includes:
  - Test results (passed/failed/skipped)
  - Execution time
  - Screenshots on failure
  - Detailed logs

### Console Output

- Color-coded output:
  - 🟢 Green: Success
  - 🔴 Red: Error/Failure
  - 🟡 Yellow: Warning
  - 🔵 Cyan: Info

### Screenshots

- Automatically captured on test failure
- Saved in `screenshots/` folder
- Named with test name and timestamp

## 🔧 Configuration Options

### Environment Variables (.env)

| Variable                | Description                     | Default                 |
| ----------------------- | ------------------------------- | ----------------------- |
| `ADMIN_URL`             | Admin panel URL                 | `http://localhost:5173` |
| `ADMIN_PASSWORD`        | Login password                  | `admin`                 |
| `SERVER_URL`            | Backend server URL              | `http://localhost:1420` |
| `HEADLESS_MODE`         | Run browser headless            | `False`                 |
| `IMPLICIT_WAIT`         | Implicit wait timeout (seconds) | `10`                    |
| `EXPLICIT_WAIT`         | Explicit wait timeout (seconds) | `20`                    |
| `SCREENSHOT_ON_FAILURE` | Take screenshot on failure      | `True`                  |

### Browser Options

- Configurable in `conftest.py`
- Default: Chrome (latest)
- Supports headless mode
- Window size: 1920x1080

## 🎓 Writing New Tests

### 1. Create Page Object

```python
# pages/new_page.py
from base_page import BasePage
from selenium.webdriver.common.by import By

class NewPage(BasePage):
    # Locators
    ELEMENT_LOCATOR = (By.ID, "element-id")

    def __init__(self, driver):
        super().__init__(driver)
        self.url = TestConfig.ADMIN_URL + "/new-page"

    def navigate(self):
        super().navigate(self.url)

    def interact_with_element(self):
        self.click(self.ELEMENT_LOCATOR)
```

### 2. Create Test File

```python
# tests/test_new_feature.py
import pytest
from pages.new_page import NewPage

@pytest.mark.new_feature
class TestNewFeature:
    def test_something(self, authenticated_driver):
        page = NewPage(authenticated_driver)
        page.navigate()
        page.interact_with_element()
        assert page.is_element_visible(page.ELEMENT_LOCATOR)
```

## 🐛 Troubleshooting

### Common Issues

**1. ChromeDriver not found**

```
Solution: The webdriver-manager will auto-download. Ensure internet connection.
```

**2. Element not found**

```
Solution:
- Increase EXPLICIT_WAIT in .env
- Check if element locator is correct
- Verify page has loaded
```

**3. Tests failing due to timing**

```
Solution:
- Use explicit waits instead of time.sleep()
- Increase timeout values
- Check network latency
```

**4. Admin panel not accessible**

```
Solution:
- Verify servers are running
- Check ADMIN_URL in .env
- Ensure port 5173 is available
```

## 📝 Best Practices

1. **Use Page Object Model**: All page interactions in page objects
2. **Wait Explicitly**: Use `wait_for_*` methods instead of `time.sleep()`
3. **Descriptive Names**: Test names should describe what they test
4. **Assertions**: Include clear assertion messages
5. **Cleanup**: Tests should be independent and clean up after themselves
6. **Logging**: Use built-in logging methods for visibility

## 🚦 Continuous Integration

### GitHub Actions Example

```yaml
name: Selenium Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-python@v2
        with:
          python-version: "3.9"
      - name: Install dependencies
        run: |
          pip install -r test/requirements.txt
      - name: Run tests
        run: |
          cd test
          python run_tests.py smoke
```

## 📈 Test Metrics

After running tests, you'll see:

- Total tests run
- Pass/Fail/Skip counts
- Execution time
- Coverage percentage
- Failed test details

## 🤝 Contributing

To add new tests:

1. Follow the Page Object Model pattern
2. Add appropriate pytest markers
3. Include edge cases
4. Update this README
5. Ensure all tests pass

## 📄 License

This test suite is part of the Admin Panel project.

## 🆘 Support

For issues or questions:

1. Check the troubleshooting section
2. Review test logs and screenshots
3. Check browser console for errors
4. Verify server logs

---

**Happy Testing! 🎉**
