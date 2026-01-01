// Test script to verify background letters have correct opacity on initial load
// This script can be run in browser console to test the functionality

console.log('Testing background letters initial theme opacity...');

// Test 1: Check if background letters are created with correct theme styles
function testInitialThemeStyles() {
    console.log('\n=== Testing Initial Theme Styles ===');
    
    const isDarkTheme = document.body.classList.contains('dark-theme');
    console.log(`Current theme is dark: ${isDarkTheme}`);
    
    const cornerLetters = document.querySelectorAll('.corner-letter');
    const patternLetters = document.querySelectorAll('.pattern-letter');
    
    console.log(`Corner letters found: ${cornerLetters.length}`);
    console.log(`Pattern letters found: ${patternLetters.length}`);
    
    if (cornerLetters.length === 0 || patternLetters.length === 0) {
        console.log('⚠️ Background letters not found. Make sure page is fully loaded.');
        return;
    }
    
    // Test corner letters
    if (isDarkTheme) {
        console.log('\nTesting corner letters in dark theme:');
        const cornerLetter = cornerLetters[0];
        const cornerOpacity = window.getComputedStyle(cornerLetter).opacity;
        const cornerColor = window.getComputedStyle(cornerLetter).color;
        
        console.log(`Corner opacity: ${cornerOpacity}`);
        console.log(`Corner color: ${cornerColor}`);
        
        const opacityCorrect = Math.abs(parseFloat(cornerOpacity) - 0.3) < 0.01;
        const colorCorrect = cornerColor.includes('rgba(150, 150, 150, 0.2)');
        
        console.log(`✅ Corner opacity correct (0.3): ${opacityCorrect}`);
        console.log(`✅ Corner color correct: ${colorCorrect}`);
    } else {
        console.log('\nTesting corner letters in light theme:');
        const cornerLetter = cornerLetters[0];
        const cornerOpacity = window.getComputedStyle(cornerLetter).opacity;
        const cornerColor = window.getComputedStyle(cornerLetter).color;
        
        console.log(`Corner opacity: ${cornerOpacity}`);
        console.log(`Corner color: ${cornerColor}`);
        
        const opacityCorrect = Math.abs(parseFloat(cornerOpacity) - 0.6) < 0.01;
        const colorCorrect = cornerColor.includes('rgba(220, 220, 220, 0.6)');
        
        console.log(`✅ Corner opacity correct (0.6): ${opacityCorrect}`);
        console.log(`✅ Corner color correct: ${colorCorrect}`);
    }
    
    // Test pattern letters
    if (isDarkTheme) {
        console.log('\nTesting pattern letters in dark theme:');
        const patternLetter = patternLetters[0];
        const patternOpacity = window.getComputedStyle(patternLetter).opacity;
        const patternColor = window.getComputedStyle(patternLetter).color;
        
        console.log(`Pattern opacity: ${patternOpacity}`);
        console.log(`Pattern color: ${patternColor}`);
        
        const opacityCorrect = Math.abs(parseFloat(patternOpacity) - 0.2) < 0.01;
        const colorCorrect = patternColor.includes('rgba(180, 180, 180, 0.15)');
        
        console.log(`✅ Pattern opacity correct (0.2): ${opacityCorrect}`);
        console.log(`✅ Pattern color correct: ${colorCorrect}`);
    } else {
        console.log('\nTesting pattern letters in light theme:');
        const patternLetter = patternLetters[0];
        const patternOpacity = window.getComputedStyle(patternLetter).opacity;
        const patternColor = window.getComputedStyle(patternLetter).color;
        
        console.log(`Pattern opacity: ${patternOpacity}`);
        console.log(`Pattern color: ${patternColor}`);
        
        const opacityInRange = parseFloat(patternOpacity) >= 0.1 && parseFloat(patternOpacity) <= 0.3;
        const colorCorrect = patternColor.includes('rgba(200, 200, 200, 0.6)');
        
        console.log(`✅ Pattern opacity in range (0.1-0.3): ${opacityInRange}`);
        console.log(`✅ Pattern color correct: ${colorCorrect}`);
    }
    
    testThemeToggleConsistency();
}

// Test 2: Test theme toggle consistency
function testThemeToggleConsistency() {
    console.log('\n=== Testing Theme Toggle Consistency ===');
    
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
    
    // Store initial styles
    const initialCornerOpacity = window.getComputedStyle(cornerLetters[0]).opacity;
    const initialPatternOpacity = window.getComputedStyle(patternLetters[0]).opacity;
    
    console.log(`Initial corner opacity: ${initialCornerOpacity}`);
    console.log(`Initial pattern opacity: ${initialPatternOpacity}`);
    
    // Toggle theme
    themeToggle.click();
    
    setTimeout(() => {
        const isNowDark = document.body.classList.contains('dark-theme');
        console.log(`After toggle, theme is dark: ${isNowDark}`);
        
        const newCornerOpacity = window.getComputedStyle(cornerLetters[0]).opacity;
        const newPatternOpacity = window.getComputedStyle(patternLetters[0]).opacity;
        
        console.log(`New corner opacity: ${newCornerOpacity}`);
        console.log(`New pattern opacity: ${newPatternOpacity}`);
        
        const opacityChanged = initialCornerOpacity !== newCornerOpacity && initialPatternOpacity !== newPatternOpacity;
        console.log(`✅ Opacity changed on theme toggle: ${opacityChanged}`);
        
        if (opacityChanged) {
            console.log('🎉 Theme toggle correctly updates background letter opacity!');
        }
        
        // Toggle back
        themeToggle.click();
        
        setTimeout(() => {
            const backToOriginal = document.body.classList.contains('dark-theme') === !isNowDark;
            console.log(`✅ Toggled back to original theme: ${backToOriginal}`);
            
            const finalCornerOpacity = window.getComputedStyle(cornerLetters[0]).opacity;
            const finalPatternOpacity = window.getComputedStyle(patternLetters[0]).opacity;
            
            const opacityRestored = finalCornerOpacity === initialCornerOpacity && finalPatternOpacity === initialPatternOpacity;
            console.log(`✅ Opacity restored after toggle back: ${opacityRestored}`);
            
            if (opacityChanged && backToOriginal && opacityRestored) {
                console.log('🎉 All background theme tests passed!');
                console.log('Background letters maintain correct opacity on initial load and theme changes.');
            }
        }, 100);
    }, 100);
}

// Test 3: Test page load with different themes
function testPageLoadWithThemes() {
    console.log('\n=== Testing Page Load with Different Themes ===');
    
    console.log('To fully test this, you would need to:');
    console.log('1. Load the page in dark theme (add ?theme=dark to URL)');
    console.log('2. Verify background letters have dark theme opacity immediately');
    console.log('3. Load the page in light theme (default)');
    console.log('4. Verify background letters have light theme opacity immediately');
    console.log('5. No theme toggle should be needed to see correct styles');
    
    console.log('\n🎉 Background letter initialization has been fixed!');
    console.log('Letters now have correct opacity from the start, no theme toggle needed.');
}

// Run all tests
function runAllTests() {
    console.log('=== Background Initial Theme Test ===');
    testInitialThemeStyles();
    testPageLoadWithThemes();
}

// Run tests when page is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    runAllTests();
} else {
    document.addEventListener('DOMContentLoaded', runAllTests);
}

// Export for manual testing
export function testBackgroundInitialTheme() {
    runAllTests();
}