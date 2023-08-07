<template>
  <x-exapse 
    horiz 
    invert 
    :expand="show" 
    colors=":black_f.125" 
    breadth="100%" 
    radius="r6 b6"
    shadow="sidebar"
  >
    <x-text block pad="a1vw" width="28vw" font="vBase">
      <x-text block bold font="vSmall" pad="v1vw" border="b.25!terti"> 
        Flex Mode 
      </x-text>
      <x-field block el="label" margin="v1vw" pad="h1.2vw">
        <x-checkbox :icon="noLabels ? 'check' : 'checkEmpty'" size="2.5vw" align=":middle" :value.sync="noLabels" />
        Hide names &amp; labels
      </x-field>
      <x-field block el="label" margin="v1vw" pad="h1.2vw">
        <x-checkbox :icon="noGutters ? 'check' : 'checkEmpty'" size="2.5vw" align=":middle" :value.sync="noGutters" />
        No grid gutters
      </x-field>
      <x-text block bold font="vSmall" pad="v1vw" margin="t2.5vw" border="b.25!terti"> 
        Background Color
      </x-text>
      <f-color-picker border="a.25!quine!dotted" margin="v2vw" :value.sync="bgColor" />
    </x-text> 
    <x-text 
      block
      align="center" 
      pad="v.5vw"
      colors="quine:black_f.125"
      pos="absolute" 
      trbl="b0" 
      font="vTiny" 
      overflow="auto"
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
