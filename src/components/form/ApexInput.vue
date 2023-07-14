<template>
  <x-input 
    v-bind="$attrs" 
    colors="text:entryBg" 
    font="large" 
    radius="a2" 
    pad="v2 h3" 
    :value="value"
    @keydown="$emit('keydown', $event)"
    @update:value="$emit('update:value', $event)" 
  />
</template>


<script>
import { XInput } from 'exude'


export default 
{
    name: 'ApexInput',
    
    components: { XInput },
    
    props:
    {
        /**
            Field value.
        */
        value: [String, Number]
    }    
}
</script>
