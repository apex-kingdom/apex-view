<template>
  <x-floater 
    #default="{ close }" 
    v-bind="baseProps" 
    :show="show" 
    trans="tx-50%" 
    trbl="t10% l50%"
    :z-index="stack"
    @update:show="$emit('update:show', $event)"
  >
    <x-flex invert aligns=":center" colors="text:gray" pad="a3" radius="a2" shadow="insetFloater" gap=":2">
      <!-- @slot pop message content -->
      <slot />
      <a-button v-if="mode !== 'alert'" small label="Close" @click="close" />
    </x-flex>
  </x-floater>
</template>


<script>
import { XFlex, XFloater } from 'exude'
import AButton from './AButton'


let stack = 100;

export default
{
    name: 'APopMessage',
    
    components: { AButton, XFlex, XFloater },
    
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
    
    data: () => ({ stack }),
    
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
                zIndex: stack
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
        show() 
        { 
            stack += this.show ? 1 : -1;
            this.stack = stack;
        }
    }
}
</script>
