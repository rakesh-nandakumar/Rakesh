"""
Base Page Object Model class with common methods
"""
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import (
    TimeoutException, 
    NoSuchElementException,
    ElementClickInterceptedException
)
from config import TestConfig
from colorama import Fore, Style
import time


class BasePage:
    """Base class for all page objects"""
    
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, TestConfig.EXPLICIT_WAIT)
        self.actions = ActionChains(driver)
    
    def navigate(self, url):
        """Navigate to a URL"""
        self.log(f"Navigating to: {url}")
        self.driver.get(url)
        self.wait_for_page_load()
    
    def wait_for_page_load(self):
        """Wait for page to fully load"""
        self.wait.until(
            lambda driver: driver.execute_script("return document.readyState") == "complete"
        )
    
    def find_element(self, locator, timeout=None):
        """Find element with explicit wait"""
        try:
            wait = WebDriverWait(self.driver, timeout or TestConfig.EXPLICIT_WAIT)
            element = wait.until(EC.presence_of_element_located(locator))
            return element
        except TimeoutException:
            self.log_error(f"Element not found: {locator}")
            raise
    
    def find_elements(self, locator, timeout=None):
        """Find multiple elements"""
        try:
            wait = WebDriverWait(self.driver, timeout or TestConfig.EXPLICIT_WAIT)
            elements = wait.until(EC.presence_of_all_elements_located(locator))
            return elements
        except TimeoutException:
            self.log_error(f"Elements not found: {locator}")
            return []
    
    def click(self, locator, timeout=None):
        """Click element with retry logic"""
        try:
            element = self.wait_for_clickable(locator, timeout)
            element.click()
            self.log(f"Clicked: {locator}")
        except ElementClickInterceptedException:
            self.log_warning(f"Click intercepted, trying JS click: {locator}")
            element = self.find_element(locator, timeout)
            self.driver.execute_script("arguments[0].click();", element)
    
    def click_by_text(self, tag, text, timeout=None):
        """Click element by text content"""
        locator = (By.XPATH, f"//{tag}[contains(text(), '{text}')]")
        self.click(locator, timeout)
    
    def type_text(self, locator, text, clear_first=True):
        """Type text into input field"""
        element = self.find_element(locator)
        if clear_first:
            element.clear()
        element.send_keys(text)
        self.log(f"Typed text into: {locator}")
    
    def type_slowly(self, locator, text, delay=0.1):
        """Type text character by character (for special inputs)"""
        element = self.find_element(locator)
        element.clear()
        for char in text:
            element.send_keys(char)
            time.sleep(delay)
        self.log(f"Typed text slowly into: {locator}")
    
    def select_dropdown(self, locator, value):
        """Select dropdown option by value"""
        element = self.find_element(locator)
        element.click()
        option_locator = (By.XPATH, f"//option[@value='{value}']")
        self.click(option_locator)
    
    def wait_for_clickable(self, locator, timeout=None):
        """Wait for element to be clickable"""
        wait = WebDriverWait(self.driver, timeout or TestConfig.EXPLICIT_WAIT)
        return wait.until(EC.element_to_be_clickable(locator))
    
    def wait_for_visible(self, locator, timeout=None):
        """Wait for element to be visible"""
        wait = WebDriverWait(self.driver, timeout or TestConfig.EXPLICIT_WAIT)
        return wait.until(EC.visibility_of_element_located(locator))
    
    def wait_for_invisible(self, locator, timeout=None):
        """Wait for element to become invisible"""
        try:
            wait = WebDriverWait(self.driver, timeout or TestConfig.EXPLICIT_WAIT)
            wait.until(EC.invisibility_of_element_located(locator))
            return True
        except TimeoutException:
            return False
    
    def is_element_present(self, locator, timeout=2):
        """Check if element exists"""
        try:
            self.find_element(locator, timeout)
            return True
        except (TimeoutException, NoSuchElementException):
            return False
    
    def is_element_visible(self, locator, timeout=2):
        """Check if element is visible"""
        try:
            element = self.find_element(locator, timeout)
            return element.is_displayed()
        except (TimeoutException, NoSuchElementException):
            return False
    
    def get_text(self, locator):
        """Get text from element"""
        element = self.find_element(locator)
        return element.text
    
    def get_attribute(self, locator, attribute):
        """Get attribute value from element"""
        element = self.find_element(locator)
        return element.get_attribute(attribute)
    
    def scroll_to_element(self, locator):
        """Scroll to element"""
        element = self.find_element(locator)
        self.driver.execute_script("arguments[0].scrollIntoView(true);", element)
        time.sleep(0.5)
    
    def scroll_to_bottom(self):
        """Scroll to bottom of page"""
        self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(0.5)
    
    def scroll_to_top(self):
        """Scroll to top of page"""
        self.driver.execute_script("window.scrollTo(0, 0);")
        time.sleep(0.5)
    
    def press_key(self, locator, key):
        """Press keyboard key on element"""
        element = self.find_element(locator)
        element.send_keys(key)
    
    def press_enter(self, locator):
        """Press Enter key"""
        self.press_key(locator, Keys.RETURN)
    
    def hover(self, locator):
        """Hover over element"""
        element = self.find_element(locator)
        self.actions.move_to_element(element).perform()
    
    def wait_for_toast(self, timeout=5):
        """Wait for toast notification to appear"""
        try:
            toast_locator = (By.CSS_SELECTOR, "[class*='toast'], [role='status']")
            element = self.wait_for_visible(toast_locator, timeout)
            text = element.text
            self.log(f"Toast message: {text}")
            return text
        except TimeoutException:
            self.log_warning("Toast notification not found")
            return None
    
    def get_current_url(self):
        """Get current page URL"""
        return self.driver.current_url
    
    def refresh_page(self):
        """Refresh current page"""
        self.log("Refreshing page")
        self.driver.refresh()
        self.wait_for_page_load()
    
    def switch_to_tab(self, tab_index):
        """Switch to browser tab by index"""
        self.driver.switch_to.window(self.driver.window_handles[tab_index])
    
    def close_current_tab(self):
        """Close current browser tab"""
        self.driver.close()
    
    def accept_alert(self):
        """Accept browser alert"""
        alert = self.wait.until(EC.alert_is_present())
        alert.accept()
    
    def dismiss_alert(self):
        """Dismiss browser alert"""
        alert = self.wait.until(EC.alert_is_present())
        alert.dismiss()
    
    def take_screenshot(self, name):
        """Take screenshot"""
        import os
        from datetime import datetime
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{name}_{timestamp}.png"
        filepath = os.path.join(TestConfig.SCREENSHOT_DIR, filename)
        self.driver.save_screenshot(filepath)
        self.log(f"Screenshot saved: {filepath}")
        return filepath
    
    def log(self, message):
        """Log info message"""
        print(f"{Fore.CYAN}[INFO] {message}{Style.RESET_ALL}")
    
    def log_success(self, message):
        """Log success message"""
        print(f"{Fore.GREEN}[SUCCESS] {message}{Style.RESET_ALL}")
    
    def log_warning(self, message):
        """Log warning message"""
        print(f"{Fore.YELLOW}[WARNING] {message}{Style.RESET_ALL}")
    
    def log_error(self, message):
        """Log error message"""
        print(f"{Fore.RED}[ERROR] {message}{Style.RESET_ALL}")
    
    def wait(self, seconds):
        """Explicit wait"""
        time.sleep(seconds)
