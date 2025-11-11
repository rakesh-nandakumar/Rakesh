"""
Page Object Model for Dashboard/Common Navigation
"""
from selenium.webdriver.common.by import By
from base_page import BasePage
from config import TestConfig


class DashboardPage(BasePage):
    """Dashboard and common navigation elements"""
    
    # Sidebar Navigation
    SIDEBAR = (By.CSS_SELECTOR, "aside, [role='navigation']")
    NAV_BLOGS = (By.XPATH, "//a[contains(@href, '/blogs')]")
    NAV_PORTFOLIO = (By.XPATH, "//a[contains(@href, '/portfolio')]")
    NAV_ABOUT = (By.XPATH, "//a[contains(@href, '/about')]")
    NAV_SERVICES = (By.XPATH, "//a[contains(@href, '/services')]")
    NAV_TECHNOLOGIES = (By.XPATH, "//a[contains(@href, '/technologies')]")
    NAV_TIMELINE = (By.XPATH, "//a[contains(@href, '/timeline')]")
    NAV_GALLERY = (By.XPATH, "//a[contains(@href, '/gallery')]")
    NAV_HEADER = (By.XPATH, "//a[contains(@href, '/header')]")
    NAV_SITE_CONFIG = (By.XPATH, "//a[contains(@href, '/site-config')]")
    NAV_BACKUPS = (By.XPATH, "//a[contains(@href, '/backups')]")
    
    # Header Elements
    HEADER = (By.TAG_NAME, "header")
    BACKUP_INDICATOR = (By.XPATH, "//button[contains(., 'Backups')]")
    THEME_TOGGLE = (By.XPATH, "//button[contains(@class, 'theme') or @aria-label='Toggle theme']")
    
    # Toast Notifications
    TOAST = (By.CSS_SELECTOR, "[class*='toast'], [role='status']")
    
    def __init__(self, driver):
        super().__init__(driver)
        self.url = TestConfig.ADMIN_URL
    
    def navigate(self):
        """Navigate to dashboard"""
        super().navigate(self.url)
        self.log("Navigated to Dashboard")
    
    def is_sidebar_visible(self):
        """Check if sidebar is visible"""
        return self.is_element_visible(self.SIDEBAR)
    
    def navigate_to_blogs(self):
        """Navigate to Blogs page"""
        self.click(self.NAV_BLOGS)
        self.wait_for_page_load()
        self.log("Navigated to Blogs")
    
    def navigate_to_portfolio(self):
        """Navigate to Portfolio page"""
        self.click(self.NAV_PORTFOLIO)
        self.wait_for_page_load()
        self.log("Navigated to Portfolio")
    
    def navigate_to_about(self):
        """Navigate to About page"""
        self.click(self.NAV_ABOUT)
        self.wait_for_page_load()
        self.log("Navigated to About")
    
    def navigate_to_services(self):
        """Navigate to Services page"""
        self.click(self.NAV_SERVICES)
        self.wait_for_page_load()
        self.log("Navigated to Services")
    
    def navigate_to_technologies(self):
        """Navigate to Technologies page"""
        self.click(self.NAV_TECHNOLOGIES)
        self.wait_for_page_load()
        self.log("Navigated to Technologies")
    
    def navigate_to_timeline(self):
        """Navigate to Timeline page"""
        self.click(self.NAV_TIMELINE)
        self.wait_for_page_load()
        self.log("Navigated to Timeline")
    
    def navigate_to_gallery(self):
        """Navigate to Gallery page"""
        self.click(self.NAV_GALLERY)
        self.wait_for_page_load()
        self.log("Navigated to Gallery")
    
    def navigate_to_header(self):
        """Navigate to Header page"""
        self.click(self.NAV_HEADER)
        self.wait_for_page_load()
        self.log("Navigated to Header")
    
    def navigate_to_site_config(self):
        """Navigate to Site Config page"""
        self.click(self.NAV_SITE_CONFIG)
        self.wait_for_page_load()
        self.log("Navigated to Site Config")
    
    def navigate_to_backups(self):
        """Navigate to Backups page"""
        self.click(self.NAV_BACKUPS)
        self.wait_for_page_load()
        self.log("Navigated to Backups")
    
    def toggle_theme(self):
        """Toggle dark/light theme"""
        self.click(self.THEME_TOGGLE)
        self.log("Toggled theme")
    
    def click_backup_indicator(self):
        """Click backup indicator in header"""
        self.click(self.BACKUP_INDICATOR)
        self.log("Clicked Backup Indicator")
    
    def verify_navigation_menu(self):
        """Verify all navigation menu items are present"""
        self.log("Verifying navigation menu...")
        
        nav_items = {
            "Blogs": self.NAV_BLOGS,
            "Portfolio": self.NAV_PORTFOLIO,
            "About": self.NAV_ABOUT,
            "Services": self.NAV_SERVICES,
            "Technologies": self.NAV_TECHNOLOGIES,
            "Timeline": self.NAV_TIMELINE,
            "Gallery": self.NAV_GALLERY,
            "Header": self.NAV_HEADER,
            "Site Config": self.NAV_SITE_CONFIG,
            "Backups": self.NAV_BACKUPS,
        }
        
        results = {}
        for name, locator in nav_items.items():
            present = self.is_element_present(locator)
            results[name] = present
            if present:
                self.log_success(f"✓ {name} menu item is present")
            else:
                self.log_error(f"✗ {name} menu item is missing")
        
        return all(results.values()), results
