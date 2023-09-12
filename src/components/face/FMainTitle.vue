<template>
  <x-text 
    v-bind="$attrs"
    bold 
    colors="transparent"     
    filter="drop-shadow(4px 4px 0 black)"
    pos="relative"
  >
    {{ text }}
    <e-background clip="text" image="linear-gradient(#4b4114, #e6debb 47%, #ffffff00 48.5%, #e6debb 50%, #b9a032)" />
  </x-text>
</template>


<script>
import { EBackground, XText } from 'exude'


export default
{
    name: 'FMainTitle',
    
    components: { EBackground, XText },
    
    props:
    {
        /**
            Title text sring.
        */
        text: String
    }
}
</script>
