
module.exports =
{
    presets: 
    [ 
        [ "@babel/preset-env", { targets: { browsers: ['last 2 versions'] } } ] 
    ],
        
    plugins: 
    [ 
        [ "import-glob" ]
    ],
    
    compact: false
}
