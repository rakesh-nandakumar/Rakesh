"""
Page Object Model for Blogs Page
"""
from selenium.webdriver.common.by import By
from base_page import BasePage
from config import TestConfig
import time


class BlogsPage(BasePage):
    """Blogs page interactions"""
    
    # Page Elements
    PAGE_TITLE = (By.XPATH, "//h1[contains(text(), 'Blogs') or contains(text(), 'Blog')]")
    ADD_BLOG_BUTTON = (By.XPATH, "//button[contains(., 'Add') or contains(., 'New')]")
    
    # Data Table
    TABLE = (By.CSS_SELECTOR, "table")
    TABLE_ROWS = (By.CSS_SELECTOR, "tbody tr")
    TABLE_HEADER = (By.CSS_SELECTOR, "thead th")
    
    # Search/Filter
    SEARCH_INPUT = (By.CSS_SELECTOR, "input[placeholder*='Search'], input[type='search']")
    
    # Dialog/Modal
    DIALOG = (By.CSS_SELECTOR, "[role='dialog']")
    DIALOG_TITLE = (By.CSS_SELECTOR, "[role='dialog'] h2, [role='dialog'] [class*='title']")
    DIALOG_CLOSE = (By.CSS_SELECTOR, "[role='dialog'] button[aria-label='Close']")
    
    # Form Fields
    TITLE_INPUT = (By.ID, "title")
    SLUG_INPUT = (By.ID, "slug")
    EXCERPT_TEXTAREA = (By.ID, "excerpt")
    DATE_INPUT = (By.ID, "date")
    CATEGORY_INPUT = (By.ID, "category")
    AUTHOR_INPUT = (By.ID, "author")
    READ_TIME_INPUT = (By.ID, "readTime")
    TAGS_INPUT = (By.ID, "tags")
    IMAGE_INPUT = (By.ID, "image")
    CONTENT_TEXTAREA = (By.ID, "content")
    
    # Action Buttons
    SAVE_BUTTON = (By.XPATH, "//button[contains(text(), 'Save') or contains(text(), 'Create') or contains(text(), 'Update')]")
    CANCEL_BUTTON = (By.XPATH, "//button[contains(text(), 'Cancel')]")
    
    # Row Actions
    EDIT_BUTTON = (By.XPATH, "//button[contains(@aria-label, 'Edit') or contains(., 'Edit')]")
    DELETE_BUTTON = (By.XPATH, "//button[contains(@aria-label, 'Delete') or contains(., 'Delete')]")
    DUPLICATE_BUTTON = (By.XPATH, "//button[contains(@aria-label, 'Duplicate') or contains(., 'Duplicate')]")
    VIEW_BUTTON = (By.XPATH, "//button[contains(@aria-label, 'View') or contains(., 'View')]")
    
    # Pagination
    PAGINATION = (By.CSS_SELECTOR, "[role='navigation'][aria-label*='pagination']")
    NEXT_PAGE = (By.XPATH, "//button[contains(@aria-label, 'Next') or contains(., 'Next')]")
    PREV_PAGE = (By.XPATH, "//button[contains(@aria-label, 'Previous') or contains(., 'Previous')]")
    
    def __init__(self, driver):
        super().__init__(driver)
        self.url = TestConfig.ADMIN_URL + "/blogs"
    
    def navigate(self):
        """Navigate to blogs page"""
        super().navigate(self.url)
        self.log("Navigated to Blogs Page")
    
    def click_add_blog(self):
        """Click Add Blog button"""
        self.click(self.ADD_BLOG_BUTTON)
        self.wait_for_visible(self.DIALOG, timeout=5)
        self.log("Clicked Add Blog button")
    
    def is_dialog_open(self):
        """Check if dialog is open"""
        return self.is_element_visible(self.DIALOG, timeout=2)
    
    def close_dialog(self):
        """Close dialog"""
        if self.is_dialog_open():
            self.click(self.DIALOG_CLOSE)
            self.wait_for_invisible(self.DIALOG, timeout=5)
            self.log("Closed dialog")
    
    def fill_blog_form(self, blog_data):
        """Fill blog form with data"""
        self.log("Filling blog form...")
        
        if "title" in blog_data:
            self.type_text(self.TITLE_INPUT, blog_data["title"])
            self.log(f"Entered title: {blog_data['title']}")
        
        if "slug" in blog_data:
            self.type_text(self.SLUG_INPUT, blog_data["slug"])
            self.log(f"Entered slug: {blog_data['slug']}")
        
        if "excerpt" in blog_data:
            self.type_text(self.EXCERPT_TEXTAREA, blog_data["excerpt"])
            self.log(f"Entered excerpt")
        
        if "date" in blog_data:
            self.type_text(self.DATE_INPUT, blog_data["date"])
            self.log(f"Entered date: {blog_data['date']}")
        
        if "category" in blog_data:
            self.type_text(self.CATEGORY_INPUT, blog_data["category"])
            self.log(f"Entered category: {blog_data['category']}")
        
        if "author" in blog_data:
            self.type_text(self.AUTHOR_INPUT, blog_data["author"])
            self.log(f"Entered author: {blog_data['author']}")
        
        if "readTime" in blog_data:
            self.type_text(self.READ_TIME_INPUT, str(blog_data["readTime"]))
            self.log(f"Entered read time: {blog_data['readTime']}")
        
        if "tags" in blog_data:
            tags_str = ",".join(blog_data["tags"]) if isinstance(blog_data["tags"], list) else blog_data["tags"]
            self.type_text(self.TAGS_INPUT, tags_str)
            self.log(f"Entered tags: {tags_str}")
        
        if "image" in blog_data:
            self.type_text(self.IMAGE_INPUT, blog_data["image"])
            self.log(f"Entered image: {blog_data['image']}")
        
        if "content" in blog_data:
            self.type_text(self.CONTENT_TEXTAREA, blog_data["content"])
            self.log(f"Entered content")
        
        self.log_success("Blog form filled successfully")
    
    def click_save(self):
        """Click save button"""
        self.click(self.SAVE_BUTTON)
        self.log("Clicked Save button")
        time.sleep(1)  # Wait for save operation
    
    def click_cancel(self):
        """Click cancel button"""
        self.click(self.CANCEL_BUTTON)
        self.log("Clicked Cancel button")
    
    def create_blog(self, blog_data):
        """Complete flow to create a blog"""
        self.click_add_blog()
        self.fill_blog_form(blog_data)
        self.click_save()
        
        # Wait for toast or dialog to close
        toast_text = self.wait_for_toast()
        if toast_text and "success" in toast_text.lower():
            self.log_success(f"Blog created successfully: {blog_data.get('title', 'Untitled')}")
            return True
        return False
    
    def get_table_row_count(self):
        """Get number of rows in table"""
        rows = self.find_elements(self.TABLE_ROWS)
        count = len(rows)
        self.log(f"Table has {count} rows")
        return count
    
    def search_blog(self, search_text):
        """Search for blog"""
        if self.is_element_present(self.SEARCH_INPUT, timeout=2):
            self.type_text(self.SEARCH_INPUT, search_text)
            self.log(f"Searched for: {search_text}")
            time.sleep(1)  # Wait for filter
    
    def click_edit_on_first_row(self):
        """Click edit button on first row"""
        rows = self.find_elements(self.TABLE_ROWS)
        if rows:
            first_row = rows[0]
            edit_btn = first_row.find_element(By.XPATH, ".//button[contains(@aria-label, 'Edit') or contains(., 'Edit')]")
            edit_btn.click()
            self.wait_for_visible(self.DIALOG, timeout=5)
            self.log("Clicked Edit on first row")
            return True
        else:
            self.log_warning("No rows found to edit")
            return False
    
    def click_delete_on_first_row(self):
        """Click delete button on first row"""
        rows = self.find_elements(self.TABLE_ROWS)
        if rows:
            first_row = rows[0]
            delete_btn = first_row.find_element(By.XPATH, ".//button[contains(@aria-label, 'Delete') or contains(., 'Delete')]")
            delete_btn.click()
            self.log("Clicked Delete on first row")
            time.sleep(1)
            return True
        else:
            self.log_warning("No rows found to delete")
            return False
    
    def verify_blog_in_table(self, title):
        """Verify blog exists in table"""
        locator = (By.XPATH, f"//td[contains(text(), '{title}')]")
        exists = self.is_element_present(locator, timeout=5)
        if exists:
            self.log_success(f"✓ Blog '{title}' found in table")
        else:
            self.log_error(f"✗ Blog '{title}' not found in table")
        return exists
