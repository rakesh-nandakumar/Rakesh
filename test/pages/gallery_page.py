"""
Page Object Model for Gallery Page
"""
from selenium.webdriver.common.by import By
from base_page import BasePage
from config import TestConfig
import time


class GalleryPage(BasePage):
    """Gallery page interactions"""
    
    # Page Elements
    PAGE_TITLE = (By.XPATH, "//h1[contains(text(), 'Gallery')]")
    ADD_IMAGE_BUTTON = (By.XPATH, "//button[contains(., 'Add') or contains(., 'New')]")
    
    # Data Table
    TABLE = (By.CSS_SELECTOR, "table")
    TABLE_ROWS = (By.CSS_SELECTOR, "tbody tr")
    
    # Dialog/Modal
    DIALOG = (By.CSS_SELECTOR, "[role='dialog']")
    DIALOG_CLOSE = (By.CSS_SELECTOR, "[role='dialog'] button[aria-label='Close']")
    
    # Form Fields
    ID_INPUT = (By.ID, "id")
    SRC_INPUT = (By.ID, "src")
    ALT_INPUT = (By.ID, "alt")
    TITLE_INPUT = (By.ID, "title")
    CATEGORY_INPUT = (By.ID, "category")
    
    # Action Buttons
    SAVE_BUTTON = (By.XPATH, "//button[contains(text(), 'Save') or contains(text(), 'Create') or contains(text(), 'Update')]")
    CANCEL_BUTTON = (By.XPATH, "//button[contains(text(), 'Cancel')]")
    
    def __init__(self, driver):
        super().__init__(driver)
        self.url = TestConfig.ADMIN_URL + "/gallery"
    
    def navigate(self):
        """Navigate to gallery page"""
        super().navigate(self.url)
        self.log("Navigated to Gallery Page")
    
    def click_add_image(self):
        """Click Add Image button"""
        self.click(self.ADD_IMAGE_BUTTON)
        self.wait_for_visible(self.DIALOG, timeout=5)
        self.log("Clicked Add Image button")
    
    def is_dialog_open(self):
        """Check if dialog is open"""
        return self.is_element_visible(self.DIALOG, timeout=2)
    
    def close_dialog(self):
        """Close dialog"""
        if self.is_dialog_open():
            self.click(self.DIALOG_CLOSE)
            self.wait_for_invisible(self.DIALOG, timeout=5)
            self.log("Closed dialog")
    
    def fill_gallery_form(self, gallery_data):
        """Fill gallery form with data"""
        self.log("Filling gallery form...")
        
        if "id" in gallery_data:
            self.type_text(self.ID_INPUT, gallery_data["id"])
            self.log(f"Entered ID: {gallery_data['id']}")
        
        if "src" in gallery_data:
            self.type_text(self.SRC_INPUT, gallery_data["src"])
            self.log(f"Entered src: {gallery_data['src']}")
        
        if "alt" in gallery_data:
            self.type_text(self.ALT_INPUT, gallery_data["alt"])
            self.log(f"Entered alt: {gallery_data['alt']}")
        
        if "title" in gallery_data:
            self.type_text(self.TITLE_INPUT, gallery_data["title"])
            self.log(f"Entered title: {gallery_data['title']}")
        
        if "category" in gallery_data:
            self.type_text(self.CATEGORY_INPUT, gallery_data["category"])
            self.log(f"Entered category: {gallery_data['category']}")
        
        self.log_success("Gallery form filled successfully")
    
    def click_save(self):
        """Click save button"""
        self.click(self.SAVE_BUTTON)
        self.log("Clicked Save button")
        time.sleep(1)
    
    def create_gallery_item(self, gallery_data):
        """Complete flow to create a gallery item"""
        self.click_add_image()
        self.fill_gallery_form(gallery_data)
        self.click_save()
        
        toast_text = self.wait_for_toast()
        if toast_text and "success" in toast_text.lower():
            self.log_success(f"Gallery item created: {gallery_data.get('title', 'Untitled')}")
            return True
        return False
    
    def get_table_row_count(self):
        """Get number of rows in table"""
        rows = self.find_elements(self.TABLE_ROWS)
        count = len(rows)
        self.log(f"Table has {count} rows")
        return count
    
    def verify_item_in_table(self, title):
        """Verify gallery item exists in table"""
        locator = (By.XPATH, f"//td[contains(text(), '{title}')]")
        exists = self.is_element_present(locator, timeout=5)
        if exists:
            self.log_success(f"✓ Gallery item '{title}' found in table")
        else:
            self.log_error(f"✗ Gallery item '{title}' not found in table")
        return exists
