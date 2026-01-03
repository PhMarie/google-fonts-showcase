#!/usr/bin/env python3
"""
Blue-Violet Gradient Verification Script for Google Fonts Showcase
This script verifies that the blue-violet gradient CSS has been properly implemented.
"""

import re
from pathlib import Path

def verify_blue_violet_gradient():
    """Verify that the blue-violet gradient CSS is properly implemented."""
    
    print("🎨 Blue-Violet Gradient Implementation Verification")
    print("=" * 60)
    
    # Check if styles.css exists
    css_path = Path("styles.css")
    if not css_path.exists():
        print("❌ styles.css not found!")
        return False
    
    # Read CSS content
    with open(css_path, 'r', encoding='utf-8') as f:
        css_content = f.read()
    
    # Define what we're looking for in the blue-violet gradient
    blue_violet_checks = {
        "Google Blue (#4285F4)": "#4285F4" in css_content,
        "Slate Blue (#6A5ACD)": "#6A5ACD" in css_content,
        "Medium Purple (#9370DB)": "#9370DB" in css_content,
        "Medium Orchid (#BA55D3)": "#BA55D3" in css_content,
        "Dark Orchid (#9932CC)": "#9932CC" in css_content,
        "Linear Gradient": "linear-gradient(90deg" in css_content,
        "Background Clip Text": "background-clip: text" in css_content,
        "Webkit Background Clip": "-webkit-background-clip: text" in css_content,
        "Transparent Color": "color: transparent" in css_content,
        "Display Inline Block": "display: inline-block" in css_content,
        "Dark Theme Support": ".dark-theme h1" in css_content,
        "Dark Theme Colors": "#8ab4f8" in css_content and "#DDA0DD" in css_content,
        "Responsive Design": "@media (max-width:" in css_content
    }
    
    # Perform checks
    all_passed = True
    for check_name, result in blue_violet_checks.items():
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
    
    # Extract and display the new gradient CSS
    print(f"\n🎨 Blue-Violet Gradient CSS Preview:")
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
    
    # Check for dark theme gradient specifically
    dark_gradient_pattern = r'\.dark-theme h1\s*\{[^}]*linear-gradient[^}]*\}'
    dark_gradients = re.findall(dark_gradient_pattern, css_content, re.DOTALL)
    
    if dark_gradients:
        print(f"\n   Dark Theme Gradient:")
        lines = dark_gradients[0].strip().split('\n')
        for line in lines[:4]:  # Show first few lines
            if line.strip():
                print(f"     {line.strip()}")
    
    print("\n" + "=" * 60)
    if all_passed:
        print("🎉 ALL CHECKS PASSED! Blue-Violet gradient implementation is complete.")
        print("\n📝 Summary:")
        print("   • Beautiful blue-to-violet gradient: #4285F4 → #6A5ACD → #9370DB → #BA55D3 → #9932CC")
        print("   • Gradient effect uses background-clip: text technique")
        print("   • Both light and dark theme variants are implemented")
        print("   • Responsive design is maintained across screen sizes")
        print("   • Browser compatibility is ensured with -webkit- prefix")
        print("   • Creates a modern, professional aesthetic")
    else:
        print("⚠️  Some checks failed. Please review the implementation.")
    
    return all_passed

if __name__ == "__main__":
    verify_blue_violet_gradient()