<template>
  <x-context #default="{ ext }"> 
    <x-button 
      v-bind="$attrs"
      :colors="`${ext.diff}`" 
      :i-colors="`${ext.same}_f.75:${ext.diff}_f.75`" 
      border="a.25!transparent"
      :hf-border="`a.25!${ext.diff}`" 
      i-border="a.25!transparent"
      i-cursor="not-allowed"
      radius="a2" 
      pad="a1" 
      @click="$emit('click', $event)"
    >
      <x-icon :name="icon" size="8" />
    </x-button>
  </x-context>
</template>


<script>
import { XButton, XContext, XIcon } from 'exude'

export default
{
    name: 'FCanvasButton',
    
    components: { XButton, XContext, XIcon },
    
    props:
    {
        /**
            Button icon.
        */
        icon: String
    }
}
</script>
