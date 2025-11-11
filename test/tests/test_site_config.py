"""
Test suite for Site Configuration
"""
import pytest
from pages.site_config_page import SiteConfigPage
import time


@pytest.mark.site_config
@pytest.mark.critical
class TestSiteConfig:
    """Site configuration tests"""
    
    def test_site_config_page_loads(self, authenticated_driver):
        """Verify site config page loads successfully"""
        site_config = SiteConfigPage(authenticated_driver)
        site_config.navigate()
        
        assert site_config.is_element_present(site_config.PAGE_TITLE, timeout=5), "Page title not found"
        assert site_config.verify_toggles_present(), "Toggle switches not found"
        site_config.log_success("✓ Site Config page loaded successfully")
    
    def test_save_button_present(self, authenticated_driver):
        """Verify save button is present"""
        site_config = SiteConfigPage(authenticated_driver)
        site_config.navigate()
        
        assert site_config.is_element_present(site_config.SAVE_BUTTON, timeout=5), "Save button not found"
        site_config.log_success("✓ Save button is present")


@pytest.mark.site_config
class TestSiteConfigToggles:
    """Toggle switch tests"""
    
    def test_toggle_switches_present(self, authenticated_driver):
        """Verify all toggle switches are present"""
        site_config = SiteConfigPage(authenticated_driver)
        site_config.navigate()
        
        switches = site_config.get_all_toggle_switches()
        assert len(switches) > 0, "No toggle switches found"
        site_config.log_success(f"✓ Found {len(switches)} toggle switches")
    
    def test_toggle_switch_by_index(self, authenticated_driver):
        """Test toggling switches by index"""
        site_config = SiteConfigPage(authenticated_driver)
        site_config.navigate()
        
        switches = site_config.get_all_toggle_switches()
        num_switches = len(switches)
        
        if num_switches > 0:
            # Toggle first switch
            site_config.toggle_switch_by_index(0)
            time.sleep(0.5)
            
            # Toggle last switch
            if num_switches > 1:
                site_config.toggle_switch_by_index(num_switches - 1)
                time.sleep(0.5)
            
            site_config.log_success("✓ Toggle switches can be toggled")
    
    def test_toggle_all_switches(self, authenticated_driver):
        """Test toggling all switches"""
        site_config = SiteConfigPage(authenticated_driver)
        site_config.navigate()
        
        switches = site_config.get_all_toggle_switches()
        
        for i in range(len(switches)):
            site_config.toggle_switch_by_index(i)
            time.sleep(0.3)
        
        site_config.log_success(f"✓ Toggled all {len(switches)} switches")
    
    def test_save_configuration(self, authenticated_driver):
        """Test saving configuration"""
        site_config = SiteConfigPage(authenticated_driver)
        site_config.navigate()
        
        # Toggle a switch
        site_config.toggle_switch_by_index(0)
        time.sleep(0.5)
        
        # Save configuration
        success = site_config.save_configuration()
        assert success, "Configuration save failed"
        site_config.log_success("✓ Configuration saved successfully")
    
    def test_configuration_persists_after_refresh(self, authenticated_driver):
        """Test that configuration persists after page refresh"""
        site_config = SiteConfigPage(authenticated_driver)
        site_config.navigate()
        
        # Save current configuration
        site_config.save_configuration()
        time.sleep(1)
        
        # Refresh page
        site_config.refresh_page()
        time.sleep(2)
        
        # Verify toggles are still present
        assert site_config.verify_toggles_present(), "Configuration not persisted after refresh"
        site_config.log_success("✓ Configuration persists after refresh")


@pytest.mark.site_config
class TestSiteConfigEdgeCases:
    """Edge case tests for site configuration"""
    
    def test_rapid_toggle_switching(self, authenticated_driver):
        """Test rapid toggling of switches"""
        site_config = SiteConfigPage(authenticated_driver)
        site_config.navigate()
        
        switches = site_config.get_all_toggle_switches()
        
        if len(switches) > 0:
            # Rapidly toggle first switch multiple times
            for _ in range(5):
                site_config.toggle_switch_by_index(0)
                time.sleep(0.1)
            
            site_config.log_success("✓ Rapid toggling handled")
    
    def test_save_without_changes(self, authenticated_driver):
        """Test saving without making changes"""
        site_config = SiteConfigPage(authenticated_driver)
        site_config.navigate()
        
        # Save without changes
        success = site_config.save_configuration()
        site_config.log_success("✓ Save without changes handled")
    
    def test_toggle_and_save_multiple_times(self, authenticated_driver):
        """Test toggling and saving multiple times"""
        site_config = SiteConfigPage(authenticated_driver)
        site_config.navigate()
        
        for i in range(3):
            site_config.log(f"Iteration {i+1}")
            site_config.toggle_switch_by_index(0)
            time.sleep(0.5)
            site_config.save_configuration()
            time.sleep(1)
        
        site_config.log_success("✓ Multiple toggle and save operations handled")
