/**
    Config for Exude component library.
    ---------------------------------------------------------------------------
*/
import { icons } from '../assets'


export default
{
    basis: 
    {
        /**
            String used to help prevent naming collisions.
        */
        namespace: 'apex',
        /**
            Scale time value.
        */
        stime: 100,
        /**
            Scale unit value.
        */
        sunit: 4
    },
    
    animation:
    {      
        /**
            Enumerated CSS animation keyframe definitions.
            
            Define "aliases" using keys that point to other keys.
            
            Internally, the library relies on the following names:
              - `skeletonLoad`: keyframes for skeleton loading animation
        */
        keyframes: 
        {
            spin:
            {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' }
            }          
        },
        /**
            Enumerated CSS animation specifications.
            
            Specify CSS animation property names using camelCase without 
            `animation` prefix.
              
            Define "aliases" using keys that point to other keys.                
        */
        named: {}
    },
    
    background:
    {      
        /**
            Enumerated CSS background specifications.
            
            Specify CSS background property names using camelCase without 
            `background` prefix.
              
            Define "aliases" using keys that point to other keys.                
        */
        named: 
        {
            title: { clip: 'text', image: 'linear-gradient(#4b4114, #e6debb 47%, #ffffff00 48.5%, #e6debb 50%, #b9a032)' },
            button: { image: 'linear-gradient(#e6debb, #b9a032)' },
            
            console: 'console0, console1, console2, console3, console4',
            console0: { image: 'linear-gradient(#99999933 50%, #22222222 0)', size: "25 25" },
            console1: { image: 'linear-gradient(72deg, #99999933 50%, #22222222 0)', size: "25 25" },
            console2: { image: 'linear-gradient(144deg, #99999933 50%, #22222222 0)', size: "25 25" },
            console3: { image: 'linear-gradient(216deg, #99999933 50%, #22222222 0)', size: "25 25" },
            console4: { image: 'linear-gradient(288deg, #99999933 50%, #22222222 0)', size: "25 25" }            
        }
    },
    
    button:
    {
        /**
            Default button padding.
        */
        // defaultPad: 'v1% h1.25%'
    },
    
    color:
    {
        /**
            Enumerated color names. Valid CSS color values must be provided.
                        
            Define "aliases" using keys that point to other keys.
            
            Internally, the styleguide relies on the following names:
              - `black`: the darkest color
              - `white`: the lightest color
              - `prime`: a primary color
              - `primeDark`: a darker primary color
              - `primeLight`: a lighter primary color
              - `second`: a secondary color
              - `secondDark`: a darker secondary color
              - `secondLight`: a lighter secondary color
              - `terti`: a tertiary color
              - `tertiDark`: a darker tertiary color
              - `tertiLight`: a lighter tertiary color
              - `accent`: an accent color
              - `error`: for error or failure info
              - `info`: for informative content
              - `success`: for successful actions
              - `warn`: for dangerous actions
              
            Internally, the library relies on the following names:              
              - `buttonHover`: button foreground color
              - `link`: hyperlink foreground color
              - `linkHover`: hyperlink foreground hover color
        */
        named:
        {
            black: '#000000',
            white: '#FFFFFF',
            gray: '#3D3D3D',
            
            prime: '#776518',
            second: '#B9A032', // alpine
            terti: '#C7B35D', // sundance
            quarter: '#E6DEBB', // spanish white
            quine: '#4b483d', //roti

            text: '#F0ECDA',
            link: '#bba43c',
            linkHover: '#EEEEEE',
            highlight: '#4B4114', // punga
            entryBg: '#2A2A2A',
            
            // accent: '#',
            // error: '#',
            // info: '#',
            // success: '#',
            // warn: '#',
          
            transparent: 'transparent',
            current: 'currentColor',
            
            bg: 'black'
        },
    },
    
    font:
    {
        /**
            Font face definitions.
            
            Each element in this array must be a url that returns CSS font-face
            declaration(s).
        */
        face: 
        [
            'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,700;1,800;1,900&display=swap'
        ],
        
        /**
            Name of the default font face to use when none specified.
        */
        defaultFace: 'Montserrat, sans-serif',
      
        /**
            Enumerated font size rulesets.  
            
            Each font size must have valid CSS values for:
              - `fontSize`
              - `lineHeight`            
        */
        size:
        {
            h1: { fontSize: 30, lineHeight: 30 },
            h2: { fontSize: 24, lineHeight: 24 },
            h3: { fontSize: 18, lineHeight: 18 },
            h4: { fontSize: 12, lineHeight: 12 },
            h5: { fontSize: 9, lineHeight: 9 },
            h6: { fontSize: 6, lineHeight: 6 },
            
            micro: { fontSize: 2.75, lineHeight: 2.75 },
            tiny: { fontSize: 3.5, lineHeight: 4 },
            small: { fontSize: 4, lineHeight: 4 },
            base: { fontSize: 5, lineHeight: 6 },
            large: { fontSize: 6.5, lineHeight: 6.5 },
            huge: { fontSize: 18, lineHeight: 18 },
            jumbo: { fontSize: 24, lineHeight: 24 }
        },
        
        /**
            Font weight enumerations.
        */
        // weight: 
        // {
        //     '9': '900',
        //     '8': '800',
        //     '7': '700',
        //     '6': '600',
        //     '5': '500',
        //     '4': '400',
        //     '3': '300',
        //     '2': '200',
        //     '1': '100',
        // 
        //     '+': 'bolder',
        //     '-': 'lighter',
        // 
        //     clear: 'unset'
        // }
    },
    
    icon:
    {        
        /**
            Icon names mapped to SVG markup.
            
            Define "aliases" using keys that point to other keys.
            
            Internally, the library relies on the following names:
              - `caretDown`: downward pointing circumflex for cueing content
              - `check`: a filled checkbox
              - `checkEmpty`: an empty checkbox
              - `checkInd`: an indeterminate checkbox
              - `radio`: a filled radio button
              - `radioEmpty`: an empty radio button
              - `test`: any icon used for testing
        */
        named: 
        {
            ...icons,
            
            test: icons.face,
        },
        /**
            Async SVG icon provider.
            
            Specify a function here that accepts an icon name and returns a 
            Promise that resolves to SVG icon markup.
        */
        // loader: name => Promise.resolve()        
        /**
            Default icon size (scale units).
        */
        defaultSize: 12,
    },
    
    media:
    {
        /**
            Enumerated CSS media queries.
            
            Define "aliases" using keys that point to other keys.                
        */
        named: 
        {
            smallScreen: '(max-width: 800px)'          
        }
    },
    
    shadow:
    {
        /**
            Enumerated box|text-shadow definitions.
            
            Define "aliases" using keys that point to other keys.

            The color part of the definition must be a color defined in this 
            configuration.
        */
        named: 
        {
            entry: '1px 1px 6px black',
            floater: '0px 0px 4px black',
            insetEntry: 'inset 1px 1px 6px black',
            insetFloater: 'inset 0px 0px 8px black',
            section: '0px 0px 4px quarter',
            sidebar: '4px 4px 4px black',
            sidebarRight: '0 0 8px black',
            text: '0.5px 0.5px 0 black'
        }
    },
  
    transition:
    {
        /**
            Enumerated CSS transition specifications.
            
            Specify CSS transition property names using camelCase without 
            `transition` prefix.
              
            Define "aliases" using keys that point to other keys.
            
            Internally, the library relies on the following names:
              - `default`: default transition spec applied to everything
        */
        named: 
        {
            default: { property: 'all', duration: '0.15s', timingFunction: 'ease' },
            nav: { property: 'opacity, right', duration: '0.5s', timingFunction: 'ease' }          
        }
    }
}
