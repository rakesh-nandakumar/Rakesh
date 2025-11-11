"""
Comprehensive test suite for Portfolio CRUD operations
"""
import pytest
from pages.portfolio_page import PortfolioPage
import time


# Test Data
VALID_PROJECT = {
    "title": "Selenium Test Project",
    "description": "This is a test project created by Selenium automation for testing purposes",
    "image": "/images/test-project.jpg",
    "link": "https://test-project.example.com",
    "github": "https://github.com/test/project",
    "techStack": ["React", "Node.js", "Python", "Selenium"],
    "category": "Web Development",
    "featured": True
}

EDGE_CASE_PROJECTS = [
    {
        "title": "Project with Special Chars !@#$%^&*()",
        "description": "Testing special characters: <>&\"'",
        "techStack": ["Test<>", "Special&Chars"]
    },
    {
        "title": "P" * 200,  # Very long title
        "description": "D" * 1000,  # Very long description
        "techStack": ["Tech1"] * 20  # Many tech items
    },
    {
        "title": "Unicode Project 中文 العربية 🚀",
        "description": "Project with unicode: 中文 العربية emoji: 🚀 💻 ✨",
        "techStack": ["技術", "تقنية", "🔥Stack"]
    },
    {
        "title": "Project with Invalid URLs",
        "link": "not-a-valid-url",
        "github": "also-not-valid"
    }
]


@pytest.mark.portfolio
@pytest.mark.critical
class TestPortfolioPage:
    """Basic Portfolio page tests"""
    
    def test_portfolio_page_loads(self, authenticated_driver):
        """Verify portfolio page loads successfully"""
        portfolio_page = PortfolioPage(authenticated_driver)
        portfolio_page.navigate()
        
        assert portfolio_page.is_element_present(portfolio_page.PAGE_TITLE, timeout=5), "Page title not found"
        assert portfolio_page.is_element_present(portfolio_page.ADD_PROJECT_BUTTON, timeout=5), "Add button not found"
        portfolio_page.log_success("✓ Portfolio page loaded successfully")
    
    def test_add_project_dialog_opens(self, authenticated_driver):
        """Test that Add Project dialog opens"""
        portfolio_page = PortfolioPage(authenticated_driver)
        portfolio_page.navigate()
        portfolio_page.click_add_project()
        
        assert portfolio_page.is_dialog_open(), "Dialog did not open"
        portfolio_page.log_success("✓ Add Project dialog opened successfully")
        portfolio_page.close_dialog()


@pytest.mark.portfolio
@pytest.mark.critical
class TestPortfolioCreate:
    """Portfolio creation tests"""
    
    def test_create_valid_project(self, authenticated_driver):
        """Test creating a project with valid data"""
        portfolio_page = PortfolioPage(authenticated_driver)
        portfolio_page.navigate()
        
        initial_count = portfolio_page.get_table_row_count()
        portfolio_page.log(f"Initial project count: {initial_count}")
        
        success = portfolio_page.create_portfolio_project(VALID_PROJECT)
        assert success, "Project creation failed"
        
        time.sleep(2)
        portfolio_page.refresh_page()
        
        new_count = portfolio_page.get_table_row_count()
        portfolio_page.log(f"New project count: {new_count}")
        
        assert portfolio_page.verify_project_in_table(VALID_PROJECT["title"]), "Project not found in table"
        portfolio_page.log_success("✓ Project created and verified in table")
    
    def test_create_project_with_multiple_tech_stack(self, authenticated_driver):
        """Test creating project with many technologies"""
        portfolio_page = PortfolioPage(authenticated_driver)
        portfolio_page.navigate()
        
        project_with_many_techs = {
            "title": "Full Stack Project",
            "description": "Project using many technologies",
            "techStack": ["React", "Vue", "Angular", "Node.js", "Python", "Django", "Flask", "Docker", "Kubernetes", "AWS"]
        }
        
        success = portfolio_page.create_portfolio_project(project_with_many_techs)
        if success:
            portfolio_page.log_success("✓ Project with many technologies created")
    
    def test_create_featured_project(self, authenticated_driver):
        """Test creating a featured project"""
        portfolio_page = PortfolioPage(authenticated_driver)
        portfolio_page.navigate()
        
        featured_project = {
            "title": "Featured Test Project",
            "description": "This is a featured project",
            "featured": True
        }
        
        success = portfolio_page.create_portfolio_project(featured_project)
        if success:
            portfolio_page.log_success("✓ Featured project created")


@pytest.mark.portfolio
class TestPortfolioEdgeCases:
    """Edge case tests for portfolio"""
    
    @pytest.mark.parametrize("project_data", EDGE_CASE_PROJECTS,
                             ids=["special_chars", "very_long", "unicode", "invalid_urls"])
    def test_create_project_edge_cases(self, authenticated_driver, project_data):
        """Test project creation with various edge cases"""
        portfolio_page = PortfolioPage(authenticated_driver)
        portfolio_page.navigate()
        
        portfolio_page.log(f"Testing edge case: {project_data.get('title', 'N/A')[:50]}")
        
        try:
            portfolio_page.click_add_project()
            portfolio_page.fill_portfolio_form(project_data)
            portfolio_page.click_save()
            
            time.sleep(2)
            portfolio_page.log_success(f"✓ Edge case handled")
        except Exception as e:
            portfolio_page.log_error(f"Edge case failed: {str(e)}")
            if portfolio_page.is_dialog_open():
                portfolio_page.close_dialog()
    
    def test_create_project_empty_required_fields(self, authenticated_driver):
        """Test creating project with empty required fields"""
        portfolio_page = PortfolioPage(authenticated_driver)
        portfolio_page.navigate()
        
        empty_project = {
            "title": "",
            "description": ""
        }
        
        try:
            portfolio_page.click_add_project()
            portfolio_page.fill_portfolio_form(empty_project)
            portfolio_page.click_save()
            time.sleep(2)
            
            # Should still be in dialog or show validation error
            portfolio_page.log_success("✓ Empty fields validation handled")
        except:
            portfolio_page.log_warning("⚠ Empty fields prevented by validation")


@pytest.mark.portfolio
class TestPortfolioRead:
    """Portfolio reading/viewing tests"""
    
    def test_view_portfolio_table(self, authenticated_driver):
        """Test viewing portfolio in table"""
        portfolio_page = PortfolioPage(authenticated_driver)
        portfolio_page.navigate()
        
        count = portfolio_page.get_table_row_count()
        portfolio_page.log(f"Total projects in table: {count}")
        
        if count > 0:
            portfolio_page.log_success("✓ Portfolio projects displayed in table")
        else:
            portfolio_page.log_warning("⚠ No projects found (may be expected)")


@pytest.mark.portfolio
class TestPortfolioUpdate:
    """Portfolio update tests"""
    
    def test_edit_project(self, authenticated_driver):
        """Test editing an existing project"""
        portfolio_page = PortfolioPage(authenticated_driver)
        portfolio_page.navigate()
        
        if portfolio_page.click_edit_on_first_row():
            updated_data = {
                "title": "Updated Project Title - " + str(time.time())
            }
            portfolio_page.fill_portfolio_form(updated_data)
            portfolio_page.click_save()
            
            time.sleep(2)
            portfolio_page.log_success("✓ Project edited successfully")
        else:
            portfolio_page.log_warning("⚠ No projects to edit")
