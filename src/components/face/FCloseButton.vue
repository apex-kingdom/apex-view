<template>
  <x-button 
    v-bind="$attrs"
    colors="white:black"
    border="a.5!black"
    h-border="a.5!terti"
    radius="a50%"
    :pad="`a${size / 8}`"
    @click="$emit('click', $event)"
  >
    <x-icon name="close" :size="size" />
  </x-button>
</template>


<script>
import { XButton, XIcon } from 'exude'


export default
{
    name: 'FCloseButton',
    
    components: { XButton, XIcon },
    
    props:
    {
        /**
            CLose icon size (scale units).
        */
        size: { type: [ String, Number ], default: 5 }
    }
}
</script>
