// Font Similarity Database
// Maps well-known fonts to their Google Fonts equivalents

const fontSimilarityDB = {
    // Serif fonts
    'Georgia': ['Gelasio', 'EB Garamond', 'Cormorant Garamond'],
    'Times New Roman': ['Times New Roman', 'Lora', 'PT Serif'],
    'Garamond': ['EB Garamond', 'Cormorant Garamond', 'Gelasio'],
    'Baskerville': ['Libre Baskerville', 'Cormorant Garamond'],
    'Palatino': ['PT Serif', 'Lora', 'Cormorant Garamond'],
    'Didot': ['Cormorant Garamond', 'PT Serif'],
    'Bodoni': ['Libre Bodoni', 'Cormorant Garamond'],
    'Caslon': ['Libre Caslon Text', 'Cormorant Garamond'],
    
    // Sans Serif fonts
    'Helvetica': ['Roboto', 'Noto Sans', 'Open Sans'],
    'Arial': ['Arimo', 'Roboto', 'Noto Sans'],
    'Verdana': ['Open Sans', 'Roboto', 'Noto Sans'],
    'Futura': ['Montserrat', 'Noto Sans', 'Roboto'],
    'Gill Sans': ['Gill Sans Nova', 'Open Sans'],
    'Univers': ['Noto Sans', 'Roboto'],
    'Frutiger': ['Open Sans', 'Roboto'],
    
    // Display fonts
    'Bauhaus': ['Bauhaus 93', 'Archivo Black'],
    'Impact': ['Bebas Neue', 'Anton'],
    'Cooper Black': ['Black Ops One', 'Anton'],
    'Bodoni': ['Libre Bodoni', 'Cormorant Garamond'],
    
    // Monospace fonts
    'Courier': ['Courier Prime', 'Roboto Mono'],
    'Consolas': ['Roboto Mono', 'Source Code Pro'],
    'Lucida Console': ['Roboto Mono', 'Inconsolata'],
    
    // Script fonts
    'Brush Script': ['Brush Script MT', 'Pacifico'],
    'Lobster': ['Lobster', 'Pacifico'],
    'Bilbo': ['Bilbo Swash Caps', 'Pacifico'],
    
    // Other popular fonts
    'Comic Sans MS': ['Comic Neue', 'Fredoka One'],
    'Papyrus': ['Papyrus', 'Pacifico'],
    'Trajan': ['Cinzel', 'Cormorant Garamond'],
    'Baskerville Old Face': ['Libre Baskerville', 'Cormorant Garamond'],
    'Gotham': ['Montserrat', 'Roboto']
};

// Export the database
export default fontSimilarityDB;