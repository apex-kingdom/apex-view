<template>
  <x-button 
    v-bind="$attrs"
    bold
    colors="black"
    background="button"
    border="a.5!black_f.25"
    hf-border="a.5!terti"
    radius="a50"
    pad="v.5vw h1.5vw"
    @click="$emit('click', $event)"
  />
</template>


<script>
import { XBackground, XButton } from 'exude'


export default
{
    name: 'FButton',
    
    components: { XBackground, XButton },    
}
</script>
