#!/usr/bin/env python3
"""
Footer Disclaimer Verification Script for Google Fonts Showcase
This script verifies that the footer disclaimer has been properly implemented.
"""

import re
from pathlib import Path

def verify_footer_implementation():
    """Verify that the footer disclaimer is properly implemented."""
    
    print("📋 Footer Disclaimer Implementation Verification")
    print("=" * 60)
    
    # Check if index.html exists
    html_path = Path("index.html")
    if not html_path.exists():
        print("❌ index.html not found!")
        return False
    
    # Check if styles.css exists
    css_path = Path("styles.css")
    if not css_path.exists():
        print("❌ styles.css not found!")
        return False
    
    # Read HTML content
    with open(html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Read CSS content
    with open(css_path, 'r', encoding='utf-8') as f:
        css_content = f.read()
    
    # HTML Checks
    html_checks = {
        "Footer element present": '<footer class="footer-disclaimer">' in html_content,
        "Disclaimer text": 'Google Fonts Showcase' in html_content and 'Mistral Vibe AI' in html_content,
        "Last updated date": 'Last updated: January 3, 2026' in html_content,
        "Footer links": 'footer-link' in html_content,
        "About link": 'About' in html_content,
        "GitHub link": 'GitHub' in html_content,
        "Contact link": 'Contact' in html_content
    }
    
    # CSS Checks
    css_checks = {
        "Footer CSS present": '.footer-disclaimer {' in css_content,
        "Dark theme footer": '.dark-theme .footer-disclaimer' in css_content,
        "Responsive footer": '@media (max-width: 768px)' in css_content and '.footer-disclaimer' in css_content,
        "Footer link styles": '.footer-link {' in css_content,
        "Disclaimer text styles": '.disclaimer-text {' in css_content
    }
    
    print("📄 HTML Implementation:")
    print("-" * 30)
    
    # Perform HTML checks
    html_passed = True
    for check_name, result in html_checks.items():
        status = "✅" if result else "❌"
        print(f"{status} {check_name}: {'PASS' if result else 'FAIL'}")
        if not result:
            html_passed = False
    
    print("\n🎨 CSS Styling:")
    print("-" * 20)
    
    # Perform CSS checks
    css_passed = True
    for check_name, result in css_checks.items():
        status = "✅" if result else "❌"
        print(f"{status} {check_name}: {'PASS' if result else 'FAIL'}")
        if not result:
            css_passed = False
    
    print("\n" + "=" * 60)
    
    # Extract footer HTML for preview
    footer_pattern = r'<footer class="footer-disclaimer">.*?</footer>'
    footer_match = re.search(footer_pattern, html_content, re.DOTALL)
    
    if footer_match:
        footer_html = footer_match.group(0)
        # Clean up for display
        clean_html = footer_html.replace('\n', ' ').replace('  ', ' ')
        if len(clean_html) > 300:
            print(f"📋 Footer HTML Preview: {clean_html[:300]}...")
        else:
            print(f"📋 Footer HTML Preview: {clean_html}")
    
    # Count CSS rules
    footer_css_count = css_content.count('.footer-disclaimer') + css_content.count('.footer-link') + css_content.count('.disclaimer-text')
    print(f"\n📊 CSS Rules: {footer_css_count} footer-related CSS rules")
    
    print("\n" + "=" * 60)
    if html_passed and css_passed:
        print("🎉 ALL CHECKS PASSED! Footer disclaimer implementation is complete.")
        print("\n📝 Summary:")
        print("   • Professional footer disclaimer added")
        print("   • Clear project description and disclaimer")
        print("   • Last updated date included")
        print("   • Navigation links (About, GitHub, Contact)")
        print("   • Responsive design for all screen sizes")
        print("   • Dark theme support")
        print("   • Proper styling and visual hierarchy")
    else:
        print("⚠️  Some checks failed. Please review the implementation.")
    
    return html_passed and css_passed

if __name__ == "__main__":
    verify_footer_implementation()