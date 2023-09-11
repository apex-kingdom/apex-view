<template>
  <x-button 
    v-bind="$attrs"
    block
    bold
    colors="black"
    border="a.5!black_f.25"
    hf-border="a.5!terti"
    radius="a50"
    pad="v.5vw h1.5vw"
    @click="$emit('click', $event)"
  >
    <e-extension background="button" />
    <slot />
  </x-button>
</template>


<script>
import { EExtension, XButton } from 'exude'


export default
{
    name: 'FButton',
    
    components: { EExtension, XButton },    
}
</script>
