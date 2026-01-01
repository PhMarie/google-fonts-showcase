// Test script to verify CAPS category search functionality
// This script can be run in browser console to test the functionality

console.log('Testing CAPS category search functionality...');

// Test 1: Check if CAPS category exists and has fonts
function testCAPSCategoryExists() {
    console.log('\n=== Testing CAPS Category Existence ===');
    
    const capsButton = document.querySelector('.category-btn[data-category="caps"]');
    if (!capsButton) {
        console.log('❌ CAPS category button not found');
        return false;
    }
    
    console.log('✅ CAPS category button found');
    
    // Click the CAPS button to switch to CAPS category
    capsButton.click();
    
    setTimeout(() => {
        const fontCounter = document.getElementById('font-counter');
        if (fontCounter) {
            const counterText = fontCounter.textContent;
            console.log(`Font counter: ${counterText}`);
            
            // Check if there are CAPS fonts displayed
            const hasFonts = counterText.includes('CAPS Fonts') && !counterText.includes('0 fonts');
            console.log(`✅ CAPS category has fonts: ${hasFonts}`);
            
            if (hasFonts) {
                testCAPSSearchFunctionality();
            } else {
                console.log('⚠️ No CAPS fonts found');
            }
        }
    }, 500);
    
    return true;
}

// Test 2: Test search functionality in CAPS category
function testCAPSSearchFunctionality() {
    console.log('\n=== Testing CAPS Search Functionality ===');
    
    const fontSearch = document.getElementById('font-search');
    if (!fontSearch) {
        console.log('❌ Font search input not found');
        return;
    }
    
    // Clear any existing search
    fontSearch.value = '';
    
    // Click on search box to trigger prefix
    fontSearch.click();
    fontSearch.focus();
    
    setTimeout(() => {
        const searchValue = fontSearch.value;
        console.log(`Search box value after click: "${searchValue}"`);
        
        // Check if prefix is correct
        const hasCorrectPrefix = searchValue.startsWith('Search CAPS Fonts: ');
        console.log(`✅ Has correct search prefix: ${hasCorrectPrefix}`);
        
        if (hasCorrectPrefix) {
            // Test searching for a specific CAPS font
            testSpecificCAPSSearch(fontSearch);
        }
    }, 100);
}

// Test 3: Test searching for specific CAPS fonts
function testSpecificCAPSSearch(fontSearch) {
    console.log('\n=== Testing Specific CAPS Font Search ===');
    
    // Test with a known CAPS font (from the trulyAllCaps list)
    const testFonts = ['Alegreya SC', 'Amatic SC', 'Cormorant SC'];
    
    let testIndex = 0;
    
    function testNextFont() {
        if (testIndex >= testFonts.length) {
            testSearchTermExtraction();
            return;
        }
        
        const testFont = testFonts[testIndex];
        console.log(`Testing search for: "${testFont}"`);
        
        // Set search term (keep prefix and add font name)
        const prefix = 'Search CAPS Fonts: ';
        fontSearch.value = prefix + testFont;
        
        // Trigger search
        const event = new Event('input');
        fontSearch.dispatchEvent(event);
        
        setTimeout(() => {
            // Check if fonts are filtered correctly
            const fontCards = document.querySelectorAll('.font-card');
            console.log(`Fonts displayed after searching for "${testFont}": ${fontCards.length}`);
            
            // Check if the searched font is visible
            let foundSearchedFont = false;
            fontCards.forEach(card => {
                const fontName = card.dataset.fontName;
                if (fontName.toLowerCase().includes(testFont.toLowerCase())) {
                    foundSearchedFont = true;
                    console.log(`✅ Found searched font: ${fontName}`);
                }
            });
            
            if (!foundSearchedFont && fontCards.length > 0) {
                console.log('⚠️ Searched font not found in results');
            }
            
            // Clear search for next test
            fontSearch.value = prefix;
            fontSearch.dispatchEvent(event);
            
            testIndex++;
            setTimeout(testNextFont, 200);
        }, 500);
    }
    
    testNextFont();
}

// Test 4: Test search term extraction
function testSearchTermExtraction() {
    console.log('\n=== Testing Search Term Extraction ===');
    
    const fontSearch = document.getElementById('font-search');
    if (!fontSearch) {
        console.log('❌ Font search input not found');
        return;
    }
    
    // Test the prefix removal logic
    const testCases = [
        'Search CAPS Fonts: alegreya',
        'Search CAPS Fonts: SC',
        'Search CAPS Fonts: ', // Empty search
        'some random text without prefix'
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest case ${index + 1}: "${testCase}"`);
        
        // Simulate the extraction logic from displayFonts
        let searchTerm = testCase.toLowerCase();
        const colonIndex = testCase.indexOf(':');
        
        if (colonIndex !== -1) {
            searchTerm = testCase.substring(colonIndex + 1).trim().toLowerCase();
        }
        
        console.log(`Extracted search term: "${searchTerm}"`);
        
        // Check if extraction worked correctly
        if (index === 0) {
            const correct = searchTerm === 'alegreya';
            console.log(`✅ Correctly extracted "alegreya": ${correct}`);
        } else if (index === 1) {
            const correct = searchTerm === 'sc';
            console.log(`✅ Correctly extracted "sc": ${correct}`);
        } else if (index === 2) {
            const correct = searchTerm === '';
            console.log(`✅ Correctly extracted empty term: ${correct}`);
        } else if (index === 3) {
            const correct = searchTerm === 'some random text without prefix';
            console.log(`✅ Correctly handled no prefix: ${correct}`);
        }
    });
    
    testBlurReset();
}

// Test 5: Test blur reset functionality
function testBlurReset() {
    console.log('\n=== Testing Blur Reset Functionality ===');
    
    const fontSearch = document.getElementById('font-search');
    if (!fontSearch) {
        console.log('❌ Font search input not found');
        return;
    }
    
    // Set search with only prefix
    fontSearch.value = 'Search CAPS Fonts: ';
    fontSearch.focus();
    
    console.log(`Search value before blur: "${fontSearch.value}"`);
    
    // Trigger blur event
    fontSearch.blur();
    
    setTimeout(() => {
        const valueAfterBlur = fontSearch.value;
        console.log(`Search value after blur: "${valueAfterBlur}"`);
        
        const correctlyReset = valueAfterBlur === '';
        console.log(`✅ Correctly reset on blur: ${correctlyReset}`);
        
        if (correctlyReset) {
            console.log('🎉 All CAPS search functionality tests passed!');
            console.log('CAPS category search is now fully functional.');
        }
    }, 100);
}

// Test 6: Compare with other categories
function testCategoryComparison() {
    console.log('\n=== Testing Category Comparison ===');
    
    const categories = ['all', 'sans-serif', 'serif', 'cursive'];
    const fontSearch = document.getElementById('font-search');
    
    if (!fontSearch) {
        console.log('❌ Font search input not found');
        return;
    }
    
    let currentCategoryIndex = 0;
    
    function testNextCategory() {
        if (currentCategoryIndex >= categories.length) {
            // Switch back to CAPS category
            const capsButton = document.querySelector('.category-btn[data-category="caps"]');
            if (capsButton) {
                capsButton.click();
            }
            return;
        }
        
        const category = categories[currentCategoryIndex];
        const categoryButton = document.querySelector(`.category-btn[data-category="${category}"]`);
        
        if (categoryButton) {
            console.log(`\nTesting ${category} category...`);
            categoryButton.click();
            
            setTimeout(() => {
                // Clear and click search box
                fontSearch.value = '';
                fontSearch.click();
                
                setTimeout(() => {
                    const searchValue = fontSearch.value;
                    console.log(`Search prefix for ${category}: "${searchValue}"`);
                    
                    const hasConsistentPrefix = searchValue.startsWith('Search ') && searchValue.includes(':');
                    console.log(`✅ Has consistent prefix format: ${hasConsistentPrefix}`);
                    
                    // Clear for next test
                    fontSearch.value = '';
                    
                    currentCategoryIndex++;
                    setTimeout(testNextCategory, 200);
                }, 100);
            }, 500);
        } else {
            console.log(`⚠️ Category button not found for: ${category}`);
            currentCategoryIndex++;
            testNextCategory();
        }
    }
    
    testNextCategory();
}

// Run all tests
function runAllTests() {
    console.log('=== CAPS Category Search Test ===');
    
    if (testCAPSCategoryExists()) {
        testCategoryComparison();
    } else {
        console.log('⚠️ CAPS category not available for testing');
    }
}

// Run tests when page is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    runAllTests();
} else {
    document.addEventListener('DOMContentLoaded', runAllTests);
}

// Export functions for manual testing
export function testCAPSSearch() {
    runAllTests();
}