#!/usr/bin/env python3
"""
Gradient Verification Script for Google Fonts Showcase
This script verifies that the gradient CSS has been properly implemented.
"""

import re
from pathlib import Path

def verify_gradient_implementation():
    """Verify that the gradient CSS is properly implemented."""
    
    print("🎨 Google Fonts Gradient Implementation Verification")
    print("=" * 60)
    
    # Check if styles.css exists
    css_path = Path("styles.css")
    if not css_path.exists():
        print("❌ styles.css not found!")
        return False
    
    # Read CSS content
    with open(css_path, 'r', encoding='utf-8') as f:
        css_content = f.read()
    
    # Define what we're looking for
    checks = {
        "Google Blue (#4285F4)": "#4285F4" in css_content,
        "Google Red (#DB4437)": "#DB4437" in css_content,
        "Google Yellow (#F4B400)": "#F4B400" in css_content,
        "Google Green (#0F9D58)": "#0F9D58" in css_content,
        "Linear Gradient": "linear-gradient(90deg" in css_content,
        "Background Clip Text": "background-clip: text" in css_content,
        "Webkit Background Clip": "-webkit-background-clip: text" in css_content,
        "Transparent Color": "color: transparent" in css_content,
        "Display Inline Block": "display: inline-block" in css_content,
        "Dark Theme Support": ".dark-theme h1" in css_content,
        "Dark Theme Gradient": "#8ab4f8" in css_content,  # Lighter blue for dark theme
        "Responsive Design": "@media (max-width:" in css_content
    }
    
    # Perform checks
    all_passed = True
    for check_name, result in checks.items():
        status = "✅" if result else "❌"
        print(f"{status} {check_name}: {'PASS' if result else 'FAIL'}")
        if not result:
            all_passed = False
    
    print("\n" + "=" * 60)
    
    # Count gradient definitions
    gradient_count = css_content.count("linear-gradient")
    h1_definitions = css_content.count("h1 {")
    
    print(f"📊 Statistics:")
    print(f"   • Gradient definitions: {gradient_count}")
    print(f"   • h1 style definitions: {h1_definitions}")
    
    # Extract and display the gradient CSS
    print(f"\n🎨 Gradient CSS Preview:")
    gradient_pattern = r'h1\s*\{[^}]*linear-gradient[^}]*\}'
    gradients = re.findall(gradient_pattern, css_content, re.DOTALL)
    
    for i, gradient in enumerate(gradients[:2], 1):  # Show first 2
        print(f"\n   Gradient {i}:")
        # Clean up and show a preview
        lines = gradient.strip().split('\n')
        for line in lines[:5]:  # Show first few lines
            if line.strip():
                print(f"     {line.strip()}")
        if len(gradient.strip().split('\n')) > 5:
            print(f"     ... ({len(gradient.strip().split('\n')) - 5} more lines)")
    
    print("\n" + "=" * 60)
    if all_passed:
        print("🎉 ALL CHECKS PASSED! Gradient implementation is complete.")
        print("\n📝 Summary:")
        print("   • Google brand colors (blue, red, yellow, green) are used")
        print("   • Gradient effect uses background-clip: text technique")
        print("   • Both light and dark theme variants are implemented")
        print("   • Responsive design is maintained across screen sizes")
        print("   • Browser compatibility is ensured with -webkit- prefix")
    else:
        print("⚠️  Some checks failed. Please review the implementation.")
    
    return all_passed

if __name__ == "__main__":
    verify_gradient_implementation()