<template>
  <x-context #default="{ bgColor, ext }">
    <x-exapse 
      horiz 
      lower
      invert 
      :expand="show" 
      :colors="`${ext.diff}:${bgColor}_f.4`" 
      breadth="100%" 
      margin="r-.25"
      radius="t6 l6"
      shadow="sidebarRight, insetFloater"
    >
      <!-- setting background for the enclosing xexapse -->
      <x-box radius="t6 l6" width="100" pad="v15 h2">
        <x-button 
          :colors="`${ext.diff}:${bgColor}_f.15`" 
          :hf-colors="`:${ext.same}_f.25`" 
          :border="`a.5!${bgColor}_r10`"
          weight="5"
          font="base" 
          pad="a2" 
          pos="absolute" 
          trbl="t2 h2" 
          radius="a10" z-index="10"
          shadow="insetFloater"
          @click="$emit('update:show', false)" 
        >
          <x-box height="6" overflow="auto" margin="hauto" pad="h.5"> 
            {{ title }} 
          </x-box>
        </x-button>
        <!-- @slot console content -->
        <slot />        
      </x-box>
    </x-exapse>
  </x-context>
</template>



<script>
import { XBox, XButton, XContext, XExapse, XFlex, XText } from 'exude'


export default
{
    name: 'WalletConsole',
    
    components: { XBox, XButton, XContext, XExapse, XFlex, XText },
    
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
