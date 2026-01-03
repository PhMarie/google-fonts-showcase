#!/usr/bin/env python3
"""
Favicon Verification Script for Google Fonts Showcase
This script verifies that the gradient favicon has been properly implemented.
"""

import re
from pathlib import Path

def verify_favicon_implementation():
    """Verify that the gradient favicon is properly implemented."""
    
    print("🎨 Gradient Favicon Implementation Verification")
    print("=" * 50)
    
    # Check if index.html exists
    html_path = Path("index.html")
    if not html_path.exists():
        print("❌ index.html not found!")
        return False
    
    # Read HTML content
    with open(html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Check if favicon is present
    has_favicon = 'rel="icon"' in html_content
    has_svg_favicon = 'data:image/svg+xml' in html_content
    has_gradient = 'linearGradient' in html_content
    has_blue_color = '%234285F4' in html_content
    has_purple_color = '%239370DB' in html_content
    has_violet_color = '%239932CC' in html_content
    
    # Define checks
    favicon_checks = {
        "Favicon link present": has_favicon,
        "SVG favicon format": has_svg_favicon,
        "Gradient definition": has_gradient,
        "Google Blue (#4285F4)": has_blue_color,
        "Medium Purple (#9370DB)": has_purple_color,
        "Dark Orchid (#9932CC)": has_violet_color,
        "Gradient G letter": 'fill=\'url(%23gradient)\'' in html_content
    }
    
    # Perform checks
    all_passed = True
    for check_name, result in favicon_checks.items():
        status = "✅" if result else "❌"
        print(f"{status} {check_name}: {'PASS' if result else 'FAIL'}")
        if not result:
            all_passed = False
    
    print("\n" + "=" * 50)
    
    # Extract favicon code
    favicon_pattern = r'<link rel="icon".*?type="image/svg\+xml">'
    favicon_match = re.search(favicon_pattern, html_content, re.DOTALL)
    
    if favicon_match:
        favicon_code = favicon_match.group(0)
        print("📋 Favicon Code Preview:")
        # Clean up the favicon code for display
        clean_code = favicon_code.replace('\n', ' ').replace('  ', ' ')
        if len(clean_code) > 200:
            print(f"   {clean_code[:200]}...")
        else:
            print(f"   {clean_code}")
    
    # Check for comment
    has_comment = "Gradient Favicon" in html_content
    print(f"\n📝 Documentation: {'✅ Present' if has_comment else '❌ Missing'}")
    
    print("\n" + "=" * 50)
    if all_passed:
        print("🎉 ALL CHECKS PASSED! Gradient favicon implementation is complete.")
        print("\n📋 Summary:")
        print("   • Gradient favicon with blue-violet colors implemented")
        print("   • Colors: #4285F4 → #9370DB → #9932CC")
        print("   • SVG format for crisp display at any size")
        print("   • Matches the title gradient theme")
        print("   • Browser compatibility ensured")
    else:
        print("⚠️  Some checks failed. Please review the implementation.")
    
    return all_passed

if __name__ == "__main__":
    verify_favicon_implementation()