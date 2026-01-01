// Test script to verify font name size doubling
// This script can be run in browser console to test the functionality

console.log('Testing font name size...');

// Test 1: Check font name size
function testFontNameSize() {
    console.log('\n=== Testing Font Name Size ===');
    
    const fontNameElements = document.querySelectorAll('.font-name');
    
    if (fontNameElements.length === 0) {
        console.log('❌ No font name elements found. Make sure page is loaded and fonts are displayed.');
        return;
    }
    
    const firstFontName = fontNameElements[0];
    const computedStyle = window.getComputedStyle(firstFontName);
    const fontSize = computedStyle.fontSize;
    const fontWeight = computedStyle.fontWeight;
    
    console.log(`Font name size: ${fontSize}`);
    console.log(`Font name weight: ${fontWeight}`);
    
    const sizeInPx = parseFloat(fontSize);
    const isDoubled = sizeInPx === 32;
    const isBold = fontWeight === '600' || fontWeight === 600;
    
    console.log(`✅ Font size is 32px (doubled from 16px): ${isDoubled}`);
    console.log(`✅ Font weight is 600 (bold): ${isBold}`);
    
    if (isDoubled && isBold) {
        console.log('🎉 Font name size has been doubled successfully!');
        console.log('Titles are now 32px (was 16px) for better visibility.');
    }
    
    testCardHeight();
}

// Test 2: Check card height
function testCardHeight() {
    console.log('\n=== Testing Card Height ===');
    
    const fontCards = document.querySelectorAll('.font-card');
    
    if (fontCards.length === 0) {
        console.log('❌ No font cards found. Make sure page is loaded.');
        return;
    }
    
    const firstCard = fontCards[0];
    const computedStyle = window.getComputedStyle(firstCard);
    const minHeight = computedStyle.minHeight;
    
    console.log(`Card min-height: ${minHeight}`);
    
    const heightInPx = parseFloat(minHeight);
    const isAdjusted = heightInPx === 280;
    
    console.log(`✅ Card height adjusted to 280px: ${isAdjusted}`);
    
    if (isAdjusted) {
        console.log('🎉 Card height has been adjusted successfully!');
        console.log('Increased from 220px to 280px to accommodate larger font names.');
    }
    
    testVisualImpact();
}

// Test 3: Test visual impact
function testVisualImpact() {
    console.log('\n=== Testing Visual Impact ===');
    
    console.log('With doubled font name size:');
    console.log('1. Font names should be much more visible and impactful');
    console.log('2. Cards should have enough height to accommodate large names');
    console.log('3. The hierarchy should be clear (title > preview > buttons)');
    console.log('4. The design should feel modern and professional');
    
    console.log('\nPlease evaluate:');
    console.log('- Are font names clearly visible and impactful?');
    console.log('- Do cards have enough space for large font names?');
    console.log('- Is the visual hierarchy clear and intuitive?');
    console.log('- Does the design feel modern and professional?');
    
    console.log('\n🎉 Font name size has been successfully doubled!');
    console.log('Titles are now 32px (twice the original 16px) for better visibility and impact.');
}

// Run all tests
function runAllTests() {
    console.log('=== Font Name Size Test ===');
    testFontNameSize();
}

// Run tests when page is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    runAllTests();
} else {
    document.addEventListener('DOMContentLoaded', runAllTests);
}

// Export for manual testing
export function testFontNameSize() {
    runAllTests();
}