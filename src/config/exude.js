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
            Automatic HTML id generation.
        */
        htmlIdGen: false,
        /**
            String used to help prevent naming collisions.
        */
        namespace: 'apex',
        
        scale: 
        { 
            /**
                Scale angle.
            */
            angle: { num: 1, unit: 'deg' }, 
            /**
                Scale time.
            */
            time: { num: 1000, unit: 'ms' }, 
            /**
                Scale length.
            */
            length: { num: 4, unit: 'px' } 
        }
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
            console4: { image: 'linear-gradient(288deg, #99999933 50%, #22222222 0)', size: "25 25" },
            
            homepage: 
            {
                image: "url(/pub/images/bg.png)",
                size: "100% 100%",
                repeat: "no-repeat",
                position: "center center"
            }
        }
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
            ltgray: '#C2C2C2',
            
            prime: '#776518',
            second: '#B9A032', // alpine
            terti: '#C7B35D', // sundance
            quarter: '#E6DEBB', // spanish white
            quine: '#4B483D', //roti

            text: '#F0ECDA',
            link: '#bba43c',
            linkHover: '#EEEEEE',
            highlight: '#4B4114', // punga
            entryBg: '#2A2A2A',
            
            collection: '#99CCFF',
            attribute: '#CCFF99',
            description: '#99FFCC',
            trait: '#FFCC99',
            name: '#CC99FF',
            negate: '#FF9999',
            metadata: '#FF99CC',
            
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
        */
        named:
        {
            h1: { size: 30, height: 30 },
            h2: { size: 24, height: 24 },
            h3: { size: 18, height: 18 },
            h4: { size: 12, height: 12 },
            h5: { size: 9, height: 9 },
            h6: { size: 6, height: 6 },

            micro: { size: 2.75, height: 2.75 },
            tiny: { size: 3.5, height: 4 },
            small: { size: 4, height: 4 },
            base: { size: 5, height: 6 },
            large: { size: 6.5, height: 6.5 },
            huge: { size: 18, height: 18 },
            jumbo: { size: 24, height: 24 },

            vTiny: { size: '1vw', height: '1.1vw' },
            vSmaller: { size: 'calc(.8vw + 6px)', height: 'calc(.8vw + 6px)' },
            vSmall: { size: 'calc(.9vw + 9px)', height: 'calc(.9vw + 12px)' },
            vBase: { size: 'calc(1vw + 14px)', height: 'calc(1vw + 14px)' },
            vHuge: { size: 'calc(3vw + 18px)', height: 'calc(3vw + 18px)' }
        }        
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
    
    measure:
    {
        /**
            General purpose enumerated CSS length values.
            
            Define "aliases" using keys that point to other keys.                
        */
        length: 
        {
            address: 'calc(1vw + 8px)',
            austral: 'calc(1.7vw + 12px)',
            hidenav: '-1vw',
            mainnav: 'calc(1.5vw + 22px)',
            shownav: 'calc(-5vw - 22px)'
        }
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
            entry: '2px 2px 4px black',
            floater: '0px 0px 8px black',
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
            about: { property: 'opacity, z-index', duration: '0.5s', timing: 'ease' },          
            // default: { property: 'all', duration: '0.15s', timing: 'ease' },
            nav: { property: 'opacity, right', duration: '0.5s', timing: 'ease' }          
        }
    }
}
