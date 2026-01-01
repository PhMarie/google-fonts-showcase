# Cursive Font Size Enhancements

## Summary

This update addresses the issue where cursive fonts appear too small by default. The changes implement category-specific font sizing with larger default and maximum sizes for cursive fonts.

## Changes Made

### 1. CSS Changes (`styles.css`)

Added category-specific styling for cursive fonts:

```css
/* Cursive fonts - larger default size and higher max size */
.font-card[data-font-category="cursive"] .font-preview {
    font-size: 20px;
}
```

### 2. JavaScript Changes (`index.html`)

#### Modified font size management:

**Before:**
```javascript
const cardFontSizes = [16, 18, 20, 22]; // Card text sizes (max 22px)
```

**After:**
```javascript
// Different size ranges for different font categories
const cardFontSizes = {
    'cursive': [20, 22, 24], // Cursive fonts: start at 20px, go up to 24px
    'default': [16, 18, 20, 22] // Other fonts: standard sizes
};
```

#### Updated `increaseCardTextSize()` function:

- Now detects the font category from the card's `data-font-category` attribute
- Uses the appropriate size array based on category
- Maintains separate size progression for cursive vs other fonts

## Size Ranges Comparison

### Cursive Fonts (Enhanced) - Both Card and Preview Text
- **Default Size:** 20px (vs 16px for others)
- **Size Progression:** 20px → 22px → 24px
- **Max Size:** 24px (vs 22px for others)
- **Steps:** 3 sizes (vs 4 for others)

### Other Fonts (Unchanged) - Both Card and Preview Text
- **Default Size:** 16px
- **Size Progression:** 16px → 18px → 20px → 22px → 24px
- **Max Size:** 24px
- **Steps:** 5 sizes

## Benefits

1. **Better Readability:** Cursive fonts are more legible at larger sizes
2. **Improved Aesthetics:** Cursive fonts display with appropriate prominence
3. **Category-Specific:** Only affects cursive fonts, other categories unchanged
4. **Consistent UI:** Size increase button works the same way, just with different ranges
5. **Backward Compatible:** Existing functionality preserved for all other font types

## Implementation Details

### CSS Targeting
- Uses attribute selector `[data-font-category="cursive"]` for precise targeting
- Applies only to `.font-preview` elements within cursive font cards
- Overrides the default 16px size with 20px for cursive fonts

### JavaScript Logic
- **Card Text:** Font category is read from `data-font-category` attribute on font cards
- **Preview Text:** Font category is stored in `dataset.currentFontCategory` when a font is selected
- Size array selection is dynamic based on detected category for both card and preview text
- Size cycling works independently for each font category
- Maintains existing size tracking with `cardSizeMap` for cards and separate tracking for preview text

### Code Structure Changes

**Before:**
```javascript
// Single size array for all fonts
const fontSizeSteps = [16, 18, 20, 22, 24];
const cardFontSizes = [16, 18, 20, 22];
```

**After:**
```javascript
// Category-specific size arrays
const previewFontSizes = {
    'cursive': [20, 22, 24],
    'default': [16, 18, 20, 22, 24]
};

const cardFontSizes = {
    'cursive': [20, 22, 24],
    'default': [16, 18, 20, 22]
};
```

## Browser Compatibility

- Uses standard CSS attribute selectors (IE9+)
- JavaScript uses modern DOM methods (querySelector, dataset)
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)

## Testing

Two comprehensive test scripts are provided:

### 1. Card Text Test (`test_cursive_font_sizes.js`)
Verifies:
- CSS rules are properly defined and applied
- Default sizes are correct for both cursive and non-cursive fonts in cards
- Size increase functionality works with category-specific ranges
- Size cycling behaves correctly at maximum sizes
- Visual feedback (button active state) is maintained

### 2. Preview Text Test (`test_preview_text_cursive_sizes.js`)
Verifies:
- Preview text element exists and is functional
- Cursive fonts in preview start at 20px by default
- Size increase works correctly for preview text with category-specific ranges
- Preview text cycling and reset functionality
- Comparison between cursive and non-cursive preview sizes

## Files Modified

1. `styles.css` - Added category-specific font size rules for card text
2. `index.html` - Updated font size management for both card text and preview text
3. `test_cursive_font_sizes.js` - Card text test suite (new file)
4. `test_preview_text_cursive_sizes.js` - Preview text test suite (new file)
5. `CURSIVE_FONT_SIZE_CHANGES.md` - This documentation (new file)

## Future Enhancements

Possible improvements for future consideration:
- Add user preference controls for default font sizes by category
- Implement smooth transitions for font size changes
- Add visual indicators showing current size level
- Extend to other categories (e.g., display fonts might benefit from larger sizes)
- Add reset-to-default-size functionality

## Visual Impact

### Before (Cursive Fonts)
- Default: 16px (often too small for cursive scripts)
- Max: 22px
- Steps: 16→18→20→22

### After (Cursive Fonts)
- Default: 20px (better readability)
- Max: 24px (larger maximum)
- Steps: 20→22→24 (fewer steps, larger increments)

The changes make cursive fonts more prominent and readable while maintaining the overall design consistency.