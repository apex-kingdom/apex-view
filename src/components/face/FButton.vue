<template>
  <x-button 
    v-bind="$attrs"
    :font="small ? 'small' : 'base'"
    bold
    colors="black"
    background="button"
    border="a.5!black_f.25"
    h-border="a.5!terti"
    radius="a2"
    :pad="small ? 'v1 h2' : 'v2 h3'"
    @click="$emit('click', $event)"
  />
</template>


<script>
import { XBackground, XButton } from 'exude'


export default
{
    name: 'FButton',
    
    components: { XBackground, XButton },
    
    props:
    {
        /**
            Render a smaller size button?
        */
        small: Boolean
    }
}
</script>
