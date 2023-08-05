<template>
  <x-floater 
    #default="{ close }" 
    v-bind="baseProps" 
    :show="show" 
    :z-index="zIndex"
    :tabindex="0"
    @update:show="$emit('update:show', $event)"
    @focusin="topIndex"
    v-listen-outside-focus="setIndex"
  >
    <x-flex invert aligns=":center" colors="text:gray" pad="a3" radius="a2" shadow="insetFloater" gap=":2">
      <!-- @slot pop message content -->
      <slot />
      <f-button v-if="mode !== 'alert'" small label="Close" @click="close" />
    </x-flex>
  </x-floater>
</template>


<script>
import { XFlex, XFloater } from 'exude'
import { listenOutsideFocus } from 'exude'
import stack from '_source/lib/stack'
import FButton from './FButton'


let pops = stack();

export default
{
    name: 'FPopMessage',
    
    components: { FButton, XFlex, XFloater },
    
    directives: { listenOutsideFocus },
    
    props:
    {
        /**
            Pop Message display mode.
            
            @values 'alert', 'info'
        */
        mode: { type: String, default: 'alert' },
        /**
            Display the pop message?
        */
        show: Boolean
    },
    
    data: () => ({ zIndex: 0 }),
    
    destroyed()
    {
        pops.rem(pops.pos(this._uid));
    },
    
    computed:
    {
        baseProps() 
        {
            let props = 
            {
                colors: ':black_f.75',
                trbl: 't4', 
                radius: 'a2',
                shadow: 'floater',
            };
            
            if (this.mode === 'alert')
            {
                props.disabled = true;
                props.frame = 'a.5';
                props.timeo = 3000;
            }
            
            if (this.mode === 'info')
            {
                props.disabled = false;
                props.frame = 'a2';
                props.timeo = -1;
            }
            
            return props;
        }
    },
    
    watch:
    {
        show() { this.show && this.topIndex(); }
    },
    
    methods:
    {
        setIndex() { this.zIndex = 100 + pops.pos(this._uid); },
        
        topIndex() { this.zIndex = 100 + pops.top(this._uid); }
    }
}
</script>
