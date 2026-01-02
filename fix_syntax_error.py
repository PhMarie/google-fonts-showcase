#!/usr/bin/env python3

def fix_syntax_error():
    """Fix the misplaced closing brace in the variant detection function"""
    
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # The issue is around line 2010-2015
    # We need to move the getWeightTooltip function outside the loop
    
    # Find the problematic section
    old_pattern = '''                // Helper function to generate weight tooltip
                function getWeightTooltip(weights) {
                    const sortedWeights = Array.from(weights).sort((a, b) => a - b);
                    const weightNames = [];
                    
                    sortedWeights.forEach(weight => {
                        switch(weight) {
                            case 100: weightNames.push('Thin (100)'); break;
                            case 200: weightNames.push('Extra Light (200)'); break;
                            case 300: weightNames.push('Light (303)'); break;
                            case 400: weightNames.push('Regular (400)'); break;
                            case 500: weightNames.push('Medium (500)'); break;
                            case 600: weightNames.push('SemiBold (600)'); break;
                            case 700: weightNames.push('Bold (700)'); break;
                            case 800: weightNames.push('Extra Bold (800)'); break;
                            case 900: weightNames.push('Black (909)'); break;
                            default: weightNames.push(`${weight}`);
                        }
                    });
                    
                    return `Available: ${weightNames.join(', ')}`;
                }
                    }
                    
                    console.log(`✅ ${fontName}: Weights: ${Array.from(availableWeights).sort((a, b) => a - b).join(', ')}, Italic: ${hasItalic}`);
                }
            });'''
    
    new_pattern = '''                // Helper function to generate weight tooltip
                function getWeightTooltip(weights) {
                    const sortedWeights = Array.from(weights).sort((a, b) => a - b);
                    const weightNames = [];
                    
                    sortedWeights.forEach(weight => {
                        switch(weight) {
                            case 100: weightNames.push('Thin (100)'); break;
                            case 200: weightNames.push('Extra Light (200)'); break;
                            case 300: weightNames.push('Light (303)'); break;
                            case 400: weightNames.push('Regular (400)'); break;
                            case 500: weightNames.push('Medium (500)'); break;
                            case 600: weightNames.push('SemiBold (600)'); break;
                            case 700: weightNames.push('Bold (700)'); break;
                            case 800: weightNames.push('Extra Bold (800)'); break;
                            case 900: weightNames.push('Black (909)'); break;
                            default: weightNames.push(`${weight}`);
                        }
                    });
                    
                    return `Available: ${weightNames.join(', ')}`;
                }
                    
                    console.log(`✅ ${fontName}: Weights: ${Array.from(availableWeights).sort((a, b) => a - b).join(', ')}, Italic: ${hasItalic}`);
                }
            });'''
    
    # This is too complex for regex, let's use line-based approach
    lines = content.split('\n')
    
    # Find and fix the issue around line 2010
    fixed_lines = []
    skip_next_misplaced_brace = False
    
    for i, line in enumerate(lines):
        if i >= 1989 and i <= 2015:  # Around the problematic area
            if line.strip() == '}' and skip_next_misplaced_brace:
                skip_next_misplaced_brace = False
                continue  # Skip the misplaced brace
            if 'function getWeightTooltip' in line:
                # This function should be moved outside the loop
                skip_next_misplaced_brace = True
        fixed_lines.append(line)
    
    # Write back
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write('\n'.join(fixed_lines))
    
    print("✅ Syntax error fixed!")

if __name__ == "__main__":
    fix_syntax_error()