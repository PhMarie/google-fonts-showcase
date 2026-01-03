# 🛠️ Card Tags Troubleshooting Guide

## Understanding the Problem

The card tags (font category tags) keep breaking, which means they either:
- Don't display at all
- Show incorrect content
- Have wrong styling
- Are invisible/hidden

## Common Causes

### 1. CSS Specificity Issues
- Other CSS rules overriding card tag styles
- !important rules conflicting
- Browser-specific CSS issues

### 2. JavaScript Issues
- Dynamic content not loading properly
- JavaScript errors preventing card generation
- Race conditions in loading

### 3. HTML Structure Issues
- Incorrect class names
- Missing data attributes
- Malformed HTML

### 4. Caching Issues
- Browser caching old styles
- CDN caching issues
- Service worker caching

## Step-by-Step Troubleshooting

### Step 1: Check if Card Tags Exist in HTML

```javascript
// Open browser console and run:
document.querySelectorAll('.font-category').length
// Should return number > 0 if cards exist
```

### Step 2: Check Card Tag Visibility

```javascript
// Check if cards are visible:
const cards = document.querySelectorAll('.font-category');
cards.forEach(card => {
    console.log('Card:', card.textContent, 'Visible:', window.getComputedStyle(card).visibility);
});
```

### Step 3: Check Computed Styles

```javascript
// Check actual applied styles:
const card = document.querySelector('.font-category');
if (card) {
    console.log('Computed styles:', window.getComputedStyle(card));
} else {
    console.log('No card tags found!');
}
```

### Step 4: Check for JavaScript Errors

```javascript
// Open console and look for errors
// Check if font cards are being generated properly
```

## Quick Fixes

### Fix 1: Force Refresh

```bash
# Clear browser cache and hard refresh
Ctrl + F5 (Windows) or Cmd + Shift + R (Mac)
```

### Fix 2: Restore from Backup

```bash
# Copy from backup file
cp CARD_TAGS_STABLE_BACKUP.css styles.css
```

### Fix 3: Add Debugging Outline

```css
/* Add to styles.css temporarily */
.font-category {
    outline: 2px solid red !important;
}
```

## Prevention Strategies

### 1. Use CSS !important Sparingly
- Only use for critical properties
- Document why !important is needed

### 2. Add Protective Rules
```css
/* Add these to prevent overriding */
body .font-category,
.font-card .font-category {
    display: inline-block !important;
    visibility: visible !important;
    opacity: 1 !important;
}
```

### 3. Create Backup Files
- Keep stable backup of working styles
- Document changes in commit messages

### 4. Add Automated Tests
```bash
# Run verification script
python3 verify_card_tags.py
```

## Common Solutions

### Solution 1: Simplified CSS
```css
/* Use minimal, robust CSS */
.font-category {
    display: inline-block;
    padding: 4px 12px;
    background-color: #e8f0fe;
    color: #4285F4;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 15px;
}
```

### Solution 2: Add Fallback Content
```css
/* If content missing, show data attribute */
.font-category:empty::before {
    content: attr(data-fallback-category);
}
```

### Solution 3: Debugging Helpers
```css
/* Add outline to debug */
.font-category {
    outline: 1px dashed #4285F4;
}
```

## Verification Checklist

- [ ] Card tags exist in HTML (`document.querySelectorAll('.font-category').length > 0`)
- [ ] Card tags are visible (`visibility: visible`)
- [ ] Card tags have correct background color (`#e8f0fe`)
- [ ] Card tags have correct text color (`#4285F4`)
- [ ] Card tags have proper padding (`4px 12px`)
- [ ] Card tags have border radius (`15px`)
- [ ] Dark theme works correctly

## Emergency Recovery

If card tags break again:

1. **Check console for errors**
2. **Run verification script**: `python3 verify_card_tags.py`
3. **Restore from backup**: Copy from `CARD_TAGS_STABLE_BACKUP.css`
4. **Clear cache**: Hard refresh browser
5. **Check computed styles**: Use browser dev tools

## Contact Support

If issues persist after trying all solutions:
- Check GitHub issues for similar problems
- Review recent commits for changes
- Contact repository maintainer

## Final Notes

The card tags should now be stable with:
- Protective CSS rules
- Backup file available
- Verification script
- Troubleshooting guide

**Status**: ✅ **STABILIZED WITH PROTECTIVE MEASURES**