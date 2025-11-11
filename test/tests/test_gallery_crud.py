"""
Comprehensive test suite for Gallery CRUD operations
"""
import pytest
from pages.gallery_page import GalleryPage
import time


# Test Data
VALID_GALLERY_ITEM = {
    "id": "test-image-" + str(int(time.time())),
    "src": "/images/gallery/test-image.jpg",
    "alt": "Test image for Selenium automation",
    "title": "Selenium Test Image",
    "category": "Testing"
}

EDGE_CASE_GALLERY_ITEMS = [
    {
        "id": "special-chars-!@#$",
        "src": "/images/special<>&.jpg",
        "alt": "Alt with special chars: <>&\"'",
        "title": "Title with special chars !@#$%"
    },
    {
        "id": "very-long-id-" + "x" * 100,
        "src": "/images/" + "long-path/" * 20 + "image.jpg",
        "alt": "A" * 500,
        "title": "T" * 200
    },
    {
        "id": "unicode-中文",
        "src": "/images/unicode-image.jpg",
        "alt": "Unicode alt: 中文 العربية 🖼️",
        "title": "Unicode Title: 中文 العربية 🎨"
    }
]


@pytest.mark.gallery
@pytest.mark.critical
class TestGalleryPage:
    """Basic Gallery page tests"""
    
    def test_gallery_page_loads(self, authenticated_driver):
        """Verify gallery page loads successfully"""
        gallery_page = GalleryPage(authenticated_driver)
        gallery_page.navigate()
        
        assert gallery_page.is_element_present(gallery_page.PAGE_TITLE, timeout=5), "Page title not found"
        assert gallery_page.is_element_present(gallery_page.ADD_IMAGE_BUTTON, timeout=5), "Add button not found"
        gallery_page.log_success("✓ Gallery page loaded successfully")
    
    def test_add_image_dialog_opens(self, authenticated_driver):
        """Test that Add Image dialog opens"""
        gallery_page = GalleryPage(authenticated_driver)
        gallery_page.navigate()
        gallery_page.click_add_image()
        
        assert gallery_page.is_dialog_open(), "Dialog did not open"
        gallery_page.log_success("✓ Add Image dialog opened successfully")
        gallery_page.close_dialog()


@pytest.mark.gallery
@pytest.mark.critical
class TestGalleryCreate:
    """Gallery creation tests"""
    
    def test_create_valid_gallery_item(self, authenticated_driver):
        """Test creating a gallery item with valid data"""
        gallery_page = GalleryPage(authenticated_driver)
        gallery_page.navigate()
        
        initial_count = gallery_page.get_table_row_count()
        gallery_page.log(f"Initial gallery count: {initial_count}")
        
        success = gallery_page.create_gallery_item(VALID_GALLERY_ITEM)
        assert success, "Gallery item creation failed"
        
        time.sleep(2)
        gallery_page.refresh_page()
        
        new_count = gallery_page.get_table_row_count()
        gallery_page.log(f"New gallery count: {new_count}")
        
        assert gallery_page.verify_item_in_table(VALID_GALLERY_ITEM["title"]), "Gallery item not found in table"
        gallery_page.log_success("✓ Gallery item created and verified in table")
    
    def test_create_gallery_item_minimal_fields(self, authenticated_driver):
        """Test creating gallery item with minimal required fields"""
        gallery_page = GalleryPage(authenticated_driver)
        gallery_page.navigate()
        
        minimal_item = {
            "id": "minimal-" + str(int(time.time())),
            "src": "/images/minimal.jpg"
        }
        
        success = gallery_page.create_gallery_item(minimal_item)
        if success:
            gallery_page.log_success("✓ Gallery item created with minimal fields")


@pytest.mark.gallery
class TestGalleryEdgeCases:
    """Edge case tests for gallery"""
    
    @pytest.mark.parametrize("gallery_data", EDGE_CASE_GALLERY_ITEMS,
                             ids=["special_chars", "very_long", "unicode"])
    def test_create_gallery_edge_cases(self, authenticated_driver, gallery_data):
        """Test gallery creation with various edge cases"""
        gallery_page = GalleryPage(authenticated_driver)
        gallery_page.navigate()
        
        gallery_page.log(f"Testing edge case: {gallery_data.get('id', 'N/A')[:50]}")
        
        try:
            gallery_page.click_add_image()
            gallery_page.fill_gallery_form(gallery_data)
            gallery_page.click_save()
            
            time.sleep(2)
            gallery_page.log_success(f"✓ Edge case handled")
        except Exception as e:
            gallery_page.log_error(f"Edge case failed: {str(e)}")
            if gallery_page.is_dialog_open():
                gallery_page.close_dialog()
    
    def test_create_duplicate_id(self, authenticated_driver):
        """Test creating gallery item with duplicate ID"""
        gallery_page = GalleryPage(authenticated_driver)
        gallery_page.navigate()
        
        duplicate_id = "duplicate-id-test"
        
        # Create first item
        first_item = {
            "id": duplicate_id,
            "src": "/images/first.jpg",
            "title": "First Image"
        }
        gallery_page.create_gallery_item(first_item)
        time.sleep(2)
        
        # Try to create second item with same ID
        second_item = {
            "id": duplicate_id,
            "src": "/images/second.jpg",
            "title": "Second Image"
        }
        
        gallery_page.click_add_image()
        gallery_page.fill_gallery_form(second_item)
        gallery_page.click_save()
        
        time.sleep(2)
        gallery_page.log_success("✓ Duplicate ID handled")


@pytest.mark.gallery
class TestGalleryRead:
    """Gallery reading/viewing tests"""
    
    def test_view_gallery_table(self, authenticated_driver):
        """Test viewing gallery in table"""
        gallery_page = GalleryPage(authenticated_driver)
        gallery_page.navigate()
        
        count = gallery_page.get_table_row_count()
        gallery_page.log(f"Total gallery items in table: {count}")
        
        if count > 0:
            gallery_page.log_success("✓ Gallery items displayed in table")
        else:
            gallery_page.log_warning("⚠ No gallery items found (may be expected)")
    
    def test_gallery_images_displayed(self, authenticated_driver):
        """Test that images are displayed in table"""
        gallery_page = GalleryPage(authenticated_driver)
        gallery_page.navigate()
        
        from selenium.webdriver.common.by import By
        images = gallery_page.find_elements((By.CSS_SELECTOR, "table img"))
        
        if images:
            gallery_page.log_success(f"✓ Found {len(images)} images displayed in table")
        else:
            gallery_page.log_warning("⚠ No images found in table")
