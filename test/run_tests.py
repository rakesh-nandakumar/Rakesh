"""
Main test runner script with comprehensive reporting
Run this to execute all tests with detailed logging
"""
import subprocess
import sys
import os
from datetime import datetime
from colorama import init, Fore, Style

init(autoreset=True)


def print_banner():
    """Print test execution banner"""
    print("\n" + "="*80)
    print(f"{Fore.CYAN}{Style.BRIGHT}ADMIN PANEL SELENIUM TEST SUITE{Style.RESET_ALL}")
    print("="*80)
    print(f"{Fore.YELLOW}Test Execution Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}{Style.RESET_ALL}")
    print("="*80 + "\n")


def run_tests(test_type="all", verbose=True):
    """
    Run tests based on test type
    
    Args:
        test_type: Type of tests to run
            - "all": Run all tests
            - "smoke": Run only smoke tests
            - "critical": Run only critical tests
            - "login": Run only login tests
            - "blogs": Run only blog tests
            - "portfolio": Run only portfolio tests
            - "gallery": Run only gallery tests
            - "site_config": Run only site config tests
            - "backups": Run only backup tests
        verbose: Print verbose output
    """
    
    print_banner()
    
    # Base pytest command
    cmd = ["pytest"]
    
    # Add test markers/paths based on test type
    if test_type == "all":
        cmd.append("tests/")
    elif test_type == "smoke":
        cmd.extend(["-m", "smoke", "tests/"])
    elif test_type == "critical":
        cmd.extend(["-m", "critical", "tests/"])
    else:
        cmd.extend(["-m", test_type, "tests/"])
    
    # Add verbosity
    if verbose:
        cmd.append("-v")
    else:
        cmd.append("-q")
    
    # Add color output
    cmd.append("--color=yes")
    
    # Add detailed output
    cmd.append("-s")
    
    # Add HTML report
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    report_file = f"reports/test_report_{timestamp}.html"
    cmd.extend(["--html", report_file, "--self-contained-html"])
    
    # Add summary
    cmd.append("-ra")
    
    # Print command
    print(f"{Fore.CYAN}Executing: {' '.join(cmd)}{Style.RESET_ALL}\n")
    
    # Run tests
    try:
        result = subprocess.run(cmd, check=False)
        
        print("\n" + "="*80)
        if result.returncode == 0:
            print(f"{Fore.GREEN}{Style.BRIGHT}✓ ALL TESTS PASSED!{Style.RESET_ALL}")
        else:
            print(f"{Fore.RED}{Style.BRIGHT}✗ SOME TESTS FAILED!{Style.RESET_ALL}")
        
        print(f"{Fore.YELLOW}Test Execution Completed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}{Style.RESET_ALL}")
        print(f"{Fore.CYAN}HTML Report: {report_file}{Style.RESET_ALL}")
        print("="*80 + "\n")
        
        return result.returncode
    
    except FileNotFoundError:
        print(f"{Fore.RED}Error: pytest not found. Please install dependencies:{Style.RESET_ALL}")
        print(f"{Fore.YELLOW}  pip install -r requirements.txt{Style.RESET_ALL}\n")
        return 1
    except Exception as e:
        print(f"{Fore.RED}Error running tests: {str(e)}{Style.RESET_ALL}\n")
        return 1


def run_specific_test_file(test_file):
    """Run a specific test file"""
    print_banner()
    
    cmd = [
        "pytest",
        f"tests/{test_file}",
        "-v",
        "-s",
        "--color=yes",
        "-ra"
    ]
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    report_file = f"reports/test_report_{timestamp}.html"
    cmd.extend(["--html", report_file, "--self-contained-html"])
    
    print(f"{Fore.CYAN}Executing: {' '.join(cmd)}{Style.RESET_ALL}\n")
    
    try:
        result = subprocess.run(cmd, check=False)
        
        print("\n" + "="*80)
        if result.returncode == 0:
            print(f"{Fore.GREEN}{Style.BRIGHT}✓ ALL TESTS PASSED!{Style.RESET_ALL}")
        else:
            print(f"{Fore.RED}{Style.BRIGHT}✗ SOME TESTS FAILED!{Style.RESET_ALL}")
        
        print(f"{Fore.CYAN}HTML Report: {report_file}{Style.RESET_ALL}")
        print("="*80 + "\n")
        
        return result.returncode
    
    except Exception as e:
        print(f"{Fore.RED}Error running tests: {str(e)}{Style.RESET_ALL}\n")
        return 1


def print_help():
    """Print help message"""
    help_text = f"""
{Fore.CYAN}{Style.BRIGHT}Admin Panel Selenium Test Runner{Style.RESET_ALL}

{Fore.YELLOW}Usage:{Style.RESET_ALL}
    python run_tests.py [test_type]

{Fore.YELLOW}Test Types:{Style.RESET_ALL}
    all          - Run all tests (default)
    smoke        - Run smoke tests only
    critical     - Run critical tests only
    login        - Run login tests only
    blogs        - Run blog CRUD tests only
    portfolio    - Run portfolio CRUD tests only
    gallery      - Run gallery CRUD tests only
    site_config  - Run site configuration tests only
    backups      - Run backup system tests only

{Fore.YELLOW}Examples:{Style.RESET_ALL}
    python run_tests.py              # Run all tests
    python run_tests.py smoke        # Run smoke tests
    python run_tests.py critical     # Run critical tests
    python run_tests.py blogs        # Run blog tests only

{Fore.YELLOW}Test Files:{Style.RESET_ALL}
    test_login.py           - Login functionality tests
    test_dashboard.py       - Dashboard and navigation tests
    test_blogs_crud.py      - Blog CRUD operations tests
    test_portfolio_crud.py  - Portfolio CRUD operations tests
    test_gallery_crud.py    - Gallery CRUD operations tests
    test_site_config.py     - Site configuration tests
    test_backups.py         - Backup system tests

{Fore.YELLOW}Requirements:{Style.RESET_ALL}
    1. Install dependencies: pip install -r requirements.txt
    2. Copy .env.example to .env and configure settings
    3. Start admin panel server: npm run dev (in admin folder)
    4. Start backend server: node admin/server/index.js

{Fore.YELLOW}Reports:{Style.RESET_ALL}
    - HTML reports are generated in: reports/
    - Screenshots on failure: screenshots/
"""
    print(help_text)


if __name__ == "__main__":
    # Check if dependencies are installed
    try:
        import selenium
        import pytest
    except ImportError:
        print(f"{Fore.RED}Error: Required packages not installed.{Style.RESET_ALL}")
        print(f"{Fore.YELLOW}Please run: pip install -r requirements.txt{Style.RESET_ALL}\n")
        sys.exit(1)
    
    # Check if .env file exists
    if not os.path.exists(".env"):
        print(f"{Fore.YELLOW}Warning: .env file not found. Using default configuration.{Style.RESET_ALL}")
        print(f"{Fore.YELLOW}Copy .env.example to .env and configure as needed.{Style.RESET_ALL}\n")
    
    # Parse command line arguments
    if len(sys.argv) > 1:
        if sys.argv[1] in ["-h", "--help", "help"]:
            print_help()
            sys.exit(0)
        
        test_type = sys.argv[1]
    else:
        test_type = "all"
    
    # Valid test types
    valid_types = ["all", "smoke", "critical", "login", "blogs", "portfolio", 
                   "gallery", "site_config", "backups", "dashboard"]
    
    if test_type not in valid_types:
        print(f"{Fore.RED}Error: Invalid test type '{test_type}'{Style.RESET_ALL}")
        print(f"{Fore.YELLOW}Valid types: {', '.join(valid_types)}{Style.RESET_ALL}\n")
        print_help()
        sys.exit(1)
    
    # Run tests
    exit_code = run_tests(test_type, verbose=True)
    sys.exit(exit_code)
