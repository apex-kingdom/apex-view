<template>
  <x-context #default="{ bgColor, bgDiff, bgSame }">
    <x-flex v-bind="$attrs" wrap aligns=":center:center" margin="v4">
      <x-box v-for="key of keys" :key="key" align="center" margin="a2">
        <x-text 
          block 
          bold 
          font="tiny" 
          :colors="`${bgDiff}:${bgColor}_r-20`" 
          :border="`b.25!${bgSame}`"
          pad="a1" 
          radius="t1 r1"
          over-wrap="anywhere"
        > 
          {{ key || '---' }} 
        </x-text>
        <x-text block :colors="`${bgSame}:${bgDiff}_f.25`" pad="v1 h2" radius="b1 l1" over-wrap="anywhere"> 
          <!-- @slot trait value -->
          <slot :value="object[key]">     
            {{ object[key] || '---' }}
          </slot> 
        </x-text>
      </x-box>
    </x-flex>
  </x-context>
</template>


<script>
import { XBox, XContext, XFlex, XText } from 'exude'


export default
{
    name: 'FTraits',
    
    components: { XBox, XContext, XFlex, XText },
    
    props:
    {
        /**
            Key/value pairs.
        */
        object: Object
    },
    
    computed:
    {
        keys() { return Object.keys(this.object).sort(); }
    }
}
</script>
