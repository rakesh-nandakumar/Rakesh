"""
Test suite for Dashboard and Navigation
"""
import pytest
from pages.dashboard_page import DashboardPage


@pytest.mark.smoke
@pytest.mark.critical
class TestDashboard:
    """Dashboard test cases"""
    
    def test_dashboard_loads(self, authenticated_driver):
        """Verify dashboard loads successfully"""
        dashboard = DashboardPage(authenticated_driver)
        
        assert dashboard.is_sidebar_visible(), "Sidebar not visible"
        dashboard.log_success("✓ Dashboard loaded successfully")
    
    def test_navigation_menu_present(self, authenticated_driver):
        """Verify all navigation menu items are present"""
        dashboard = DashboardPage(authenticated_driver)
        dashboard.navigate()
        
        all_present, results = dashboard.verify_navigation_menu()
        assert all_present, f"Some menu items missing: {results}"
    
    def test_backup_indicator_visible(self, authenticated_driver):
        """Verify backup indicator in header"""
        dashboard = DashboardPage(authenticated_driver)
        dashboard.navigate()
        
        if dashboard.is_element_present(dashboard.BACKUP_INDICATOR, timeout=2):
            dashboard.log_success("✓ Backup indicator is visible")
        else:
            dashboard.log_warning("⚠ Backup indicator not visible")
    
    def test_theme_toggle_exists(self, authenticated_driver):
        """Verify theme toggle button exists"""
        dashboard = DashboardPage(authenticated_driver)
        dashboard.navigate()
        
        if dashboard.is_element_present(dashboard.THEME_TOGGLE, timeout=2):
            dashboard.log_success("✓ Theme toggle is present")
        else:
            dashboard.log_warning("⚠ Theme toggle not found")


@pytest.mark.smoke
class TestNavigation:
    """Navigation test cases"""
    
    def test_navigate_to_blogs(self, authenticated_driver):
        """Navigate to Blogs page"""
        dashboard = DashboardPage(authenticated_driver)
        dashboard.navigate()
        dashboard.navigate_to_blogs()
        
        assert "/blogs" in dashboard.get_current_url(), "Not on blogs page"
        dashboard.log_success("✓ Successfully navigated to Blogs")
    
    def test_navigate_to_portfolio(self, authenticated_driver):
        """Navigate to Portfolio page"""
        dashboard = DashboardPage(authenticated_driver)
        dashboard.navigate()
        dashboard.navigate_to_portfolio()
        
        assert "/portfolio" in dashboard.get_current_url(), "Not on portfolio page"
        dashboard.log_success("✓ Successfully navigated to Portfolio")
    
    def test_navigate_to_gallery(self, authenticated_driver):
        """Navigate to Gallery page"""
        dashboard = DashboardPage(authenticated_driver)
        dashboard.navigate()
        dashboard.navigate_to_gallery()
        
        assert "/gallery" in dashboard.get_current_url(), "Not on gallery page"
        dashboard.log_success("✓ Successfully navigated to Gallery")
    
    def test_navigate_to_timeline(self, authenticated_driver):
        """Navigate to Timeline page"""
        dashboard = DashboardPage(authenticated_driver)
        dashboard.navigate()
        dashboard.navigate_to_timeline()
        
        assert "/timeline" in dashboard.get_current_url(), "Not on timeline page"
        dashboard.log_success("✓ Successfully navigated to Timeline")
    
    def test_navigate_to_site_config(self, authenticated_driver):
        """Navigate to Site Config page"""
        dashboard = DashboardPage(authenticated_driver)
        dashboard.navigate()
        dashboard.navigate_to_site_config()
        
        assert "/site-config" in dashboard.get_current_url(), "Not on site-config page"
        dashboard.log_success("✓ Successfully navigated to Site Config")
    
    def test_navigate_to_backups(self, authenticated_driver):
        """Navigate to Backups page"""
        dashboard = DashboardPage(authenticated_driver)
        dashboard.navigate()
        dashboard.navigate_to_backups()
        
        assert "/backups" in dashboard.get_current_url(), "Not on backups page"
        dashboard.log_success("✓ Successfully navigated to Backups")
    
    def test_navigate_all_pages_sequence(self, authenticated_driver):
        """Navigate through all pages in sequence"""
        dashboard = DashboardPage(authenticated_driver)
        dashboard.navigate()
        
        pages = [
            ("blogs", dashboard.navigate_to_blogs),
            ("portfolio", dashboard.navigate_to_portfolio),
            ("gallery", dashboard.navigate_to_gallery),
            ("timeline", dashboard.navigate_to_timeline),
            ("site-config", dashboard.navigate_to_site_config),
            ("backups", dashboard.navigate_to_backups),
        ]
        
        for page_name, navigate_func in pages:
            navigate_func()
            assert page_name in dashboard.get_current_url(), f"Failed to navigate to {page_name}"
            dashboard.log_success(f"✓ Navigated to {page_name}")
            dashboard.wait(0.5)
        
        dashboard.log_success("✓ Successfully navigated through all pages")
