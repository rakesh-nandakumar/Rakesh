"""
Page Object Model for Backups Page
"""
from selenium.webdriver.common.by import By
from base_page import BasePage
from config import TestConfig
import time


class BackupsPage(BasePage):
    """Backups page interactions"""
    
    # Page Elements
    PAGE_TITLE = (By.XPATH, "//h1[contains(text(), 'Backup')]")
    
    # Data Table
    TABLE = (By.CSS_SELECTOR, "table")
    TABLE_ROWS = (By.CSS_SELECTOR, "tbody tr")
    TABLE_HEADER = (By.CSS_SELECTOR, "thead th")
    
    # Action Buttons
    VIEW_BUTTON = (By.XPATH, "//button[contains(., 'View')]")
    REFRESH_BUTTON = (By.XPATH, "//button[contains(@aria-label, 'Refresh') or contains(., 'Refresh')]")
    
    # Dialog for viewing backup
    DIALOG = (By.CSS_SELECTOR, "[role='dialog']")
    DIALOG_CLOSE = (By.CSS_SELECTOR, "[role='dialog'] button[aria-label='Close']")
    
    def __init__(self, driver):
        super().__init__(driver)
        self.url = TestConfig.ADMIN_URL + "/backups"
    
    def navigate(self):
        """Navigate to backups page"""
        super().navigate(self.url)
        self.log("Navigated to Backups Page")
    
    def get_backup_count(self):
        """Get number of backups in table"""
        rows = self.find_elements(self.TABLE_ROWS)
        count = len(rows)
        self.log(f"Found {count} backups")
        return count
    
    def click_view_on_first_backup(self):
        """Click view button on first backup"""
        rows = self.find_elements(self.TABLE_ROWS)
        if rows:
            first_row = rows[0]
            view_btn = first_row.find_element(By.XPATH, ".//button[contains(., 'View')]")
            view_btn.click()
            self.wait_for_visible(self.DIALOG, timeout=5)
            self.log("Clicked View on first backup")
            return True
        else:
            self.log_warning("No backups found to view")
            return False
    
    def is_dialog_open(self):
        """Check if dialog is open"""
        return self.is_element_visible(self.DIALOG, timeout=2)
    
    def close_dialog(self):
        """Close dialog"""
        if self.is_dialog_open():
            self.click(self.DIALOG_CLOSE)
            self.wait_for_invisible(self.DIALOG, timeout=5)
            self.log("Closed dialog")
    
    def verify_backup_table_headers(self):
        """Verify backup table has required headers"""
        self.log("Verifying backup table headers...")
        headers = self.find_elements(self.TABLE_HEADER)
        header_texts = [h.text.lower() for h in headers]
        
        expected = ["filename", "date", "size"]
        results = {}
        
        for exp in expected:
            found = any(exp in h for h in header_texts)
            results[exp] = found
            if found:
                self.log_success(f"✓ '{exp}' header found")
            else:
                self.log_warning(f"⚠ '{exp}' header not found")
        
        return results
    
    def verify_backups_sorted_latest_first(self):
        """Verify backups are sorted with latest first"""
        self.log("Verifying backups are sorted (latest first)...")
        rows = self.find_elements(self.TABLE_ROWS)
        
        if len(rows) < 2:
            self.log_warning("Not enough backups to verify sorting")
            return True
        
        # Get dates from first two rows
        first_date_cell = rows[0].find_elements(By.TAG_NAME, "td")[1]  # Assuming date is second column
        second_date_cell = rows[1].find_elements(By.TAG_NAME, "td")[1]
        
        first_date_text = first_date_cell.text
        second_date_text = second_date_cell.text
        
        self.log(f"First backup date: {first_date_text}")
        self.log(f"Second backup date: {second_date_text}")
        
        # Check if dates are valid (not "Invalid Date")
        if "invalid" in first_date_text.lower() or "invalid" in second_date_text.lower():
            self.log_error("✗ Invalid date found in backups")
            return False
        
        self.log_success("✓ Dates are valid")
        return True
