// Test script to verify preview text cursive font sizes
// This script can be run in browser console to test the functionality

console.log('Testing preview text cursive font sizes...');

// Test 1: Check if preview text element exists
function testPreviewTextElement() {
    console.log('\n=== Testing Preview Text Element ===');
    
    const previewTextElement = document.getElementById('preview-text');
    if (previewTextElement) {
        console.log('✅ Preview text element found');
        return previewTextElement;
    } else {
        console.log('❌ Preview text element not found');
        return null;
    }
}

// Test 2: Test selecting a cursive font for preview
function testSelectCursiveFont(previewTextElement) {
    console.log('\n=== Testing Cursive Font Selection ===');
    
    // Find a cursive font card
    const cursiveFontCards = document.querySelectorAll('.font-card[data-font-category="cursive"]');
    if (cursiveFontCards.length === 0) {
        console.log('⚠️ No cursive font cards found');
        return null;
    }
    
    const cursiveFontCard = cursiveFontCards[0];
    const fontName = cursiveFontCard.dataset.fontName;
    const fontCategory = cursiveFontCard.dataset.fontCategory;
    
    console.log(`Selecting cursive font: ${fontName} (${fontCategory})`);
    
    // Simulate selecting the font (click on the card)
    cursiveFontCard.click();
    
    // Wait a bit for the font to load and apply
    setTimeout(() => {
        testPreviewFontSizes(previewTextElement, fontName, fontCategory);
    }, 500);
    
    return {fontName, fontCategory};
}

// Test 3: Check preview text font sizes
function testPreviewFontSizes(previewTextElement, fontName, fontCategory) {
    console.log('\n=== Testing Preview Text Font Sizes ===');
    
    if (!previewTextElement.classList.contains('using-card-font')) {
        console.log('⚠️ Preview text is not using card font');
        return;
    }
    
    const computedStyle = window.getComputedStyle(previewTextElement);
    const fontSize = computedStyle.fontSize;
    const fontFamily = computedStyle.fontFamily;
    
    console.log(`Current font: ${fontFamily}`);
    console.log(`Current size: ${fontSize}`);
    
    // Check if it's a cursive font and has correct size
    if (fontCategory === 'cursive') {
        const sizeInPx = parseFloat(fontSize);
        const isCorrectSize = Math.abs(sizeInPx - 20) < 1;
        console.log(`✅ Cursive font has correct default size (20px): ${isCorrectSize}`);
        
        if (isCorrectSize) {
            testPreviewSizeIncrease(previewTextElement, fontName);
        }
    } else {
        const sizeInPx = parseFloat(fontSize);
        const isCorrectSize = Math.abs(sizeInPx - 16) < 1;
        console.log(`✅ Non-cursive font has correct default size (16px): ${isCorrectSize}`);
    }
}

// Test 4: Test size increase for preview text
function testPreviewSizeIncrease(previewTextElement, fontName) {
    console.log('\n=== Testing Preview Text Size Increase ===');
    
    const increaseButton = document.getElementById('increase-font-size');
    if (!increaseButton) {
        console.log('❌ Increase font size button not found');
        return;
    }
    
    const initialSize = window.getComputedStyle(previewTextElement).fontSize;
    console.log(`Initial size: ${initialSize}`);
    
    // Click the increase button
    increaseButton.click();
    
    setTimeout(() => {
        const newSize = window.getComputedStyle(previewTextElement).fontSize;
        console.log(`After first click: ${newSize}`);
        
        // For cursive fonts, should go from 20px to 22px
        const initialSizePx = parseFloat(initialSize);
        const newSizePx = parseFloat(newSize);
        const expectedSize = initialSizePx === 20 ? 22 : initialSizePx + 2;
        const isCorrectIncrease = Math.abs(newSizePx - expectedSize) < 1;
        console.log(`✅ Size increased correctly (expected ~${expectedSize}px): ${isCorrectIncrease}`);
        
        // Click again to test max size
        increaseButton.click();
        setTimeout(() => {
            const maxSize = window.getComputedStyle(previewTextElement).fontSize;
            console.log(`After second click: ${maxSize}`);
            
            // For cursive fonts, should be 24px
            const maxSizePx = parseFloat(maxSize);
            const expectedMax = initialSizePx === 20 ? 24 : Math.min(initialSizePx + 4, 24);
            const isMaxSize = Math.abs(maxSizePx - expectedMax) < 1;
            console.log(`✅ Reached expected max size (${expectedMax}px): ${isMaxSize}`);
            
            // Click again to test cycling
            increaseButton.click();
            setTimeout(() => {
                const cycledSize = window.getComputedStyle(previewTextElement).fontSize;
                console.log(`After third click (should cycle back): ${cycledSize}`);
                
                // Should cycle back to start
                const cycledSizePx = parseFloat(cycledSize);
                const expectedStart = initialSizePx;
                const isCycledBack = Math.abs(cycledSizePx - expectedStart) < 1;
                console.log(`✅ Cycled back to start (${expectedStart}px): ${isCycledBack}`);
                
                // Test reset functionality
                testPreviewReset(previewTextElement);
            }, 100);
        }, 100);
    }, 100);
}

// Test 5: Test preview reset functionality
function testPreviewReset(previewTextElement) {
    console.log('\n=== Testing Preview Text Reset ===');
    
    const resetButton = document.getElementById('reset-preview-font');
    if (!resetButton) {
        console.log('❌ Reset preview font button not found');
        return;
    }
    
    const sizeBeforeReset = window.getComputedStyle(previewTextElement).fontSize;
    console.log(`Size before reset: ${sizeBeforeReset}`);
    
    // Click the reset button
    resetButton.click();
    
    setTimeout(() => {
        const sizeAfterReset = window.getComputedStyle(previewTextElement).fontSize;
        console.log(`Size after reset: ${sizeAfterReset}`);
        
        // Should be back to default (no inline style)
        const isReset = previewTextElement.style.fontSize === '';
        console.log(`✅ Preview text reset successfully: ${isReset}`);
        
        if (isReset) {
            console.log('🎉 All preview text cursive size tests passed!');
        }
    }, 100);
}

// Test 6: Compare cursive vs non-cursive preview sizes
function testPreviewSizeComparison() {
    console.log('\n=== Testing Preview Size Comparison ===');
    
    const previewTextElement = document.getElementById('preview-text');
    if (!previewTextElement) {
        console.log('❌ Preview text element not found');
        return;
    }
    
    // Test with cursive font
    const cursiveFontCards = document.querySelectorAll('.font-card[data-font-category="cursive"]');
    const otherFontCards = document.querySelectorAll('.font-card:not([data-font-category="cursive"])');
    
    if (cursiveFontCards.length > 0 && otherFontCards.length > 0) {
        const cursiveCard = cursiveFontCards[0];
        const otherCard = otherFontCards[0];
        
        console.log(`Testing preview sizes with:`);
        console.log(`Cursive font: ${cursiveCard.dataset.fontName}`);
        console.log(`Other font: ${otherCard.dataset.fontName}`);
        
        // Test cursive font
        cursiveCard.click();
        setTimeout(() => {
            const cursiveSize = window.getComputedStyle(previewTextElement).fontSize;
            console.log(`Cursive preview size: ${cursiveSize}`);
            
            // Test other font
            otherCard.click();
            setTimeout(() => {
                const otherSize = window.getComputedStyle(previewTextElement).fontSize;
                console.log(`Other font preview size: ${otherSize}`);
                
                const cursiveSizePx = parseFloat(cursiveSize);
                const otherSizePx = parseFloat(otherSize);
                
                const cursiveCorrect = Math.abs(cursiveSizePx - 20) < 1;
                const otherCorrect = Math.abs(otherSizePx - 16) < 1;
                
                console.log(`✅ Cursive preview starts at 20px: ${cursiveCorrect}`);
                console.log(`✅ Other preview starts at 16px: ${otherCorrect}`);
                
                if (cursiveCorrect && otherCorrect) {
                    console.log('🎉 Preview size comparison test passed!');
                }
            }, 500);
        }, 500);
    }
}

// Run all tests
function runAllTests() {
    console.log('=== Preview Text Cursive Font Size Test ===');
    
    const previewTextElement = testPreviewTextElement();
    if (previewTextElement) {
        const fontInfo = testSelectCursiveFont(previewTextElement);
        if (fontInfo) {
            testPreviewSizeComparison();
        }
    }
}

// Run tests when page is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    runAllTests();
} else {
    document.addEventListener('DOMContentLoaded', runAllTests);
}

// Export functions for manual testing
export function testPreviewTextCursiveSizes() {
    runAllTests();
}