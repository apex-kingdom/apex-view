<template>
  <x-flex 
    v-bind="$attrs" 
    inline 
    aligns=":center:center" 
    @hover="hover = $event"
  >
    <x-box 
      :colors="hover ? 'white:prime' : 'white:quine'" 
      pad="v1 h2" 
      radius="a10"
      min-width="7"
    >
      {{ value }} 
    </x-box>
    <x-box margin="l1 r2"> {{ label }} </x-box>
  </x-flex>
</template>


<script>
import { XBox, XFlex } from 'exude'


/**
    Displays a wallet stat
*/
export default
{
    name: 'AStat',
    
    components: { XBox, XFlex },
    
    data: () => ({ hover: false }),
    
    props:
    {
        /**
            Stat name.
        */
        label: String,
        /**
            Stat value.
        */
        value: [ String, Number ]
    }
}
</script>
