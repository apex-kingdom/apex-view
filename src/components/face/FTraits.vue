<template>
  <x-context #default="{ bgColor, ext }">
    <x-flex v-bind="$attrs" wrap aligns=":center:center" margin="v4">
      <x-box v-for="key of keys" :key="key" align="center" margin="a2" :width="boxWidth">
        <x-text 
          block 
          bold 
          font="tiny" 
          :colors="`${ext.diff}:${bgColor}_r-20`" 
          :border="`b.25!${ext.same}`"
          pad="v1 h2" 
          radius="t1 r1"
          over-wrap="anywhere"
        > 
          {{ key || '---' }} 
        </x-text>
        <!-- @slot trait value -->
        <slot :value="object[key]">     
          <x-text block :colors="`${ext.same}:${ext.diff}_f.25`" pad="v1 h2" radius="b1 l1" over-wrap="anywhere"> 
            {{ object[key] || '---' }}
          </x-text>
        </slot> 
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
            Width of individual trait box.
        */
        boxWidth: [ String, Number ],
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
