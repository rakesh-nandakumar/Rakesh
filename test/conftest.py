"""
Pytest configuration and fixtures for Selenium tests
"""
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from datetime import datetime
import os
from config import TestConfig
from colorama import init, Fore, Style

# Initialize colorama for colored terminal output
init(autoreset=True)

TestConfig.ensure_dirs()

def pytest_configure(config):
    """Configure pytest with custom markers"""
    config.addinivalue_line("markers", "login: Login page tests")
    config.addinivalue_line("markers", "blogs: Blog management tests")
    config.addinivalue_line("markers", "portfolio: Portfolio management tests")
    config.addinivalue_line("markers", "gallery: Gallery management tests")
    config.addinivalue_line("markers", "timeline: Timeline management tests")
    config.addinivalue_line("markers", "site_config: Site configuration tests")
    config.addinivalue_line("markers", "backups: Backup system tests")
    config.addinivalue_line("markers", "smoke: Smoke tests")
    config.addinivalue_line("markers", "regression: Regression tests")
    config.addinivalue_line("markers", "critical: Critical path tests")


@pytest.fixture(scope="session")
def browser_options():
    """Configure Chrome browser options"""
    chrome_options = Options()
    
    if TestConfig.HEADLESS_MODE:
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-gpu")
    
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option("useAutomationExtension", False)
    
    return chrome_options


@pytest.fixture(scope="function")
def driver(browser_options):
    """Create and configure WebDriver instance for each test"""
    print(f"\n{Fore.CYAN}[SETUP] Initializing Chrome WebDriver...{Style.RESET_ALL}")
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=browser_options)
    driver.implicitly_wait(TestConfig.IMPLICIT_WAIT)
    driver.maximize_window()
    
    print(f"{Fore.GREEN}[SETUP] WebDriver initialized successfully{Style.RESET_ALL}")
    
    yield driver
    
    print(f"\n{Fore.CYAN}[TEARDOWN] Closing WebDriver...{Style.RESET_ALL}")
    driver.quit()
    print(f"{Fore.GREEN}[TEARDOWN] WebDriver closed successfully{Style.RESET_ALL}")


@pytest.fixture(scope="function")
def authenticated_driver(driver):
    """Provide an authenticated driver (logged in)"""
    from pages.login_page import LoginPage
    
    print(f"\n{Fore.CYAN}[AUTH] Logging into admin panel...{Style.RESET_ALL}")
    login_page = LoginPage(driver)
    login_page.navigate()
    login_page.login(TestConfig.ADMIN_PASSWORD)
    
    print(f"{Fore.GREEN}[AUTH] Successfully logged in{Style.RESET_ALL}")
    
    return driver


@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    """Hook to capture test results and take screenshots on failure"""
    outcome = yield
    report = outcome.get_result()
    
    if report.when == "call":
        if report.failed and TestConfig.SCREENSHOT_ON_FAILURE:
            driver = item.funcargs.get("driver") or item.funcargs.get("authenticated_driver")
            if driver:
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                screenshot_name = f"{item.name}_{timestamp}.png"
                screenshot_path = os.path.join(TestConfig.SCREENSHOT_DIR, screenshot_name)
                
                driver.save_screenshot(screenshot_path)
                print(f"\n{Fore.RED}[FAILURE] Screenshot saved: {screenshot_path}{Style.RESET_ALL}")
                
                # Add screenshot to HTML report
                if hasattr(report, "extra"):
                    report.extra.append(pytest.html.extras.image(screenshot_path))


def pytest_html_report_title(report):
    """Customize HTML report title"""
    report.title = "Admin Panel Selenium Test Report"


@pytest.fixture(scope="function", autouse=True)
def test_logger(request):
    """Log test execution details"""
    test_name = request.node.name
    print(f"\n{'='*80}")
    print(f"{Fore.YELLOW}[TEST START] {test_name}{Style.RESET_ALL}")
    print(f"{'='*80}")
    
    yield
    
    print(f"\n{'='*80}")
    print(f"{Fore.YELLOW}[TEST END] {test_name}{Style.RESET_ALL}")
    print(f"{'='*80}\n")
