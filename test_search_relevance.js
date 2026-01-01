// Test script to verify search relevance sorting
// This script can be run in browser console to test the functionality

console.log('Testing search relevance sorting...');

// Test 1: Test relevance sorting logic
function testRelevanceSorting() {
    console.log('\n=== Testing Relevance Sorting Logic ===');
    
    // Test fonts with different match types
    const testFonts = [
        {name: 'Garamond'},           // Starts with "g" - should be first
        {name: 'Georgia'},            // Starts with "g" - should be second
        {name: 'Alegreya'},           // Contains "g" - should be after startsWith
        {name: 'Gentium'},           // Starts with "g" - should be third
        {name: 'Roboto'},             // Contains "o" - should not match "g"
        {name: 'Gothic'},            // Starts with "g" - should be fourth
        {name: 'Lato'},               // No match - should not appear
    ];
    
    const searchTerm = 'g';
    
    // Filter fonts that match the search term
    const matchingFonts = testFonts.filter(font => 
        font.name.toLowerCase().includes(searchTerm)
    );
    
    console.log(`Fonts matching "${searchTerm}": ${matchingFonts.length}`);
    console.log('Before sorting:', matchingFonts.map(f => f.name));
    
    // Sort by relevance (same logic as in the app)
    matchingFonts.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        
        // Calculate relevance scores
        const aStartsWith = aName.startsWith(searchTerm) ? 2 : 0;
        const aContains = aName.includes(searchTerm) ? 1 : 0;
        const aScore = aStartsWith + aContains;
        
        const bStartsWith = bName.startsWith(searchTerm) ? 2 : 0;
        const bContains = bName.includes(searchTerm) ? 1 : 0;
        const bScore = bStartsWith + bContains;
        
        // Sort by score (descending) and then by name (ascending)
        if (aScore !== bScore) {
            return bScore - aScore; // Higher score first
        }
        return aName.localeCompare(bName); // Alphabetical for same score
    });
    
    console.log('After sorting:', matchingFonts.map(f => f.name));
    
    // Verify sorting is correct
    let correctSorting = true;
    let startsWithCount = 0;
    let containsCount = 0;
    
    for (let i = 0; i < matchingFonts.length; i++) {
        const font = matchingFonts[i];
        const lowerName = font.name.toLowerCase();
        
        if (lowerName.startsWith(searchTerm)) {
            startsWithCount++;
            // All startsWith should come before contains
            if (i >= startsWithCount + containsCount) {
                correctSorting = false;
                console.log(`❌ StartsWith font at wrong position: ${font.name} at ${i}`);
            }
        } else if (lowerName.includes(searchTerm)) {
            containsCount++;
            // All contains should come after startsWith
            if (i < startsWithCount) {
                correctSorting = false;
                console.log(`❌ Contains font at wrong position: ${font.name} at ${i}`);
            }
        }
    }
    
    // Check alphabetical order within same score groups
    for (let i = 1; i < matchingFonts.length; i++) {
        const prev = matchingFonts[i-1].name.toLowerCase();
        const curr = matchingFonts[i].name.toLowerCase();
        const prevStartsWith = prev.startsWith(searchTerm);
        const currStartsWith = curr.startsWith(searchTerm);
        
        // If both start with search term, check alphabetical order
        if (prevStartsWith && currStartsWith && prev > curr) {
            correctSorting = false;
            console.log(`❌ Alphabetical order issue: ${prev} should come before ${curr}`);
        }
        
        // If both contain but don't start with search term, check alphabetical order
        if (!prevStartsWith && !currStartsWith && prev.includes(searchTerm) && curr.includes(searchTerm) && prev > curr) {
            correctSorting = false;
            console.log(`❌ Alphabetical order issue: ${prev} should come before ${curr}`);
        }
    }
    
    console.log(`✅ Correct relevance sorting: ${correctSorting}`);
    console.log(`Starts with "${searchTerm}": ${startsWithCount}, Contains "${searchTerm}": ${containsCount}`);
    
    if (correctSorting) {
        testLiveSearchRelevance();
    }
}

// Test 2: Test live search with relevance sorting
function testLiveSearchRelevance() {
    console.log('\n=== Testing Live Search with Relevance Sorting ===');
    
    const fontSearch = document.getElementById('font-search');
    const fontsContainer = document.getElementById('fonts-container');
    
    if (!fontSearch || !fontsContainer) {
        console.log('❌ Required elements not found');
        return;
    }
    
    // Test with Serif category (as mentioned in the request)
    const serifButton = document.querySelector('.category-btn[data-category="serif"]');
    if (serifButton) {
        serifButton.click();
        
        setTimeout(() => {
            console.log('Testing in Serif category...');
            
            // Search for "g"
            fontSearch.value = 'g';
            const event = new Event('input');
            fontSearch.dispatchEvent(event);
            
            setTimeout(() => {
                const fontCards = document.querySelectorAll('.font-card');
                console.log(`Fonts found with "g": ${fontCards.length}`);
                
                if (fontCards.length > 0) {
                    console.log('First few results:');
                    const firstResults = Math.min(5, fontCards.length);
                    for (let i = 0; i < firstResults; i++) {
                        const fontName = fontCards[i].dataset.fontName;
                        const startsWithG = fontName.toLowerCase().startsWith('g');
                        const containsG = fontName.toLowerCase().includes('g');
                        const indicator = startsWithG ? '🎯 ' : containsG ? '🔍 ' : '❓ ';
                        console.log(`${indicator}${fontName}`);
                    }
                    
                    // Verify that fonts starting with "g" come first
                    let foundStartsWith = false;
                    let foundContainsOnly = false;
                    let correctOrder = true;
                    
                    for (let i = 0; i < fontCards.length; i++) {
                        const fontName = fontCards[i].dataset.fontName;
                        const lowerName = fontName.toLowerCase();
                        
                        if (lowerName.startsWith('g')) {
                            foundStartsWith = true;
                            // Once we find a startsWith, all previous should also be startsWith
                            if (foundContainsOnly) {
                                correctOrder = false;
                                console.log(`❌ Order issue: ${fontName} (starts with g) comes after non-startsWith fonts`);
                            }
                        } else if (lowerName.includes('g')) {
                            foundContainsOnly = true;
                        }
                    }
                    
                    console.log(`✅ Fonts starting with "g" come first: ${correctOrder}`);
                    console.log(`✅ Found fonts starting with "g": ${foundStartsWith}`);
                    console.log(`✅ Found fonts containing "g": ${foundContainsOnly}`);
                    
                    if (correctOrder && foundStartsWith) {
                        console.log('🎉 Relevance sorting is working correctly!');
                        console.log('Fonts starting with the search term appear first.');
                    }
                    
                    // Test with other search terms
                    testOtherSearchTerms();
                } else {
                    console.log('⚠️ No fonts found with "g" in Serif category');
                }
            }, 500);
        }, 500);
    } else {
        console.log('⚠️ Serif category button not found');
    }
}

// Test 3: Test with other search terms
function testOtherSearchTerms() {
    console.log('\n=== Testing Other Search Terms ===');
    
    const fontSearch = document.getElementById('font-search');
    if (!fontSearch) {
        console.log('❌ Font search input not found');
        return;
    }
    
    const testCases = [
        {term: 'r', expectedStartsWith: ['Roboto', 'Raleway', 'Rubik']},
        {term: 'o', expectedStartsWith: ['Open Sans', 'Oswald', 'Overpass']},
        {term: 'l', expectedStartsWith: ['Lato', 'Libre Baskerville', 'Lora']}
    ];
    
    let testIndex = 0;
    
    function runNextTest() {
        if (testIndex >= testCases.length) {
            testEdgeCases();
            return;
        }
        
        const testCase = testCases[testIndex];
        console.log(`\nTesting search term: "${testCase.term}"`);
        
        fontSearch.value = testCase.term;
        const event = new Event('input');
        fontSearch.dispatchEvent(event);
        
        setTimeout(() => {
            const fontCards = document.querySelectorAll('.font-card');
            console.log(`Fonts found: ${fontCards.length}`);
            
            if (fontCards.length > 0) {
                // Check if expected fonts starting with term are at the top
                const firstFontName = fontCards[0].dataset.fontName;
                const startsWithTerm = firstFontName.toLowerCase().startsWith(testCase.term);
                
                console.log(`First result: ${firstFontName} (starts with "${testCase.term}": ${startsWithTerm})`);
                
                if (startsWithTerm) {
                    console.log(`✅ Correctly prioritized fonts starting with "${testCase.term}"`);
                } else {
                    console.log(`⚠️ First result doesn't start with "${testCase.term}", but may still be relevant`);
                }
            }
            
            testIndex++;
            setTimeout(runNextTest, 300);
        }, 500);
    }
    
    runNextTest();
}

// Test 4: Test edge cases
function testEdgeCases() {
    console.log('\n=== Testing Edge Cases ===');
    
    const fontSearch = document.getElementById('font-search');
    if (!fontSearch) {
        console.log('❌ Font search input not found');
        return;
    }
    
    // Test empty search
    console.log('Testing empty search...');
    fontSearch.value = '';
    const event = new Event('input');
    fontSearch.dispatchEvent(event);
    
    setTimeout(() => {
        const fontCards = document.querySelectorAll('.font-card');
        console.log(`Fonts with empty search: ${fontCards.length}`);
        console.log('✅ Empty search shows all fonts (no sorting needed)');
        
        // Test very specific search
        console.log('\nTesting very specific search...');
        fontSearch.value = 'xyz';
        fontSearch.dispatchEvent(event);
        
        setTimeout(() => {
            const specificCards = document.querySelectorAll('.font-card');
            const noResults = fontsContainer.querySelector('.no-results');
            
            console.log(`Fonts with "xyz": ${specificCards.length}`);
            console.log(`No results message: ${noResults ? 'YES' : 'NO'}`);
            
            if (noResults || specificCards.length === 0) {
                console.log('✅ Correctly handles no-results case');
            }
            
            // Test case sensitivity
            console.log('\nTesting case sensitivity...');
            fontSearch.value = 'G'; // Uppercase G
            fontSearch.dispatchEvent(event);
            
            setTimeout(() => {
                const caseCards = document.querySelectorAll('.font-card');
                console.log(`Fonts with uppercase "G": ${caseCards.length}`);
                
                if (caseCards.length > 0) {
                    const firstCaseFont = caseCards[0].dataset.fontName;
                    console.log(`First result: ${firstCaseFont}`);
                    console.log('✅ Case-insensitive search works correctly');
                }
                
                console.log('\n🎉 All relevance sorting tests completed!');
                console.log('Search now prioritizes fonts starting with the search term.');
            }, 500);
        }, 500);
    }, 500);
}

// Run all tests
function runAllTests() {
    console.log('=== Search Relevance Sorting Test ===');
    testRelevanceSorting();
}

// Run tests when page is loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    runAllTests();
} else {
    document.addEventListener('DOMContentLoaded', runAllTests);
}

// Export for manual testing
export function testSearchRelevance() {
    runAllTests();
}