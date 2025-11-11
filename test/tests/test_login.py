"""
Test suite for Login functionality
"""
import pytest
from pages.login_page import LoginPage
from pages.dashboard_page import DashboardPage
from config import TestConfig


@pytest.mark.login
@pytest.mark.critical
class TestLogin:
    """Login page test cases"""
    
    def test_login_page_elements(self, driver):
        """Verify all login page elements are present"""
        login_page = LoginPage(driver)
        login_page.navigate()
        
        assert login_page.verify_login_page_elements(), "Login page elements verification failed"
    
    def test_successful_login(self, driver):
        """Test successful login with correct password"""
        login_page = LoginPage(driver)
        login_page.navigate()
        login_page.login(TestConfig.ADMIN_PASSWORD)
        
        # Verify redirected to dashboard
        dashboard = DashboardPage(driver)
        assert not login_page.is_on_login_page(), "Still on login page after successful login"
        assert dashboard.is_sidebar_visible(), "Dashboard sidebar not visible after login"
        
        login_page.log_success("✓ Login successful - redirected to dashboard")
    
    def test_login_with_wrong_password(self, driver):
        """Test login with incorrect password"""
        login_page = LoginPage(driver)
        login_page.navigate()
        login_page.login("wrongpassword123")
        
        # Should still be on login page
        assert login_page.is_on_login_page(), "Not on login page after failed login"
        
        # Check for error message
        login_page.wait(2)
        toast_text = login_page.wait_for_toast()
        if toast_text:
            assert "invalid" in toast_text.lower() or "error" in toast_text.lower(), "Expected error message not shown"
            login_page.log_success("✓ Error message displayed for wrong password")
    
    def test_login_with_empty_password(self, driver):
        """Test login with empty password"""
        login_page = LoginPage(driver)
        login_page.navigate()
        
        # Try to click sign in without entering password
        login_page.click_sign_in()
        
        # Should still be on login page (HTML5 validation should prevent submission)
        assert login_page.is_on_login_page(), "Login attempted with empty password"
        login_page.log_success("✓ Empty password prevented")
    
    def test_demo_password_hint_visible(self, driver):
        """Verify demo password hint is visible"""
        login_page = LoginPage(driver)
        login_page.navigate()
        
        assert login_page.is_demo_password_visible(), "Demo password hint not visible"
        login_page.log_success("✓ Demo password hint is visible")


@pytest.mark.login
class TestLoginEdgeCases:
    """Edge cases for login"""
    
    def test_login_with_special_characters(self, driver):
        """Test login with special characters in password"""
        login_page = LoginPage(driver)
        login_page.navigate()
        
        special_passwords = [
            "p@ssw0rd!",
            "admin<script>alert('xss')</script>",
            "' OR '1'='1",
            "admin' --",
        ]
        
        for password in special_passwords:
            login_page.enter_password(password)
            login_page.click_sign_in()
            login_page.wait(1)
            
            # Should still be on login page
            assert login_page.is_on_login_page(), f"Unexpected behavior with password: {password}"
            login_page.log_success(f"✓ Handled special characters: {password}")
    
    def test_login_with_very_long_password(self, driver):
        """Test login with very long password"""
        login_page = LoginPage(driver)
        login_page.navigate()
        
        long_password = "a" * 1000
        login_page.login(long_password)
        
        # Should handle gracefully
        assert login_page.is_on_login_page(), "Unexpected behavior with long password"
        login_page.log_success("✓ Long password handled gracefully")
    
    def test_login_case_sensitivity(self, driver):
        """Test if password is case-sensitive"""
        login_page = LoginPage(driver)
        login_page.navigate()
        
        # Try with different cases
        case_variations = ["ADMIN", "Admin", "aDmIn"]
        
        for password in case_variations:
            login_page.enter_password(password)
            login_page.click_sign_in()
            login_page.wait(1)
            
            # All should fail (except 'admin')
            assert login_page.is_on_login_page(), f"Case sensitivity issue with: {password}"
            login_page.log_success(f"✓ Password is case-sensitive: {password} rejected")
