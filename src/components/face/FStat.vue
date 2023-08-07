<template>
  <x-flex 
    v-bind="$attrs" 
    inline 
    aligns=":center:center" 
    @hover="hover = $event"
  >
    <x-box 
      :colors="active || hover ? 'white:prime' : 'white:transparent'" 
      border="a.1vw!prime"
      pad="v.2vw h.8vw" 
      radius="a1vw"
    >
      {{ value }} 
    </x-box>
    <x-box margin="l1 r2" :colors="active ? 'linkHover' : null"> 
      {{ label }} 
    </x-box>
  </x-flex>
</template>


<script>
import { XBox, XFlex } from 'exude'


/**
    Displays a wallet stat
*/
export default
{
    name: 'FStat',
    
    components: { XBox, XFlex },
    
    data: () => ({ hover: false }),
    
    props:
    {
        /**
            In active state?
        */
        active: Boolean,
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
