<template>
  <x-flex v-bind="$attrs" inline aligns=":center:center" @hover="hover = $event">
    <x-text 
      :colors="active || hover ? 'white:prime_f.25' : 'white:transparent'" 
      pad="v.4vw l.75vw r.5vw" 
      radius="t.5vw l.5vw"
    >
      {{ value }} 
    </x-text>
    <x-box :colors="active || hover ? 'white:white_f.75' : null" pad="v.4vw r.75vw l.5vw" radius="b.5vw r.5vw"> 
      {{ label }} 
    </x-box>
  </x-flex>
</template>


<script>
import { XBox, XFlex, XText } from 'exude'


/**
    Displays a wallet stat
*/
export default
{
    name: 'FStat',
    
    components: { XBox, XFlex, XText },
    
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
