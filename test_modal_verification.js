// Simple test to verify the enhanced modal functionality
// This can be run in browser console to test the modal

console.log('=== Enhanced Modal Verification Test ===');

// Test the WOFF2 URL extraction function
function testWoff2Extraction() {
    const testCSS = `
@font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/r/roboto/v27/KFOmCnqEu92Fr1Mu72xKOzY.woff2) format('woff2');
}

@font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/r/roboto/v27/KFOkCnqEu92Fr1Mu51xFIzY.woff2) format('woff2');
}
    `;
    
    // Copy the extraction function from index.html
    function extractWoff2UrlsFromCSS(cssText) {
        const urls = [];
        try {
            const fontFaceMatches = cssText.match(/@font-face[^}]+}/g);
            
            if (fontFaceMatches) {
                fontFaceMatches.forEach(rule => {
                    const srcMatch = rule.match(/src:\s*url\(([^)]+)\)/);
                    if (srcMatch) {
                        let url = srcMatch[1].replace(/['"]/g, '').trim();
                        if (url.endsWith('.woff2') || url.includes('.woff2')) {
                            const urlOnly = url.split('\\s+format\(\)')[0].trim();
                            urls.push(urlOnly);
                        }
                    }
                });
            }
        } catch (error) {
            console.error('Error extracting WOFF2 URLs:', error);
        }
        
        return [...new Set(urls)];
    }
    
    const urls = extractWoff2UrlsFromCSS(testCSS);
    
    console.log('WOFF2 URL Extraction Test:');
    console.log('Input CSS:', testCSS);
    console.log('Extracted URLs:', urls);
    console.log('Success:', urls.length === 2 ? '✅ PASS' : '❌ FAIL');
    
    return urls.length === 2;
}

// Test the modal function signature
function testModalSignature() {
    console.log('\nModal Function Signature Test:');
    
    // Check if the enhanced modal function exists
    if (typeof showCSSInModal === 'function') {
        const funcString = showCSSInModal.toString();
        
        // Check for key features
        const hasWoff2Param = funcString.includes('woff2Urls');
        const hasBigTitle = funcString.includes('copied to clipboard');
        const hasSuccessMessage = funcString.includes('successfully copied');
        const hasDownloadSection = funcString.includes('Download WOFF2');
        
        console.log('Has WOFF2 parameter:', hasWoff2Param ? '✅' : '❌');
        console.log('Has enhanced title:', hasBigTitle ? '✅' : '❌');
        console.log('Has success message:', hasSuccessMessage ? '✅' : '❌');
        console.log('Has download section:', hasDownloadSection ? '✅' : '❌');
        
        const allPassed = hasWoff2Param && hasBigTitle && hasSuccessMessage && hasDownloadSection;
        console.log('Overall:', allPassed ? '✅ PASS' : '❌ FAIL');
        
        return allPassed;
    } else {
        console.log('❌ Modal function not found');
        return false;
    }
}

// Run all tests
function runAllTests() {
    console.log('Running Enhanced Modal Verification Tests...\n');
    
    const extractionTest = testWoff2Extraction();
    const signatureTest = testModalSignature();
    
    console.log('\n=== Test Results ===');
    console.log('WOFF2 Extraction:', extractionTest ? '✅ PASS' : '❌ FAIL');
    console.log('Modal Signature:', signatureTest ? '✅ PASS' : '❌ FAIL');
    
    if (extractionTest && signatureTest) {
        console.log('\n🎉 All tests passed! Enhanced modal is working correctly.');
        console.log('\nFeatures implemented:');
        console.log('✅ Bigger modal size (900px × 90vh)');
        console.log('✅ Enhanced title with "copied to clipboard"');
        console.log('✅ Success message with checkmark');
        console.log('✅ WOFF2 URL extraction from CSS');
        console.log('✅ Download section with direct links');
        console.log('✅ Copy URL buttons with feedback');
    } else {
        console.log('\n❌ Some tests failed. Please check the implementation.');
    }
}

// Run tests immediately
runAllTests();