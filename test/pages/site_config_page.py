"""
Page Object Model for Site Config Page
"""
from selenium.webdriver.common.by import By
from base_page import BasePage
from config import TestConfig
import time


class SiteConfigPage(BasePage):
    """Site Config page interactions"""
    
    # Page Elements
    PAGE_TITLE = (By.XPATH, "//h1[contains(text(), 'Site Configuration') or contains(text(), 'Configuration')]")
    SAVE_BUTTON = (By.XPATH, "//button[contains(., 'Save')]")
    
    # Config Toggles (dynamic based on config data)
    TOGGLE_SWITCH = (By.CSS_SELECTOR, "button[role='switch']")
    
    def __init__(self, driver):
        super().__init__(driver)
        self.url = TestConfig.ADMIN_URL + "/site-config"
    
    def navigate(self):
        """Navigate to site config page"""
        super().navigate(self.url)
        self.log("Navigated to Site Config Page")
    
    def get_all_toggle_switches(self):
        """Get all toggle switches"""
        switches = self.find_elements(self.TOGGLE_SWITCH)
        self.log(f"Found {len(switches)} toggle switches")
        return switches
    
    def toggle_switch_by_index(self, index):
        """Toggle switch by index"""
        switches = self.get_all_toggle_switches()
        if index < len(switches):
            switches[index].click()
            self.log(f"Toggled switch at index {index}")
            time.sleep(0.5)
            return True
        else:
            self.log_error(f"Switch index {index} out of range")
            return False
    
    def toggle_switch_by_label(self, label_text):
        """Toggle switch by associated label text"""
        locator = (By.XPATH, f"//label[contains(text(), '{label_text}')]/following-sibling::button[@role='switch'] | //label[contains(text(), '{label_text}')]//button[@role='switch']")
        if self.is_element_present(locator, timeout=2):
            self.click(locator)
            self.log(f"Toggled switch for: {label_text}")
            return True
        else:
            self.log_warning(f"Switch not found for label: {label_text}")
            return False
    
    def click_save(self):
        """Click save button"""
        self.click(self.SAVE_BUTTON)
        self.log("Clicked Save button")
        time.sleep(1)
    
    def save_configuration(self):
        """Save configuration and verify"""
        self.click_save()
        toast_text = self.wait_for_toast()
        if toast_text and "success" in toast_text.lower():
            self.log_success("Configuration saved successfully")
            return True
        return False
    
    def verify_toggles_present(self):
        """Verify toggle switches are present"""
        switches = self.get_all_toggle_switches()
        if switches:
            self.log_success(f"✓ Found {len(switches)} toggle switches")
            return True
        else:
            self.log_error("✗ No toggle switches found")
            return False
