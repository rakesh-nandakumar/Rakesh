"""
Page Object Model for Portfolio Page
"""
from selenium.webdriver.common.by import By
from base_page import BasePage
from config import TestConfig
import time


class PortfolioPage(BasePage):
    """Portfolio page interactions"""
    
    # Page Elements
    PAGE_TITLE = (By.XPATH, "//h1[contains(text(), 'Portfolio')]")
    ADD_PROJECT_BUTTON = (By.XPATH, "//button[contains(., 'Add') or contains(., 'New')]")
    
    # Data Table
    TABLE = (By.CSS_SELECTOR, "table")
    TABLE_ROWS = (By.CSS_SELECTOR, "tbody tr")
    
    # Dialog/Modal
    DIALOG = (By.CSS_SELECTOR, "[role='dialog']")
    DIALOG_CLOSE = (By.CSS_SELECTOR, "[role='dialog'] button[aria-label='Close']")
    
    # Form Fields
    TITLE_INPUT = (By.ID, "title")
    DESCRIPTION_TEXTAREA = (By.ID, "description")
    IMAGE_INPUT = (By.ID, "image")
    LINK_INPUT = (By.ID, "link")
    GITHUB_INPUT = (By.ID, "github")
    TECH_STACK_INPUT = (By.ID, "techStack")
    CATEGORY_INPUT = (By.ID, "category")
    FEATURED_CHECKBOX = (By.CSS_SELECTOR, "input[type='checkbox']#featured, button[role='switch']")
    
    # Action Buttons
    SAVE_BUTTON = (By.XPATH, "//button[contains(text(), 'Save') or contains(text(), 'Create') or contains(text(), 'Update')]")
    CANCEL_BUTTON = (By.XPATH, "//button[contains(text(), 'Cancel')]")
    
    def __init__(self, driver):
        super().__init__(driver)
        self.url = TestConfig.ADMIN_URL + "/portfolio"
    
    def navigate(self):
        """Navigate to portfolio page"""
        super().navigate(self.url)
        self.log("Navigated to Portfolio Page")
    
    def click_add_project(self):
        """Click Add Project button"""
        self.click(self.ADD_PROJECT_BUTTON)
        self.wait_for_visible(self.DIALOG, timeout=5)
        self.log("Clicked Add Project button")
    
    def is_dialog_open(self):
        """Check if dialog is open"""
        return self.is_element_visible(self.DIALOG, timeout=2)
    
    def close_dialog(self):
        """Close dialog"""
        if self.is_dialog_open():
            self.click(self.DIALOG_CLOSE)
            self.wait_for_invisible(self.DIALOG, timeout=5)
            self.log("Closed dialog")
    
    def fill_portfolio_form(self, project_data):
        """Fill portfolio form with data"""
        self.log("Filling portfolio form...")
        
        if "title" in project_data:
            self.type_text(self.TITLE_INPUT, project_data["title"])
            self.log(f"Entered title: {project_data['title']}")
        
        if "description" in project_data:
            self.type_text(self.DESCRIPTION_TEXTAREA, project_data["description"])
            self.log(f"Entered description")
        
        if "image" in project_data:
            self.type_text(self.IMAGE_INPUT, project_data["image"])
            self.log(f"Entered image: {project_data['image']}")
        
        if "link" in project_data:
            self.type_text(self.LINK_INPUT, project_data["link"])
            self.log(f"Entered link: {project_data['link']}")
        
        if "github" in project_data:
            self.type_text(self.GITHUB_INPUT, project_data["github"])
            self.log(f"Entered github: {project_data['github']}")
        
        if "techStack" in project_data:
            tech_str = ",".join(project_data["techStack"]) if isinstance(project_data["techStack"], list) else project_data["techStack"]
            self.type_text(self.TECH_STACK_INPUT, tech_str)
            self.log(f"Entered tech stack: {tech_str}")
        
        if "category" in project_data:
            self.type_text(self.CATEGORY_INPUT, project_data["category"])
            self.log(f"Entered category: {project_data['category']}")
        
        if "featured" in project_data and project_data["featured"]:
            if self.is_element_present(self.FEATURED_CHECKBOX, timeout=2):
                self.click(self.FEATURED_CHECKBOX)
                self.log("Checked featured checkbox")
        
        self.log_success("Portfolio form filled successfully")
    
    def click_save(self):
        """Click save button"""
        self.click(self.SAVE_BUTTON)
        self.log("Clicked Save button")
        time.sleep(1)
    
    def create_portfolio_project(self, project_data):
        """Complete flow to create a portfolio project"""
        self.click_add_project()
        self.fill_portfolio_form(project_data)
        self.click_save()
        
        toast_text = self.wait_for_toast()
        if toast_text and "success" in toast_text.lower():
            self.log_success(f"Portfolio project created: {project_data.get('title', 'Untitled')}")
            return True
        return False
    
    def get_table_row_count(self):
        """Get number of rows in table"""
        rows = self.find_elements(self.TABLE_ROWS)
        count = len(rows)
        self.log(f"Table has {count} rows")
        return count
    
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
    
    def verify_project_in_table(self, title):
        """Verify project exists in table"""
        locator = (By.XPATH, f"//td[contains(text(), '{title}')]")
        exists = self.is_element_present(locator, timeout=5)
        if exists:
            self.log_success(f"✓ Project '{title}' found in table")
        else:
            self.log_error(f"✗ Project '{title}' not found in table")
        return exists
