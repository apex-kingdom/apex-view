<template>
  <x-context #default="{ bgColor, bgDiff, bgSame }">
    <x-exapse 
      horiz 
      lower
      invert 
      :expand="show" 
      :colors="`${bgDiff}:${bgColor}_f.5`" 
      breadth="100%" 
      margin="r-.25"
      radius="t6 l6"
      shadow="sidebarRight, insetFloater"
    >
      <!-- setting background for the enclosing xexapse -->
      <x-box radius="t6 l6" width="100" pad="v15 h2">
        <x-box colors=":black_f.125" border="a.25!terti" pad="a2.5" pos="absolute" trbl="t2 h2" radius="a10" z-index="10">
          <x-text block align="center" font="base" colors="quarter" height="6" overflow="auto" pad="l4"> 
            {{ title }} 
          </x-text>
          <f-close-button 
            pos="absolute" 
            trbl="t50% l0" 
            trans="ty-50%" 
            margin="h2" 
            @click="$emit('update:show', false)" 
          />
        </x-box>
        <!-- @slot console content -->
        <slot />        
      </x-box>
    </x-exapse>
  </x-context>
</template>



<script>
import { XBox, XContext, XExapse, XFlex, XText } from 'exude'
import FCloseButton from './face/FCloseButton'


export default
{
    name: 'WalletConsole',
    
    components: { FCloseButton, XBox, XContext, XExapse, XFlex, XText },
    
    props:
    {
        /**
            Show the settings panel?
        */
        show: Boolean,
        /**
            Console title.
        */
        title: String
    },
}
</script>
