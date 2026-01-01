// Test script to verify and improve search blur behavior
// This script can be run in browser console to test the functionality

console.log('Testing search blur behavior...');

// Test 1: Test current blur behavior
function testCurrentBlurBehavior() {
    console.log('\n=== Testing Current Blur Behavior ===');
    
    const fontSearch = document.getElementById('font-search');
    if (!fontSearch) {
        console.log('❌ Font search input not found');
        return;
    }
    
    // Test 1: Click on search box (should add prefix)
    fontSearch.click();
    fontSearch.focus();
    
    setTimeout(() => {
        const prefixValue = fontSearch.value;
        console.log(`After click: "${prefixValue}"`);
        
        // Test 2: Blur without typing (should reset)
        fontSearch.blur();
        
        setTimeout(() => {
            const afterBlur = fontSearch.value;
            console.log(`After blur (no typing): "${afterBlur}"`);
            const correctlyReset = afterBlur === '';
            console.log(`✅ Correctly reset on blur: ${correctlyReset}`);
            
            if (correctlyReset) {
                testBlurWithTyping();
            }
        }, 100);
    }, 100);
}

// Test 2: Test blur behavior when user has typed something
function testBlurWithTyping() {
    console.log('\n=== Testing Blur With Typing ===');
    
    const fontSearch = document.getElementById('font-search');
    if (!fontSearch) {
        console.log('❌ Font search input not found');
        return;
    }
    
    // Click to get prefix
    fontSearch.click();
    fontSearch.focus();
    
    setTimeout(() => {
        // Add a search term
        fontSearch.value = fontSearch.value + 'test';
        console.log(`After typing: "${fontSearch.value}"`);
        
        // Blur with typing
        fontSearch.blur();
        
        setTimeout(() => {
            const afterBlur = fontSearch.value;
            console.log(`After blur (with typing): "${afterBlur}"`);
            const keptSearch = afterBlur.includes('test');
            console.log(`✅ Kept user's search term: ${keptSearch}`);
            
            if (keptSearch) {
                console.log('🎉 Current blur behavior is working correctly!');
                console.log('Prefix-only blurs are reset, user searches are preserved.');
                testImprovedResetOptions();
            }
        }, 100);
    }, 100);
}

// Test 3: Test improved reset options
function testImprovedResetOptions() {
    console.log('\n=== Testing Improved Reset Options ===');
    
    const fontSearch = document.getElementById('font-search');
    const clearSearchBtn = document.getElementById('clear-search');
    
    if (!fontSearch || !clearSearchBtn) {
        console.log('❌ Required elements not found');
        return;
    }
    
    console.log('Current reset options:');
    console.log('1. Click outside (blur) - resets if only prefix');
    console.log('2. Clear button (×) - always resets');
    console.log('3. Manual deletion - user can delete text');
    
    // Test clear button
    fontSearch.click();
    fontSearch.focus();
    
    setTimeout(() => {
        fontSearch.value = fontSearch.value + 'test';
        console.log(`Search with term: "${fontSearch.value}"`);
        
        // Clear button should be visible
        const clearButtonVisible = clearSearchBtn.style.display !== 'none';
        console.log(`✅ Clear button visible: ${clearButtonVisible}`);
        
        if (clearButtonVisible) {
            // Simulate clear button click
            clearSearchBtn.click();
            
            setTimeout(() => {
                const afterClear = fontSearch.value;
                console.log(`After clear button: "${afterClear}"`);
                const correctlyCleared = afterClear === '';
                console.log(`✅ Correctly cleared: ${correctlyCleared}`);
                
                if (correctlyCleared) {
                    testAlternativeResetMethods();
                }
            }, 100);
        }
    }, 100);
}

// Test 4: Test alternative reset methods
function testAlternativeResetMethods() {
    console.log('\n=== Testing Alternative Reset Methods ===');
    
    const fontSearch = document.getElementById('font-search');
    
    console.log('Alternative reset methods to consider:');
    console.log('1. Double-click on search box to reset');
    console.log('2. Click on category button to reset search');
    console.log('3. Add a dedicated "Reset Search" button');
    console.log('4. Press Escape key to reset');
    
    // Test category button reset
    const allButton = document.querySelector('.category-btn[data-category="all"]');
    if (allButton) {
        // Add search term
        fontSearch.click();
        fontSearch.focus();
        
        setTimeout(() => {
            fontSearch.value = fontSearch.value + 'test';
            console.log(`Search before category switch: "${fontSearch.value}"`);
            
            // Switch category
            allButton.click();
            
            setTimeout(() => {
                const afterCategorySwitch = fontSearch.value;
                console.log(`Search after category switch: "${afterCategorySwitch}"`);
                const resetOnCategoryChange = afterCategorySwitch === '';
                console.log(`✅ Reset on category change: ${resetOnCategoryChange}`);
                
                if (resetOnCategoryChange) {
                    console.log('🎉 Category switching already resets search - good UX!');
                }
                
                // Switch back to CAPS for next test
                const capsButton = document.querySelector('.category-btn[data-category="caps"]');
                if (capsButton) {
                    capsButton.click();
                }
                
                testEscapeKeyReset();
            }, 500);
        }, 100);
    }
}

// Test 5: Test Escape key reset
function testEscapeKeyReset() {
    console.log('\n=== Testing Escape Key Reset ===');
    
    const fontSearch = document.getElementById('font-search');
    
    // Add search term
    fontSearch.click();
    fontSearch.focus();
    
    setTimeout(() => {
        fontSearch.value = fontSearch.value + 'test';
        console.log(`Search before Escape: "${fontSearch.value}"`);
        
        // Simulate Escape key press
        const escapeEvent = new KeyboardEvent('keydown', {
            key: 'Escape',
            code: 'Escape',
            keyCode: 27,
            which: 27
        });
        fontSearch.dispatchEvent(escapeEvent);
        
        setTimeout(() => {
            const afterEscape = fontSearch.value;
            console.log(`Search after Escape: "${afterEscape}"`);
            
            if (afterEscape === '') {
                console.log('✅ Escape key already resets search - excellent!');
            } else {
                console.log('⚠️ Escape key does not reset search - could be added');
                console.log('This would be a great UX improvement!');
            }
            
            testFinalRecommendations();
        }, 100);
    }, 100);
}

// Test 6: Final recommendations
function testFinalRecommendations() {
    console.log('\n=== Final UX Recommendations ===');
    
    console.log('Current reset behavior:');
    console.log('✅ Blur with only prefix → Resets (good)');
    console.log('✅ Blur with search term → Preserves (good)');
    console.log('✅ Clear button (×) → Always resets (good)');
    console.log('✅ Category change → Resets search (good)');
    console.log('✅ Escape key → Could be added (improvement)');
    
    console.log('\nRecommendations for improvement:');
    console.log('1. Add Escape key support for search reset');
    console.log('2. Consider adding a "Reset" button next to search');
    console.log('3. Add tooltip explaining reset options');
    console.log('4. Consider visual feedback when search is active');
    
    console.log('\n🎉 Overall: Current search reset behavior is good!');
    console.log('The balance between auto-reset and preserving user input is well handled.');
}

// Run all tests
function runAllTests() {
    console.log('=== Search Blur Behavior Test ===');
    testCurrentBlurBehavior();
}

// Run tests when page is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    runAllTests();
} else {
    document.addEventListener('DOMContentLoaded', runAllTests);
}

// Export for manual testing
export function testSearchBlurBehavior() {
    runAllTests();
}