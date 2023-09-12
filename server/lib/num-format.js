
var deZero = /[.0]+$/;
var formatter = new Intl.NumberFormat('en-US');
/**
    Formats a number as a displayable string.
    
    @param { value } number
      Number to be formatted.
    @param { number } decimals
      Number of positions to move decimal to the left.
    @return { string }
      Formatted number.
*/
module.exports = function(value, decimals = 0)
{
    let adjusted = Array.apply(null, Array(decimals)).reduce(v => v * .1, Number(value));
    
    if (adjusted >= 10)
        return formatter.format(Math.round(adjusted));

    return adjusted.toFixed(12).replace(deZero, '');    
}
