<template>
  <x-exapse 
    horiz 
    invert 
    :expand="show" 
    colors=":black_f.125" 
    :extent="80" 
    breadth="100%" 
    margin="l-.25"
    radius="r6 b6"
    shadow="sidebar"
  >
    <x-text block pad="a5" font="base">
      <x-text block bold font="base" pad="v2" border="b.25!terti"> 
        Flex Mode 
      </x-text>
      <x-field block el="label" margin="v5" pad="h3">
        <x-checkbox :icon="noLabels ? 'check' : 'checkEmpty'" size="8" align=":middle" :value.sync="noLabels" />
        Hide names &amp; labels
      </x-field>
      <x-field block el="label" margin="v5" pad="h3">
        <x-checkbox :icon="noGutters ? 'check' : 'checkEmpty'" size="8" align=":middle" :value.sync="noGutters" />
        No grid gutters
      </x-field>
      <x-text block bold font="base" pad="v2" margin="t10" border="b.25!terti"> 
        Background Color
      </x-text>
      <f-color-picker border="a.25!quine!dotted" margin="v5" :value.sync="bgColor" />
    </x-text> 
    <x-text 
      block
      align="center" 
      pad="v1"
      colors="quine:black_f.125"
      pos="absolute" 
      trbl="b0" 
      font="tiny" 
      width="100%"
    >
      ©2023 Apex Kingdom &amp; wilsonape
    </x-text>
  </x-exapse>
</template>


<script>
import { XCheckbox, XExapse, XField, XText } from 'exude';
import FColorPicker from './face/FColorPicker'


export default
{
    name: 'AppSettings',
    
    components: { FColorPicker, XCheckbox, XExapse, XField, XText },
    
    props:
    {
        /**
            Show the settings panel?
        */
        show: Boolean
    },
    
    data: () => ({ bgColor: '#000000', noLabels: false, noGutters: false }),
    
    created()
    {
        let tid = null;
        
        let sendEvent = () =>
        {
            let { bgColor, noLabels, noGutters } = this;
            this.$emit('update', { bgColor, noLabels, noGutters });
        }
        // debounce settings updates
        this.emitUpdates = () =>
        {
            clearTimeout(tid);
            tid = setTimeout(sendEvent, 10);
        }
    },
    
    mounted()
    {
        this.bgColor = localStorage.getItem('bgColor');
        this.noLabels = !!localStorage.getItem('noLabels');
        this.noGutters = !!localStorage.getItem('noGutters');

        this.emitUpdates();         
    },
    
    watch:
    {
        bgColor() 
        { 
            localStorage.setItem('bgColor', this.bgColor);
            
            this.emitUpdates();         
        },
        
        noLabels()
        {
            if (this.noLabels)
                localStorage.setItem('noLabels', this.noLabels);
            else
                localStorage.removeItem('noLabels');            
                
            this.emitUpdates();         
        },

        noGutters()
        {
            if (this.noGutters)
                localStorage.setItem('noGutters', this.noGutters);
            else
                localStorage.removeItem('noGutters');
            
            this.emitUpdates();         
        }
    }
}
</script>
