"""
Configuration file for Selenium test suite
"""
import os
from dotenv import load_dotenv

load_dotenv()

class TestConfig:
    """Test configuration settings"""
    
    # URLs
    ADMIN_URL = os.getenv("ADMIN_URL", "http://localhost:5173")
    SERVER_URL = os.getenv("SERVER_URL", "http://localhost:1420")
    
    # Credentials
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin")
    
    # Browser Settings
    HEADLESS_MODE = os.getenv("HEADLESS_MODE", "False").lower() == "true"
    IMPLICIT_WAIT = int(os.getenv("IMPLICIT_WAIT", "10"))
    EXPLICIT_WAIT = int(os.getenv("EXPLICIT_WAIT", "20"))
    
    # Test Settings
    SCREENSHOT_ON_FAILURE = os.getenv("SCREENSHOT_ON_FAILURE", "True").lower() == "true"
    SCREENSHOT_DIR = os.path.join(os.path.dirname(__file__), "screenshots")
    REPORTS_DIR = os.path.join(os.path.dirname(__file__), "reports")
    
    # Test Data
    TEST_DATA_DIR = os.path.join(os.path.dirname(__file__), "test_data")
    
    @classmethod
    def ensure_dirs(cls):
        """Ensure required directories exist"""
        os.makedirs(cls.SCREENSHOT_DIR, exist_ok=True)
        os.makedirs(cls.REPORTS_DIR, exist_ok=True)
        os.makedirs(cls.TEST_DATA_DIR, exist_ok=True)
