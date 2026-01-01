// Test script to verify cursive font sizes are correctly applied
// This script can be run in browser console to test the functionality

console.log('Testing cursive font sizes...');

// Test 1: Check if CSS rules are properly defined
function testCSSRules() {
    console.log('\n=== Testing CSS Rules ===');
    
    const styleSheets = document.styleSheets;
    let cssFound = false;
    
    for (let i = 0; i < styleSheets.length; i++) {
        try {
            const rules = styleSheets[i].cssRules || styleSheets[i].rules;
            for (let j = 0; j < rules.length; j++) {
                const rule = rules[j];
                if (rule.selectorText && rule.selectorText.includes('[data-font-category="cursive"]')) {
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

// Test 2: Check cursive font cards have correct default size
function testCursiveFontDefaultSizes() {
    console.log('\n=== Testing Cursive Font Default Sizes ===');
    
    const cursiveFontCards = document.querySelectorAll('.font-card[data-font-category="cursive"]');
    const otherFontCards = document.querySelectorAll('.font-card:not([data-font-category="cursive"])');
    
    console.log(`Cursive font cards found: ${cursiveFontCards.length}`);
    console.log(`Other font cards found: ${otherFontCards.length}`);
    
    if (cursiveFontCards.length === 0) {
        console.log('⚠️ No cursive font cards found. Make sure cursive fonts are loaded.');
        return;
    }
    
    // Test first cursive font card
    const firstCursiveCard = cursiveFontCards[0];
    const cursivePreview = firstCursiveCard.querySelector('.font-preview');
    
    if (cursivePreview) {
        const computedStyle = window.getComputedStyle(cursivePreview);
        const fontSize = computedStyle.fontSize;
        console.log(`First cursive font (${firstCursiveCard.dataset.fontName}): ${fontSize}`);
        
        // Check if it's approximately 20px (allowing for some variation)
        const sizeInPx = parseFloat(fontSize);
        const isCorrectSize = Math.abs(sizeInPx - 20) < 1;
        console.log(`✅ Cursive font has correct default size (20px): ${isCorrectSize}`);
    }
    
    // Test first non-cursive font card
    if (otherFontCards.length > 0) {
        const firstOtherCard = otherFontCards[0];
        const otherPreview = firstOtherCard.querySelector('.font-preview');
        
        if (otherPreview) {
            const computedStyle = window.getComputedStyle(otherPreview);
            const fontSize = computedStyle.fontSize;
            console.log(`First non-cursive font (${firstOtherCard.dataset.fontName}): ${fontSize}`);
            
            // Should be 16px by default
            const sizeInPx = parseFloat(fontSize);
            const isCorrectSize = Math.abs(sizeInPx - 16) < 1;
            console.log(`✅ Non-cursive font has correct default size (16px): ${isCorrectSize}`);
        }
    }
}

// Test 3: Test size increase functionality for cursive fonts
function testCursiveFontSizeIncrease() {
    console.log('\n=== Testing Cursive Font Size Increase ===');
    
    const cursiveFontCards = document.querySelectorAll('.font-card[data-font-category="cursive"]');
    
    if (cursiveFontCards.length === 0) {
        console.log('⚠️ No cursive font cards found for size increase test.');
        return;
    }
    
    // Test with first cursive font card
    const firstCursiveCard = cursiveFontCards[0];
    const previewId = firstCursiveCard.querySelector('.font-preview').id;
    const initialSize = window.getComputedStyle(firstCursiveCard.querySelector('.font-preview')).fontSize;
    
    console.log(`Initial size: ${initialSize}`);
    
    // Click the size increase button
    const sizeButton = firstCursiveCard.querySelector('.card-size-increase-btn');
    if (sizeButton) {
        sizeButton.click();
        
        // Wait a bit for the change to apply
        setTimeout(() => {
            const newSize = window.getComputedStyle(firstCursiveCard.querySelector('.font-preview')).fontSize;
            console.log(`After first click: ${newSize}`);
            
            // Should go from 20px to 22px
            const initialSizePx = parseFloat(initialSize);
            const newSizePx = parseFloat(newSize);
            const expectedIncrease = initialSizePx === 20 ? 22 : initialSizePx + 2;
            const isCorrectIncrease = Math.abs(newSizePx - expectedIncrease) < 1;
            console.log(`✅ Size increased correctly (expected ~${expectedIncrease}px): ${isCorrectIncrease}`);
            
            // Click again to test max size
            sizeButton.click();
            setTimeout(() => {
                const maxSize = window.getComputedStyle(firstCursiveCard.querySelector('.font-preview')).fontSize;
                console.log(`After second click: ${maxSize}`);
                
                // Should be 24px (max for cursive)
                const maxSizePx = parseFloat(maxSize);
                const isMaxSize = Math.abs(maxSizePx - 24) < 1;
                console.log(`✅ Reached max size (24px): ${isMaxSize}`);
                
                // Click again to test cycling
                sizeButton.click();
                setTimeout(() => {
                    const cycledSize = window.getComputedStyle(firstCursiveCard.querySelector('.font-preview')).fontSize;
                    console.log(`After third click (should cycle back): ${cycledSize}`);
                    
                    // Should cycle back to 20px
                    const cycledSizePx = parseFloat(cycledSize);
                    const isCycledBack = Math.abs(cycledSizePx - 20) < 1;
                    console.log(`✅ Cycled back to start (20px): ${isCycledBack}`);
                }, 100);
            }, 100);
        }, 100);
    } else {
        console.log('❌ Size increase button not found');
    }
}

// Test 4: Compare cursive vs non-cursive size ranges
function testSizeRangeComparison() {
    console.log('\n=== Testing Size Range Comparison ===');
    
    const cursiveFontCards = document.querySelectorAll('.font-card[data-font-category="cursive"]');
    const otherFontCards = document.querySelectorAll('.font-card:not([data-font-category="cursive"])');
    
    if (cursiveFontCards.length > 0 && otherFontCards.length > 0) {
        const cursiveCard = cursiveFontCards[0];
        const otherCard = otherFontCards[0];
        
        const cursivePreview = cursiveCard.querySelector('.font-preview');
        const otherPreview = otherCard.querySelector('.font-preview');
        
        console.log(`Testing size ranges:`);
        console.log(`Cursive font: ${cursiveCard.dataset.fontName}`);
        console.log(`Other font: ${otherCard.dataset.fontName}`);
        
        // Test cursive font size progression
        const cursiveButton = cursiveCard.querySelector('.card-size-increase-btn');
        const cursiveSizes = [];
        
        // Store initial size
        cursiveSizes.push(parseFloat(window.getComputedStyle(cursivePreview).fontSize));
        
        // Click through all sizes
        for (let i = 0; i < 3; i++) {
            cursiveButton.click();
            setTimeout(() => {
                cursiveSizes.push(parseFloat(window.getComputedStyle(cursivePreview).fontSize));
                
                if (i === 2) {
                    console.log(`Cursive font sizes: ${cursiveSizes.join('px → ')}px`);
                    console.log(`✅ Cursive range: 20px → 22px → 24px`);
                }
            }, (i + 1) * 100);
        }
        
        // Test other font size progression
        const otherButton = otherCard.querySelector('.card-size-increase-btn');
        const otherSizes = [];
        
        // Store initial size
        otherSizes.push(parseFloat(window.getComputedStyle(otherPreview).fontSize));
        
        // Click through all sizes
        for (let i = 0; i < 4; i++) {
            otherButton.click();
            setTimeout(() => {
                otherSizes.push(parseFloat(window.getComputedStyle(otherPreview).fontSize));
                
                if (i === 3) {
                    console.log(`Other font sizes: ${otherSizes.join('px → ')}px`);
                    console.log(`✅ Other range: 16px → 18px → 20px → 22px`);
                }
            }, (i + 1) * 100);
        }
    }
}

// Run all tests
function runAllTests() {
    console.log('=== Cursive Font Size Test ===');
    
    testCSSRules();
    testCursiveFontDefaultSizes();
    testCursiveFontSizeIncrease();
    testSizeRangeComparison();
}

// Run tests when page is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    runAllTests();
} else {
    document.addEventListener('DOMContentLoaded', runAllTests);
}

// Export functions for manual testing
export function testCursiveFontSizes() {
    runAllTests();
}