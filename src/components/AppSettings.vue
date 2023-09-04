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
        <x-checkbox size="austral" align=":middle" :value.sync="noLabels" />
        Hide names &amp; labels
      </x-field>
      <x-field block el="label" margin="v1vw" pad="h1.1vw">
        <x-checkbox size="austral" align=":middle" :value.sync="noCounts" />
        Hide token counts
      </x-field>
      <x-field block el="label" margin="v1vw" pad="h1.1vw">
        <x-checkbox size="austral" align=":middle" :value.sync="noGutters" />
        No grid gutters
      </x-field>
      <x-text block bold font="vSmall" pad="v1vw" margin="t2.5vw" border="b.25!terti"> 
        Background Color
      </x-text>
      <f-color-picker 
        border="a.25!quine!dotted" 
        margin="t2vw" 
        :value="bgColor" 
        @update:value="emitBgColor($event)" 
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
    
    data: () => ({ noCounts: false, noLabels: false, noGutters: false, hide: false }),
    
    created()
    {
        let tid = null;
        // debounce background color update
        this.emitBgColor = color =>
        {
            if (color)
            {
                clearTimeout(tid);
                tid = setTimeout(() => this.$emit(`update:bg-color`, color), 25);
            }
        }
    },
    
    mounted()
    {
        this.emitBgColor(localStorage.getItem('bgColor'));
        // initialize settings and update
        [ 'noCounts', 'noGutters', 'noLabels' ].forEach(s => this.resetBool(s));
        this.emitUpdates();         
    },
    
    watch:
    {
        bgColor() { this.updateValue('bgColor'); },
        
        noCounts() { this.updateBool('noCounts'); },

        noGutters() { this.updateBool('noGutters'); },

        noLabels() { this.updateBool('noLabels'); }
    },
    
    methods:
    {
        emitUpdates()
        {
            let { noCounts, noGutters, noLabels } = this;
            this.$emit('update', { noCounts, noGutters, noLabels });
        },
      
        resetBool(setting) { this[setting] = !!localStorage.getItem(setting); },
      
        updateBool(setting)
        {
            if (this[setting])
                localStorage.setItem(setting, this[setting]);
            else
                localStorage.removeItem(setting);            
                
            this.emitUpdates();         
        },

        updateValue(setting) { localStorage.setItem(setting, this[setting]); }      
    }
}
</script>
