<template>
  <x-exapse 
    horiz 
    invert 
    :expand="show" 
    colors=":black_f.125"
    border="a.1vw!gray l0"
    :hide="hide" 
    breadth="100%"
    margin="l-.1vw" 
    radius="r6 b6"
    shadow="sidebar"
    @transitionstart="hide = false"
    @transitionend="hide = !show"
  >
    <x-text block pad="a1vw" font="vSmall" space="nowrap">
      <x-text block bold font="vSmall" pad="v1vw" border="b.25!terti"> 
        Flex Mode 
      </x-text>
      <x-field block el="label" margin="v1vw" pad="h1.1vw">
        <x-checkbox :icon="noLabels ? 'check' : 'checkEmpty'" size="austral" align=":middle" :value.sync="noLabels" />
        Hide names &amp; labels
      </x-field>
      <x-field block el="label" margin="v1vw" pad="h1.1vw">
        <x-checkbox :icon="noGutters ? 'check' : 'checkEmpty'" size="austral" align=":middle" :value.sync="noGutters" />
        No grid gutters
      </x-field>
      <x-text block bold font="vSmall" pad="v1vw" margin="t2.5vw" border="b.25!terti"> 
        Background Color
      </x-text>
      <f-color-picker 
        border="a.25!quine!dotted" 
        margin="t2vw" 
        :value="bgColor" 
        @update:value="$emit(`update:bg-color`, $event)" 
      />
    </x-text> 
    <x-link block margin="v1vw hauto" colors="quine" @click="$emit('about')">
      <x-icon name="apex" size="3.5vw" />
    </x-link>
  </x-exapse>
</template>


<script>
import { XCheckbox, XExapse, XField, XIcon, XLink, XText } from 'exude';
import FColorPicker from './face/FColorPicker'


export default
{
    name: 'AppSettings',
    
    components: { FColorPicker, XCheckbox, XExapse, XField, XIcon, XLink, XText },
    
    props:
    {
        /**
            Background color.
        */
        bgColor: { type: String, default: '#000000' },        
        /**
            Show the settings panel?
        */
        show: Boolean
    },
    
    data: () => ({ noLabels: false, noGutters: false, hide: false }),
    
    created()
    {
        let tid = null;
        
        let sendEvent = () =>
        {
            let { noLabels, noGutters } = this;
            this.$emit('update', { noLabels, noGutters });
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
        let bgColor = localStorage.getItem('bgColor');
        if (bgColor)
            this.$emit(`update:bg-color`, bgColor);

        this.noLabels = !!localStorage.getItem('noLabels');
        this.noGutters = !!localStorage.getItem('noGutters');

        this.emitUpdates();         
    },
    
    watch:
    {
        bgColor() 
        { 
            localStorage.setItem('bgColor', this.bgColor);
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
