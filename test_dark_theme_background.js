// Test script to verify dark theme background letters opacity
// This script can be run in browser console to test the functionality

console.log('Testing dark theme background letters opacity...');

// Test 1: Check if CSS styles are properly defined
function testCSSStyles() {
    const styleSheets = document.styleSheets;
    let cssFound = false;
    
    for (let i = 0; i < styleSheets.length; i++) {
        try {
            const rules = styleSheets[i].cssRules || styleSheets[i].rules;
            for (let j = 0; j < rules.length; j++) {
                const rule = rules[j];
                if (rule.selectorText && 
                    (rule.selectorText.includes('.dark-theme .corner-letter') || 
                     rule.selectorText.includes('.dark-theme .pattern-letter'))) {
                    console.log('✅ CSS rule found:', rule.selectorText);
                    console.log('   CSS text:', rule.cssText);
                    cssFound = true;
                }
            }
        } catch (e) {
            console.log('Could not access stylesheet:', e.message);
        }
    }
    
    if (!cssFound) {
        console.log('⚠️ CSS rules not found in stylesheets (might be in external file)');
    }
}

// Test 2: Check if background letters exist
function testBackgroundLettersExist() {
    const cornerLetters = document.querySelectorAll('.corner-letter');
    const patternLetters = document.querySelectorAll('.pattern-letter');
    
    console.log(`Corner letters found: ${cornerLetters.length}`);
    console.log(`Pattern letters found: ${patternLetters.length}`);
    
    return cornerLetters.length > 0 && patternLetters.length > 0;
}

// Test 3: Test theme toggle functionality
function testThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) {
        console.log('❌ Theme toggle button not found');
        return false;
    }
    
    console.log('✅ Theme toggle button found');
    
    // Test clicking the button
    const initialTheme = document.body.classList.contains('dark-theme');
    console.log('Initial theme is dark:', initialTheme);
    
    // Simulate click
    themeToggleBtn.click();
    
    // Wait a bit for the transition
    setTimeout(() => {
        const newTheme = document.body.classList.contains('dark-theme');
        console.log('Theme after toggle is dark:', newTheme);
        console.log('Theme toggled successfully:', initialTheme !== newTheme);
        
        // Test background letters opacity
        testBackgroundLettersOpacity();
        
        // Toggle back
        themeToggleBtn.click();
    }, 100);
    
    return true;
}

// Test 4: Check background letters opacity
function testBackgroundLettersOpacity() {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    const cornerLetters = document.querySelectorAll('.corner-letter');
    const patternLetters = document.querySelectorAll('.pattern-letter');
    
    console.log(`\nTesting opacity in ${isDarkTheme ? 'DARK' : 'LIGHT'} theme:`);
    
    if (cornerLetters.length > 0) {
        const cornerOpacity = window.getComputedStyle(cornerLetters[0]).opacity;
        const cornerColor = window.getComputedStyle(cornerLetters[0]).color;
        console.log(`Corner letter opacity: ${cornerOpacity}`);
        console.log(`Corner letter color: ${cornerColor}`);
    }
    
    if (patternLetters.length > 0) {
        const patternOpacity = window.getComputedStyle(patternLetters[0]).opacity;
        const patternColor = window.getComputedStyle(patternLetters[0]).color;
        console.log(`Pattern letter opacity: ${patternOpacity}`);
        console.log(`Pattern letter color: ${patternColor}`);
    }
    
    // Check if opacity is reduced in dark theme
    if (isDarkTheme) {
        const expectedCornerOpacity = 0.4;
        const expectedPatternOpacity = 0.3;
        
        if (cornerLetters.length > 0) {
            const actualOpacity = parseFloat(window.getComputedStyle(cornerLetters[0]).opacity);
            const opacityOk = Math.abs(actualOpacity - expectedCornerOpacity) < 0.1;
            console.log(`✅ Corner opacity reduced in dark theme: ${opacityOk} (expected ~${expectedCornerOpacity}, got ${actualOpacity})`);
        }
        
        if (patternLetters.length > 0) {
            const actualOpacity = parseFloat(window.getComputedStyle(patternLetters[0]).opacity);
            const opacityOk = Math.abs(actualOpacity - expectedPatternOpacity) < 0.1;
            console.log(`✅ Pattern opacity reduced in dark theme: ${opacityOk} (expected ~${expectedPatternOpacity}, got ${actualOpacity})`);
        }
    }
}

// Run all tests
function runAllTests() {
    console.log('=== Dark Theme Background Letters Test ===');
    
    testCSSStyles();
    
    if (testBackgroundLettersExist()) {
        testThemeToggle();
    } else {
        console.log('⚠️ Background letters not found. Make sure the page is fully loaded.');
        console.log('Try running this test after the page has completely loaded.');
    }
}

// Run tests when page is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    runAllTests();
} else {
    document.addEventListener('DOMContentLoaded', runAllTests);
}

// Export functions for manual testing
export function testDarkThemeBackground() {
    runAllTests();
}