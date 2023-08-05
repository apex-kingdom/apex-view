
/**
    Truncates the middle of a long string of chars to leave only first and
    last parts of length `len`.
    
    @param { string } str
      String to be shortened.
    @param { number } len
      Number of chars to keep at both ends.
    @return { string }
      Shortened string with middle chars replaced by an ellipsis.
      If `str` is as long or shorter than twice `len`, then `str` is returned.
*/
export default function(str, len)
{
    return (str || '').length > len * 2 ? [str.slice(0, len), str.slice(-len)].join('...') : str;
}
