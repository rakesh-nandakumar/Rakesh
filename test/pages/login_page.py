"""
Page Object Model for Login Page
"""
from selenium.webdriver.common.by import By
from base_page import BasePage
from config import TestConfig


class LoginPage(BasePage):
    """Login page interactions"""
    
    # Locators
    PASSWORD_INPUT = (By.ID, "password")
    SIGN_IN_BUTTON = (By.XPATH, "//button[contains(text(), 'Sign In')]")
    ERROR_MESSAGE = (By.CSS_SELECTOR, "[role='alert']")
    DEMO_PASSWORD_TEXT = (By.XPATH, "//code[text()='admin']")
    
    def __init__(self, driver):
        super().__init__(driver)
        self.url = TestConfig.ADMIN_URL + "/login"
    
    def navigate(self):
        """Navigate to login page"""
        super().navigate(self.url)
        self.log("Navigated to Login Page")
    
    def enter_password(self, password):
        """Enter password"""
        self.type_text(self.PASSWORD_INPUT, password)
        self.log(f"Entered password: {'*' * len(password)}")
    
    def click_sign_in(self):
        """Click sign in button"""
        self.click(self.SIGN_IN_BUTTON)
        self.log("Clicked Sign In button")
    
    def login(self, password):
        """Complete login flow"""
        self.enter_password(password)
        self.click_sign_in()
        self.wait_for_page_load()
        self.log_success(f"Login completed with password: {'*' * len(password)}")
    
    def is_on_login_page(self):
        """Check if on login page"""
        return "login" in self.get_current_url()
    
    def is_demo_password_visible(self):
        """Check if demo password hint is visible"""
        return self.is_element_visible(self.DEMO_PASSWORD_TEXT)
    
    def get_error_message(self):
        """Get error message if present"""
        try:
            return self.get_text(self.ERROR_MESSAGE)
        except:
            return None
    
    def verify_login_page_elements(self):
        """Verify all login page elements are present"""
        self.log("Verifying login page elements...")
        
        assertions = {
            "Password input": self.is_element_present(self.PASSWORD_INPUT),
            "Sign In button": self.is_element_present(self.SIGN_IN_BUTTON),
            "Demo password hint": self.is_element_present(self.DEMO_PASSWORD_TEXT),
        }
        
        for element, present in assertions.items():
            if present:
                self.log_success(f"✓ {element} is present")
            else:
                self.log_error(f"✗ {element} is missing")
        
        return all(assertions.values())
