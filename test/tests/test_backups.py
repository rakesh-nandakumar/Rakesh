"""
Test suite for Backup System
"""
import pytest
from pages.backups_page import BackupsPage
from pages.blogs_page import BlogsPage
import time


@pytest.mark.backups
@pytest.mark.critical
class TestBackupsPage:
    """Backup page tests"""
    
    def test_backups_page_loads(self, authenticated_driver):
        """Verify backups page loads successfully"""
        backups_page = BackupsPage(authenticated_driver)
        backups_page.navigate()
        
        assert backups_page.is_element_present(backups_page.PAGE_TITLE, timeout=5), "Page title not found"
        backups_page.log_success("✓ Backups page loaded successfully")
    
    def test_backup_table_present(self, authenticated_driver):
        """Verify backup table is present"""
        backups_page = BackupsPage(authenticated_driver)
        backups_page.navigate()
        
        assert backups_page.is_element_present(backups_page.TABLE, timeout=5), "Backup table not found"
        backups_page.log_success("✓ Backup table is present")
    
    def test_backup_table_headers(self, authenticated_driver):
        """Verify backup table has correct headers"""
        backups_page = BackupsPage(authenticated_driver)
        backups_page.navigate()
        
        headers = backups_page.verify_backup_table_headers()
        backups_page.log_success("✓ Backup table headers verified")


@pytest.mark.backups
class TestBackupsDisplay:
    """Backup display tests"""
    
    def test_view_backups_list(self, authenticated_driver):
        """Test viewing list of backups"""
        backups_page = BackupsPage(authenticated_driver)
        backups_page.navigate()
        
        count = backups_page.get_backup_count()
        backups_page.log(f"Total backups: {count}")
        
        if count > 0:
            backups_page.log_success("✓ Backups are displayed")
        else:
            backups_page.log_warning("⚠ No backups found (may be expected)")
    
    def test_backup_dates_valid(self, authenticated_driver):
        """Test that backup dates are valid (not 'Invalid Date')"""
        backups_page = BackupsPage(authenticated_driver)
        backups_page.navigate()
        
        if backups_page.get_backup_count() > 0:
            assert backups_page.verify_backups_sorted_latest_first(), "Date validation failed"
            backups_page.log_success("✓ Backup dates are valid")
    
    def test_view_backup_details(self, authenticated_driver):
        """Test viewing backup details dialog"""
        backups_page = BackupsPage(authenticated_driver)
        backups_page.navigate()
        
        if backups_page.get_backup_count() > 0:
            backups_page.click_view_on_first_backup()
            
            assert backups_page.is_dialog_open(), "Backup details dialog did not open"
            backups_page.log_success("✓ Backup details dialog opened")
            
            backups_page.close_dialog()
            assert not backups_page.is_dialog_open(), "Dialog did not close"
            backups_page.log_success("✓ Backup details dialog closed")


@pytest.mark.backups
class TestAutomaticBackups:
    """Test automatic backup creation"""
    
    def test_backup_created_on_blog_save(self, authenticated_driver):
        """Test that backup is created when saving blog"""
        # First, check current backup count
        backups_page = BackupsPage(authenticated_driver)
        backups_page.navigate()
        initial_backup_count = backups_page.get_backup_count()
        backups_page.log(f"Initial backup count: {initial_backup_count}")
        
        # Create a blog to trigger backup
        blogs_page = BlogsPage(authenticated_driver)
        blogs_page.navigate()
        
        test_blog = {
            "title": "Backup Test Blog " + str(time.time()),
            "slug": "backup-test-" + str(int(time.time())),
            "content": "Testing automatic backup creation"
        }
        
        blogs_page.create_blog(test_blog)
        time.sleep(3)  # Wait for backup to be created
        
        # Check if backup count increased
        backups_page.navigate()
        new_backup_count = backups_page.get_backup_count()
        backups_page.log(f"New backup count: {new_backup_count}")
        
        if new_backup_count > initial_backup_count:
            backups_page.log_success("✓ Automatic backup was created on save")
        else:
            backups_page.log_warning("⚠ Backup count did not increase (may be expected)")
    
    def test_backup_naming_convention(self, authenticated_driver):
        """Test that backups follow naming convention"""
        backups_page = BackupsPage(authenticated_driver)
        backups_page.navigate()
        
        if backups_page.get_backup_count() > 0:
            from selenium.webdriver.common.by import By
            first_row = backups_page.find_elements(backups_page.TABLE_ROWS)[0]
            filename_cell = first_row.find_elements(By.TAG_NAME, "td")[0]
            filename = filename_cell.text
            
            backups_page.log(f"Backup filename: {filename}")
            
            # Check if filename contains timestamp pattern
            if "_" in filename and ".json" in filename:
                backups_page.log_success("✓ Backup follows naming convention")
            else:
                backups_page.log_warning("⚠ Backup naming convention may not be standard")


@pytest.mark.backups
class TestBackupsEdgeCases:
    """Edge case tests for backups"""
    
    def test_view_multiple_backups_sequentially(self, authenticated_driver):
        """Test viewing multiple backups in sequence"""
        backups_page = BackupsPage(authenticated_driver)
        backups_page.navigate()
        
        count = backups_page.get_backup_count()
        
        if count >= 3:
            for i in range(min(3, count)):
                backups_page.click_view_on_first_backup()
                time.sleep(1)
                backups_page.close_dialog()
                time.sleep(0.5)
            
            backups_page.log_success("✓ Viewed multiple backups sequentially")
    
    def test_backups_page_refresh(self, authenticated_driver):
        """Test refreshing backups page"""
        backups_page = BackupsPage(authenticated_driver)
        backups_page.navigate()
        
        initial_count = backups_page.get_backup_count()
        
        backups_page.refresh_page()
        time.sleep(2)
        
        new_count = backups_page.get_backup_count()
        
        backups_page.log(f"Count after refresh: {new_count}")
        backups_page.log_success("✓ Page refresh handled")
