<template>
  <x-ingot>
    <slot></slot>
    <x-link>
      <x-icon name="close" />
    </x-link>
  </x-ingot>
</template>


<script>
import { XIcon, XIngot, XLink } from 'exude';
import { m_toggle } from 'exude'


/**
    A UI Element that represents a term used to filter.
    
    There is a main filter term that can also be classified by a 'label'.
    
    Cancelling and negation of the term is possible as well.    
*/
export default
{
    name: 'AFilterTerm',
    
    mixins: [ m_toggle('negate') ],
    
    components: { XIcon, XIngot, XLink },
    
    props:
    {
        
    }
}
</script>
