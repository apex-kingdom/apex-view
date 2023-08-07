<template>
  <x-box v-bind="$attrs" colors=":black_f.25" radius="a2vw" overflow="hidden">
    <verte 
      display="widget"
      picker="wheel" 
      model="hex"
      :rgb-sliders="true"
      :enable-alpha="false"
      :value="value"
      @input="$emit('update:value', $event)"
    />
  </x-box>
</template>


<script>
import 'verte/dist/verte.css'
import Verte from 'verte'
import { XBox } from 'exude'


export default
{
    name: 'FColorPicker',
        
    components: { Verte, XBox },
    
    props:
    {
        /**
            Color value.
        */
        value: { type: String, default: 'black' }
    }
}
</script>


<style>
.verte .verte__menu
{
    background-color: transparent;
}

.verte .verte__menu .slider__input,
.verte .verte__menu .verte__input
{
    color: #EEEEEE;  
}
</style>
