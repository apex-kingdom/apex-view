<template>
  <x-box 
    v-bind="$attrs" 
    display="inline-block" 
    pos="relative" 
    pers="200"     
    @click="$emit('click', $event)"
  >
    <e-transition sel="> div" property="transform" duration="0.8" />
    <x-box :trans="oTrans" pos="relative" trbl="a0" overflow="auto" hide-back>
      <!-- @slot obverse content -->
      <slot />
    </x-box>
    <x-box :trans="rTrans" pos="absolute" trbl="a0" overflow="auto" hide-back>
      <!-- @slot reverse content -->
      <slot name="reverse" />
    </x-box>
  </x-box>
</template>


<script>
import { ETransition, XBox } from 'exude'


export default
{
    name: 'FFlipCard',
    
    components: { ETransition, XBox },
    
    props:
    {
        /**
            Show reverse side of card?
        */
        flip: Boolean,
        /**
            Animate flip on y-axis?
        */
        yAxis: Boolean
    },
    
    computed:
    {
        oTrans() { return `r${this.yAxis ? 'y' : 'x'}${this.flip ? -180 : 0}`; },

        rTrans() { return `r${this.yAxis ? 'y' : 'x'}${this.flip ? 0 : 180}`; }
    }
}
</script>
