

export default function()
{
    let stack = [];
    
    let pos = value => stack.indexOf(value)
    
    let rem = index =>
    {
        if (index >= 0)
            stack = [ ...stack.slice(0, index), ...stack.slice(index + 1) ];
    }
    
    let top = value => 
    {
        rem(pos(value));
        
        stack = [ ...stack, value ];
        
        return pos(value);
    }
    
    return { pos, rem, top };
}
