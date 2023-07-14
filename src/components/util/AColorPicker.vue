<template>
  <x-box v-bind="$attrs" colors=":black_f.25" radius="a4" overflow="hidden">
    <verte 
      display="widget"
      picker="wheel" 
      model="hex"
      :rgb-sliders="true"
      :enable-alpha="false"
      :value="current"
      @input="setColor"
    />
  </x-box>
</template>


<script>
import 'verte/dist/verte.css'
import Verte from 'verte'
import { XBox } from 'exude'


export default
{
    name: 'ColorPicker',
        
    components: { Verte, XBox },
    
    data: () => ({ current: 'black' }),
    
    props:
    {
        /**
            A name for this color picker.
        */
        name: { type: String, required: true }
    },
    
    mounted()
    {
        this.setColor(localStorage.getItem(this.name) || '#000000');
    },
    
    methods:
    {
        setColor(color) 
        { 
            this.current = color;
            localStorage.setItem(this.name, color);
            
            this.$emit('input', color); 
        }
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
