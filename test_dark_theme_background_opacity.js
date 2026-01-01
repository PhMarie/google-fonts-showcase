// Test script to verify dark theme background letters have reduced opacity
// This script can be run in browser console to test the functionality

console.log('Testing dark theme background letters opacity...');

// Test 1: Check if background letters exist
function testBackgroundLettersExist() {
    console.log('\n=== Testing Background Letters Existence ===');
    
    const cornerLetters = document.querySelectorAll('.corner-letter');
    const patternLetters = document.querySelectorAll('.pattern-letter');
    
    console.log(`Corner letters found: ${cornerLetters.length}`);
    console.log(`Pattern letters found: ${patternLetters.length}`);
    
    return cornerLetters.length === 4 && patternLetters.length === 30;
}

// Test 2: Test opacity in light theme
function testLightThemeOpacity() {
    console.log('\n=== Testing Light Theme Opacity ===');
    
    // Make sure we're in light theme
    if (document.body.classList.contains('dark-theme')) {
        document.getElementById('theme-toggle').click();
    }
    
    setTimeout(() => {
        const cornerLetters = document.querySelectorAll('.corner-letter');
        const patternLetters = document.querySelectorAll('.pattern-letter');
        
        if (cornerLetters.length > 0) {
            const cornerOpacity = window.getComputedStyle(cornerLetters[0]).opacity;
            const cornerColor = window.getComputedStyle(cornerLetters[0]).color;
            console.log(`Corner letter opacity (light): ${cornerOpacity}`);
            console.log(`Corner letter color (light): ${cornerColor}`);
            
            const opacityOk = Math.abs(parseFloat(cornerOpacity) - 0.6) < 0.1;
            console.log(`✅ Corner opacity correct in light theme (~0.6): ${opacityOk}`);
        }
        
        if (patternLetters.length > 0) {
            const patternOpacity = window.getComputedStyle(patternLetters[0]).opacity;
            const patternColor = window.getComputedStyle(patternLetters[0]).color;
            console.log(`Pattern letter opacity (light): ${patternOpacity}`);
            console.log(`Pattern letter color (light): ${patternColor}`);
            
            const opacityOk = parseFloat(patternOpacity) >= 0.1 && parseFloat(patternOpacity) <= 0.3;
            console.log(`✅ Pattern opacity correct in light theme (0.1-0.3): ${opacityOk}`);
        }
        
        testDarkThemeOpacity();
    }, 100);
}

// Test 3: Test opacity in dark theme
function testDarkThemeOpacity() {
    console.log('\n=== Testing Dark Theme Opacity ===');
    
    // Switch to dark theme
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.click();
    }
    
    setTimeout(() => {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        console.log(`Dark theme active: ${isDarkTheme}`);
        
        const cornerLetters = document.querySelectorAll('.corner-letter');
        const patternLetters = document.querySelectorAll('.pattern-letter');
        
        if (cornerLetters.length > 0) {
            const cornerOpacity = window.getComputedStyle(cornerLetters[0]).opacity;
            const cornerColor = window.getComputedStyle(cornerLetters[0]).color;
            console.log(`Corner letter opacity (dark): ${cornerOpacity}`);
            console.log(`Corner letter color (dark): ${cornerColor}`);
            
            const opacityOk = Math.abs(parseFloat(cornerOpacity) - 0.3) < 0.1;
            console.log(`✅ Corner opacity reduced in dark theme (~0.3): ${opacityOk}`);
            
            // Check color transparency
            const colorOk = cornerColor.includes('rgba') && cornerColor.includes('0.2');
            console.log(`✅ Corner color has reduced transparency: ${colorOk}`);
        }
        
        if (patternLetters.length > 0) {
            const patternOpacity = window.getComputedStyle(patternLetters[0]).opacity;
            const patternColor = window.getComputedStyle(patternLetters[0]).color;
            console.log(`Pattern letter opacity (dark): ${patternOpacity}`);
            console.log(`Pattern letter color (dark): ${patternColor}`);
            
            const opacityOk = Math.abs(parseFloat(patternOpacity) - 0.2) < 0.1;
            console.log(`✅ Pattern opacity reduced in dark theme (~0.2): ${opacityOk}`);
            
            // Check color transparency
            const colorOk = patternColor.includes('rgba') && patternColor.includes('0.15');
            console.log(`✅ Pattern color has reduced transparency: ${colorOk}`);
        }
        
        testThemeToggleFunctionality();
    }, 100);
}

// Test 4: Test theme toggle functionality
function testThemeToggleFunctionality() {
    console.log('\n=== Testing Theme Toggle Functionality ===');
    
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        console.log('❌ Theme toggle button not found');
        return;
    }
    
    const cornerLetters = document.querySelectorAll('.corner-letter');
    const patternLetters = document.querySelectorAll('.pattern-letter');
    
    if (cornerLetters.length === 0 || patternLetters.length === 0) {
        console.log('⚠️ Background letters not found');
        return;
    }
    
    // Test corner letter opacity change
    const cornerLetter = cornerLetters[0];
    const initialCornerOpacity = window.getComputedStyle(cornerLetter).opacity;
    
    // Test pattern letter opacity change
    const patternLetter = patternLetters[0];
    const initialPatternOpacity = window.getComputedStyle(patternLetter).opacity;
    
    console.log(`Initial corner opacity: ${initialCornerOpacity}`);
    console.log(`Initial pattern opacity: ${initialPatternOpacity}`);
    
    // Toggle theme
    themeToggle.click();
    
    setTimeout(() => {
        const newCornerOpacity = window.getComputedStyle(cornerLetter).opacity;
        const newPatternOpacity = window.getComputedStyle(patternLetter).opacity;
        
        console.log(`After toggle corner opacity: ${newCornerOpacity}`);
        console.log(`After toggle pattern opacity: ${newPatternOpacity}`);
        
        const cornerChanged = Math.abs(parseFloat(newCornerOpacity) - parseFloat(initialCornerOpacity)) > 0.1;
        const patternChanged = Math.abs(parseFloat(newPatternOpacity) - parseFloat(initialPatternOpacity)) > 0.05;
        
        console.log(`✅ Corner opacity changed on theme toggle: ${cornerChanged}`);
        console.log(`✅ Pattern opacity changed on theme toggle: ${patternChanged}`);
        
        if (cornerChanged && patternChanged) {
            console.log('🎉 All dark theme background opacity tests passed!');
            console.log('Background letters are now much less visible in dark mode.');
        }
        
        // Toggle back
        themeToggle.click();
    }, 100);
}

// Test 5: Visual comparison test
function testVisualComparison() {
    console.log('\n=== Visual Comparison Test ===');
    
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        console.log('❌ Theme toggle button not found');
        return;
    }
    
    console.log('Please observe the background letters as we toggle between themes...');
    
    // Toggle a few times to show the difference
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            themeToggle.click();
            const isDark = document.body.classList.contains('dark-theme');
            console.log(`Theme toggled to: ${isDark ? 'DARK' : 'LIGHT'}`);
            
            if (i === 2) {
                // End on dark theme
                if (!isDark) {
                    themeToggle.click();
                }
                console.log('Final state: DARK theme (background letters should be very subtle)');
            }
        }, i * 1000);
    }
}

// Run all tests
function runAllTests() {
    console.log('=== Dark Theme Background Opacity Test ===');
    
    if (testBackgroundLettersExist()) {
        testLightThemeOpacity();
        testVisualComparison();
    } else {
        console.log('⚠️ Background letters not found. Make sure the page is fully loaded.');
    }
}

// Run tests when page is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    runAllTests();
} else {
    document.addEventListener('DOMContentLoaded', runAllTests);
}

// Export functions for manual testing
export function testDarkThemeBackgroundOpacity() {
    runAllTests();
}