// Test script to verify sticky controls borders in both themes
// This script can be run in browser console to test the functionality

console.log('Testing sticky controls borders in both themes...');

// Test 1: Test borders in both themes
function testBordersBothThemes() {
    console.log('\n=== Testing Borders in Both Themes ===');
    
    const themeToggle = document.getElementById('theme-toggle');
    const stickyControls = document.querySelector('.sticky-controls');
    
    if (!themeToggle || !stickyControls) {
        console.log('❌ Required elements not found');
        return;
    }
    
    // Test dark theme
    if (!document.body.classList.contains('dark-theme')) {
        themeToggle.click();
    }
    
    setTimeout(() => {
        console.log('\n--- Dark Theme ---');
        const darkStyle = window.getComputedStyle(stickyControls);
        const darkBorder = darkStyle.border;
        const darkBorderColor = darkStyle.borderColor;
        
        console.log(`Border: ${darkBorder}`);
        console.log(`Border color: ${darkBorderColor}`);
        
        const hasDarkBorder = darkBorder.includes('1px') && darkBorder.includes('solid');
        const darkBorderColorCorrect = darkBorderColor.includes('rgba(255, 255, 255, 0.05)');
        
        console.log(`✅ Dark theme has border: ${hasDarkBorder}`);
        console.log(`✅ Dark border color correct: ${darkBorderColorCorrect}`);
        
        // Test light theme
        themeToggle.click();
        
        setTimeout(() => {
            console.log('\n--- Light Theme ---');
            const lightStyle = window.getComputedStyle(stickyControls);
            const lightBorder = lightStyle.border;
            const lightBorderColor = lightStyle.borderColor;
            
            console.log(`Border: ${lightBorder}`);
            console.log(`Border color: ${lightBorderColor}`);
            
            const hasLightBorder = lightBorder.includes('1px') && lightBorder.includes('solid');
            const lightBorderColorCorrect = lightBorderColor.includes('rgba(0, 0, 0, 0.03)');
            
            console.log(`✅ Light theme has border: ${hasLightBorder}`);
            console.log(`✅ Light border color correct: ${lightBorderColorCorrect}`);
            
            // Toggle back to dark
            themeToggle.click();
            
            setTimeout(() => {
                if (hasDarkBorder && darkBorderColorCorrect && hasLightBorder && lightBorderColorCorrect) {
                    console.log('\n🎉 All border tests passed!');
                    console.log('Both themes now have consistent, subtle borders.');
                    console.log('Dark theme: white border (rgba(255, 255, 255, 0.05))');
                    console.log('Light theme: black border (rgba(0, 0, 0, 0.03))');
                }
            }, 100);
        }, 100);
    }, 100);
}

// Test 2: Test visual consistency
function testVisualConsistency() {
    console.log('\n=== Testing Visual Consistency ===');
    
    console.log('With consistent borders in both themes:');
    console.log('1. Both themes have a professional, modern look');
    console.log('2. Borders provide subtle definition without distraction');
    console.log('3. Content remains perfectly readable in both themes');
    console.log('4. The effect is cohesive and intentional');
    
    console.log('\nPlease evaluate:');
    console.log('- Dark theme: border should be very subtle white');
    console.log('- Light theme: border should be very subtle black');
    console.log('- Both should provide gentle definition');
    console.log('- Content should remain the primary focus');
}

// Run all tests
function runAllTests() {
    console.log('=== Sticky Controls Borders Test ===');
    testBordersBothThemes();
    testVisualConsistency();
}

// Run tests when page is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    runAllTests();
} else {
    document.addEventListener('DOMContentLoaded', runAllTests);
}

// Export for manual testing
export function testStickyBordersBothThemes() {
    runAllTests();
}