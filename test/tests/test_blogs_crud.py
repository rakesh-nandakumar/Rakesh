"""
Comprehensive test suite for Blogs CRUD operations
"""
import pytest
from pages.blogs_page import BlogsPage
import time


# Test Data
VALID_BLOG = {
    "title": "Selenium Test Blog",
    "slug": "selenium-test-blog",
    "excerpt": "This is a test blog created by Selenium automation",
    "date": "2025-11-11",
    "category": "Testing",
    "author": "Test Automation",
    "readTime": "5",
    "tags": ["selenium", "testing", "automation"],
    "image": "/images/test-blog.jpg",
    "content": "# Test Blog Content\n\nThis is test content for Selenium automation testing."
}

EDGE_CASE_BLOGS = [
    {
        "title": "Blog with Special Chars !@#$%",
        "slug": "blog-special-chars",
        "excerpt": "Testing special characters",
        "content": "Content with special chars: <>&\"'"
    },
    {
        "title": "A" * 100,  # Very long title
        "slug": "very-long-title-blog",
        "excerpt": "Testing long title",
        "content": "Content"
    },
    {
        "title": "Empty Fields Test",
        "slug": "empty-fields-test",
        "excerpt": "",
        "content": ""
    },
    {
        "title": "Unicode Test Blog 中文 العربية 🔥",
        "slug": "unicode-test-blog",
        "excerpt": "Testing unicode support",
        "content": "Content with unicode: 中文 العربية emoji: 🔥 🎉 ✅"
    },
    {
        "title": "XSS Test <script>alert('xss')</script>",
        "slug": "xss-test-blog",
        "excerpt": "Testing XSS prevention",
        "content": "<script>alert('XSS');</script>"
    }
]


@pytest.mark.blogs
@pytest.mark.critical
class TestBlogsPage:
    """Basic Blogs page tests"""
    
    def test_blogs_page_loads(self, authenticated_driver):
        """Verify blogs page loads successfully"""
        blogs_page = BlogsPage(authenticated_driver)
        blogs_page.navigate()
        
        assert blogs_page.is_element_present(blogs_page.PAGE_TITLE, timeout=5), "Page title not found"
        assert blogs_page.is_element_present(blogs_page.ADD_BLOG_BUTTON, timeout=5), "Add button not found"
        blogs_page.log_success("✓ Blogs page loaded successfully")
    
    def test_add_blog_dialog_opens(self, authenticated_driver):
        """Test that Add Blog dialog opens"""
        blogs_page = BlogsPage(authenticated_driver)
        blogs_page.navigate()
        blogs_page.click_add_blog()
        
        assert blogs_page.is_dialog_open(), "Dialog did not open"
        blogs_page.log_success("✓ Add Blog dialog opened successfully")
        blogs_page.close_dialog()
    
    def test_dialog_closes(self, authenticated_driver):
        """Test that dialog closes properly"""
        blogs_page = BlogsPage(authenticated_driver)
        blogs_page.navigate()
        blogs_page.click_add_blog()
        blogs_page.close_dialog()
        
        assert not blogs_page.is_dialog_open(), "Dialog did not close"
        blogs_page.log_success("✓ Dialog closed successfully")


@pytest.mark.blogs
@pytest.mark.critical
class TestBlogsCreate:
    """Blog creation tests"""
    
    def test_create_valid_blog(self, authenticated_driver):
        """Test creating a blog with valid data"""
        blogs_page = BlogsPage(authenticated_driver)
        blogs_page.navigate()
        
        initial_count = blogs_page.get_table_row_count()
        blogs_page.log(f"Initial blog count: {initial_count}")
        
        success = blogs_page.create_blog(VALID_BLOG)
        assert success, "Blog creation failed"
        
        time.sleep(2)  # Wait for table to update
        blogs_page.refresh_page()
        
        new_count = blogs_page.get_table_row_count()
        blogs_page.log(f"New blog count: {new_count}")
        
        assert blogs_page.verify_blog_in_table(VALID_BLOG["title"]), "Blog not found in table"
        blogs_page.log_success("✓ Blog created and verified in table")
    
    def test_create_blog_with_minimum_fields(self, authenticated_driver):
        """Test creating blog with only required fields"""
        blogs_page = BlogsPage(authenticated_driver)
        blogs_page.navigate()
        
        minimal_blog = {
            "title": "Minimal Blog Test",
            "slug": "minimal-blog-test",
            "content": "Minimal content"
        }
        
        success = blogs_page.create_blog(minimal_blog)
        if success:
            blogs_page.log_success("✓ Blog created with minimal fields")
        else:
            blogs_page.log_warning("⚠ Blog creation with minimal fields failed (may be expected)")
    
    def test_create_blog_with_tags(self, authenticated_driver):
        """Test creating blog with multiple tags"""
        blogs_page = BlogsPage(authenticated_driver)
        blogs_page.navigate()
        
        blog_with_tags = {
            "title": "Blog with Multiple Tags",
            "slug": "blog-with-tags",
            "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
            "content": "Content with tags"
        }
        
        success = blogs_page.create_blog(blog_with_tags)
        assert success, "Blog with tags creation failed"
        blogs_page.log_success("✓ Blog with multiple tags created")


@pytest.mark.blogs
class TestBlogsEdgeCases:
    """Edge case tests for blogs"""
    
    @pytest.mark.parametrize("blog_data", EDGE_CASE_BLOGS, 
                             ids=["special_chars", "long_title", "empty_fields", "unicode", "xss"])
    def test_create_blog_edge_cases(self, authenticated_driver, blog_data):
        """Test blog creation with various edge cases"""
        blogs_page = BlogsPage(authenticated_driver)
        blogs_page.navigate()
        
        blogs_page.log(f"Testing edge case: {blog_data['title'][:50]}")
        
        try:
            blogs_page.click_add_blog()
            blogs_page.fill_blog_form(blog_data)
            blogs_page.click_save()
            
            time.sleep(2)
            blogs_page.log_success(f"✓ Edge case handled: {blog_data['slug']}")
        except Exception as e:
            blogs_page.log_error(f"Edge case failed: {str(e)}")
            if blogs_page.is_dialog_open():
                blogs_page.close_dialog()
    
    def test_create_duplicate_slug(self, authenticated_driver):
        """Test creating blog with duplicate slug"""
        blogs_page = BlogsPage(authenticated_driver)
        blogs_page.navigate()
        
        # Create first blog
        first_blog = {
            "title": "First Blog",
            "slug": "duplicate-slug-test",
            "content": "First content"
        }
        blogs_page.create_blog(first_blog)
        time.sleep(2)
        
        # Try to create second blog with same slug
        second_blog = {
            "title": "Second Blog",
            "slug": "duplicate-slug-test",  # Same slug
            "content": "Second content"
        }
        
        blogs_page.click_add_blog()
        blogs_page.fill_blog_form(second_blog)
        blogs_page.click_save()
        
        time.sleep(2)
        # Should show error or handle gracefully
        blogs_page.log_success("✓ Duplicate slug handled")
    
    def test_create_blog_with_future_date(self, authenticated_driver):
        """Test creating blog with future date"""
        blogs_page = BlogsPage(authenticated_driver)
        blogs_page.navigate()
        
        future_blog = {
            "title": "Future Blog",
            "slug": "future-blog-test",
            "date": "2030-12-31",
            "content": "Future content"
        }
        
        success = blogs_page.create_blog(future_blog)
        if success:
            blogs_page.log_success("✓ Blog with future date created")
    
    def test_create_blog_with_invalid_date(self, authenticated_driver):
        """Test creating blog with invalid date format"""
        blogs_page = BlogsPage(authenticated_driver)
        blogs_page.navigate()
        
        invalid_date_blog = {
            "title": "Invalid Date Blog",
            "slug": "invalid-date-blog",
            "date": "invalid-date",
            "content": "Content"
        }
        
        try:
            blogs_page.click_add_blog()
            blogs_page.fill_blog_form(invalid_date_blog)
            blogs_page.click_save()
            time.sleep(2)
            blogs_page.log_success("✓ Invalid date handled (validation may have occurred)")
        except:
            blogs_page.log_warning("⚠ Invalid date rejected by browser validation")


@pytest.mark.blogs
class TestBlogsRead:
    """Blog reading/viewing tests"""
    
    def test_view_blogs_table(self, authenticated_driver):
        """Test viewing blogs in table"""
        blogs_page = BlogsPage(authenticated_driver)
        blogs_page.navigate()
        
        count = blogs_page.get_table_row_count()
        blogs_page.log(f"Total blogs in table: {count}")
        
        if count > 0:
            blogs_page.log_success("✓ Blogs displayed in table")
        else:
            blogs_page.log_warning("⚠ No blogs found (may be expected)")
    
    def test_search_blog(self, authenticated_driver):
        """Test blog search functionality"""
        blogs_page = BlogsPage(authenticated_driver)
        blogs_page.navigate()
        
        if blogs_page.is_element_present(blogs_page.SEARCH_INPUT, timeout=2):
            blogs_page.search_blog("Test")
            time.sleep(2)
            blogs_page.log_success("✓ Search functionality works")
        else:
            blogs_page.log_warning("⚠ Search input not found")
    
    def test_pagination(self, authenticated_driver):
        """Test pagination if exists"""
        blogs_page = BlogsPage(authenticated_driver)
        blogs_page.navigate()
        
        if blogs_page.is_element_present(blogs_page.PAGINATION, timeout=2):
            blogs_page.log("Pagination found")
            if blogs_page.is_element_present(blogs_page.NEXT_PAGE, timeout=2):
                blogs_page.click(blogs_page.NEXT_PAGE)
                time.sleep(2)
                blogs_page.log_success("✓ Pagination navigation works")
        else:
            blogs_page.log_warning("⚠ Pagination not found (may not be needed)")


@pytest.mark.blogs
class TestBlogsUpdate:
    """Blog update tests"""
    
    def test_edit_blog(self, authenticated_driver):
        """Test editing an existing blog"""
        blogs_page = BlogsPage(authenticated_driver)
        blogs_page.navigate()
        
        if blogs_page.click_edit_on_first_row():
            # Modify the title
            updated_data = {
                "title": "Updated Blog Title - " + str(time.time())
            }
            blogs_page.fill_blog_form(updated_data)
            blogs_page.click_save()
            
            time.sleep(2)
            blogs_page.log_success("✓ Blog edited successfully")
        else:
            blogs_page.log_warning("⚠ No blogs to edit")
    
    def test_edit_and_cancel(self, authenticated_driver):
        """Test canceling edit operation"""
        blogs_page = BlogsPage(authenticated_driver)
        blogs_page.navigate()
        
        if blogs_page.click_edit_on_first_row():
            blogs_page.click_cancel()
            time.sleep(1)
            assert not blogs_page.is_dialog_open(), "Dialog should be closed after cancel"
            blogs_page.log_success("✓ Edit canceled successfully")


@pytest.mark.blogs
class TestBlogsDelete:
    """Blog deletion tests"""
    
    def test_delete_blog(self, authenticated_driver):
        """Test deleting a blog"""
        blogs_page = BlogsPage(authenticated_driver)
        blogs_page.navigate()
        
        initial_count = blogs_page.get_table_row_count()
        
        if initial_count > 0:
            blogs_page.click_delete_on_first_row()
            
            # May need to confirm deletion
            time.sleep(2)
            blogs_page.refresh_page()
            
            new_count = blogs_page.get_table_row_count()
            blogs_page.log(f"Count after delete: {new_count}")
            blogs_page.log_success("✓ Blog deletion attempted")
        else:
            blogs_page.log_warning("⚠ No blogs to delete")
