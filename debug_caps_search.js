// Debug script to diagnose CAPS search issue
// This script can be run in browser console to debug the search functionality

console.log('Debugging CAPS search issue...');

// Test 1: Check if we're in CAPS category
function checkCAPSCategory() {
    console.log('\n=== Checking CAPS Category ===');
    
    const capsButton = document.querySelector('.category-btn[data-category="caps"]');
    if (!capsButton) {
        console.log('❌ CAPS category button not found');
        return false;
    }
    
    // Click CAPS button to ensure we're in CAPS category
    capsButton.click();
    
    setTimeout(() => {
        const isCAPSCategory = currentCategory === 'caps';
        console.log(`Current category is CAPS: ${isCAPSCategory}`);
        
        if (isCAPSCategory) {
            testSearchLogic();
        } else {
            console.log('❌ Not in CAPS category');
        }
    }, 500);
    
    return true;
}

// Test 2: Test search logic manually
function testSearchLogic() {
    console.log('\n=== Testing Search Logic ===');
    
    // Get all fonts
    console.log(`Total fonts loaded: ${allFonts.length}`);
    
    // Test CAPS filtering
    const trulyAllCaps = [
        'Aboreto', 'Alegreya SC', 'Alegreya Sans SC', 'Almendra SC',
        'Amatic SC', 'Bowlby One SC', 'Bruno Ace SC',
        'Carrois Gothic SC', 'Cormorant SC', 'Diplomata SC',
        'Encode Sans SC', 'Graduate', 'Holtwood One SC',
        'IM Fell DW Pica SC', 'IM Fell Double Pica SC', 'IM Fell English SC',
        'IM Fell French Canon SC', 'IM Fell Great Primer SC', 'Marcellus SC',
        'Mate SC', 'Monoton', 'Overlock SC', 'Patrick Hand SC', 'Playfair Display SC',
        'Six Caps', 'Spectral SC', 'Shojumaru', 'Vollkorn SC', 'Ysabeau SC'
    ];
    
    // Filter CAPS fonts manually
    const capsFonts = allFonts.filter(font => {
        const hasSCorCaps = /\b(SC|Caps)\b/i.test(font.name);
        const scExceptions = [
            'Noto Sans SC', 'Noto Serif SC',
            'Macondo Swash Caps', 'Oleo Script Swash Caps',
            'Bilbo Swash Caps', 'Delius Swash Caps', 'Elsie Swash Caps'
        ];
        const isSCFont = hasSCorCaps && !scExceptions.includes(font.name);
        return trulyAllCaps.includes(font.name) || isSCFont;
    });
    
    console.log(`CAPS fonts found: ${capsFonts.length}`);
    console.log('CAPS fonts:', capsFonts.map(f => f.name));
    
    // Test search for "al"
    const searchTerm = 'al';
    const matchingFonts = capsFonts.filter(font => 
        font.name.toLowerCase().includes(searchTerm)
    );
    
    console.log(`\nFonts matching "${searchTerm}": ${matchingFonts.length}`);
    console.log('Matching fonts:', matchingFonts.map(f => f.name));
    
    testLiveSearch();
}

// Test 3: Test live search functionality
function testLiveSearch() {
    console.log('\n=== Testing Live Search ===');
    
    const fontSearch = document.getElementById('font-search');
    if (!fontSearch) {
        console.log('❌ Font search input not found');
        return;
    }
    
    // Clear search
    fontSearch.value = '';
    
    // Trigger input event to show all CAPS fonts
    const event = new Event('input');
    fontSearch.dispatchEvent(event);
    
    setTimeout(() => {
        const fontCards = document.querySelectorAll('.font-card');
        console.log(`Fonts displayed (no search): ${fontCards.length}`);
        
        // Now search for "al"
        fontSearch.value = 'al';
        fontSearch.dispatchEvent(event);
        
        setTimeout(() => {
            const filteredCards = document.querySelectorAll('.font-card');
            console.log(`Fonts displayed (search "al"): ${filteredCards.length}`);
            
            if (filteredCards.length > 0) {
                console.log('Displayed fonts:');
                filteredCards.forEach(card => {
                    console.log(`- ${card.dataset.fontName}`);
                });
            } else {
                console.log('❌ No fonts displayed for search "al"');
                debugFilteringLogic();
            }
        }, 500);
    }, 500);
}

// Test 4: Debug filtering logic step by step
function debugFilteringLogic() {
    console.log('\n=== Debugging Filtering Logic ===');
    
    // Get current search term
    const fontSearch = document.getElementById('font-search');
    const searchValue = fontSearch.value;
    console.log(`Current search value: "${searchValue}"`);
    
    // Simulate the exact filtering logic from displayFonts
    const fullSearchValue = searchValue;
    let searchTerm = fullSearchValue.toLowerCase();
    
    // Extract search term (same logic as in displayFonts)
    const colonIndex = fullSearchValue.indexOf(':');
    if (colonIndex !== -1) {
        searchTerm = fullSearchValue.substring(colonIndex + 1).trim().toLowerCase();
    }
    
    console.log(`Extracted search term: "${searchTerm}"`);
    
    // Test filtering with current category
    const trulyAllCaps = [
        'Aboreto', 'Alegreya SC', 'Alegreya Sans SC', 'Almendra SC',
        'Amatic SC', 'Bowlby One SC', 'Bruno Ace SC',
        'Carrois Gothic SC', 'Cormorant SC', 'Diplomata SC',
        'Encode Sans SC', 'Graduate', 'Holtwood One SC',
        'IM Fell DW Pica SC', 'IM Fell Double Pica SC', 'IM Fell English SC',
        'IM Fell French Canon SC', 'IM Fell Great Primer SC', 'Marcellus SC',
        'Mate SC', 'Monoton', 'Overlock SC', 'Patrick Hand SC', 'Playfair Display SC',
        'Six Caps', 'Spectral SC', 'Shojumaru', 'Vollkorn SC', 'Ysabeau SC'
    ];
    
    // Filter fonts step by step
    let filteredFonts = allFonts.filter(font => {
        // Step 1: Filter by CAPS category
        if (currentCategory === 'caps') {
            const hasSCorCaps = /\b(SC|Caps)\b/i.test(font.name);
            const scExceptions = [
                'Noto Sans SC', 'Noto Serif SC',
                'Macondo Swash Caps', 'Oleo Script Swash Caps',
                'Bilbo Swash Caps', 'Delius Swash Caps', 'Elsie Swash Caps'
            ];
            const isSCFont = hasSCorCaps && !scExceptions.includes(font.name);
            const isCAPS = trulyAllCaps.includes(font.name) || isSCFont;
            
            if (!isCAPS) {
                console.log(`Filtered out (not CAPS): ${font.name}`);
                return false;
            }
        }
        
        // Step 2: Filter by search term
        if (searchTerm && !font.name.toLowerCase().includes(searchTerm)) {
            console.log(`Filtered out (doesn't match "${searchTerm}"): ${font.name}`);
            return false;
        }
        
        console.log(`Passed all filters: ${font.name}`);
        return true;
    });
    
    console.log(`\nFinal filtered fonts: ${filteredFonts.length}`);
    if (filteredFonts.length > 0) {
        console.log('Final fonts:');
        filteredFonts.forEach(font => {
            console.log(`- ${font.name}`);
        });
    }
    
    checkDisplayLogic();
}

// Test 5: Check if fonts are actually displayed
function checkDisplayLogic() {
    console.log('\n=== Checking Display Logic ===');
    
    const fontsContainer = document.getElementById('fonts-container');
    if (!fontsContainer) {
        console.log('❌ Fonts container not found');
        return;
    }
    
    const fontCards = document.querySelectorAll('.font-card');
    const noResults = fontsContainer.querySelector('.no-results');
    
    console.log(`Font cards in DOM: ${fontCards.length}`);
    console.log(`No results message: ${noResults ? 'YES' : 'NO'}`);
    
    if (noResults) {
        console.log('No results message:', noResults.textContent);
    }
    
    // Check if fonts are actually in the DOM
    if (fontCards.length === 0 && !noResults) {
        console.log('⚠️ No fonts and no "no results" message - display issue');
    } else if (fontCards.length === 0 && noResults) {
        console.log('✅ Correctly showing "no results" message');
    } else {
        console.log('✅ Fonts are displayed correctly');
    }
}

// Run all debug tests
function runDebug() {
    console.log('=== CAPS Search Debug ===');
    checkCAPSCategory();
}

// Run debug when page is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    runDebug();
} else {
    document.addEventListener('DOMContentLoaded', runDebug);
}

// Export for manual testing
export function debugCAPSSearch() {
    runDebug();
}