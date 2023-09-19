<template>
  <x-context #default="{ bgColor }">
    <x-flex v-bind="overProps" :border="`a.15vw!${bgColor}_f.25`" v-on="$listeners">
      <!-- @slot overbox content -->
      <slot />
    </x-flex>
  </x-context>
</template>


<script>
import { XContext, XFlex } from 'exude'


export default
{
    name: 'FOverbox',
    
    components: { XContext, XFlex },    
    
    computed:
    {
        overProps()
        {
            let props = 
            {
                gap: '1.5vw:1vw',
                margin: 'a2.5vh',
                pad: 'v.6vw h1.2vw',
                ...this.$attrs,
                wrap: true,
                aligns: ':center:center',
                colors: ':black_f.125',
                radius: 'a1vw',
                shadow: 'floater'             
            };
            
            return props;
        }
    }
}
</script>
