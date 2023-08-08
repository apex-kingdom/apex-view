<template>
  <x-context #default="{ bgDiff, bgSame2 }">
    <x-box v-bind="$attrs"> 
      <x-input 
        :colors="`${bgDiff}:${bgSame2}_f.15`" 
        font="large" 
        radius="a2" 
        placeholder="Enter wallet address or $handle"
        pad="v2 h3" 
        margin="b4"
        width="100%"
        :value.sync="value" 
        shadow="entry"
        @keydown="handleKey"
      />
      <x-text 
        v-if="list.length > 0"
        block 
        colors="text" 
        height="62" 
        pad="h4 t2" 
        radius="a2" 
        overflow="auto" 
        over-wrap="anywhere"
      >
        <x-flex v-for="addy in list" :key="addy" aligns=":center" margin="b2" gap="2">
          <x-link 
            align="left" 
            colors="text:entryBg_f.15"
            h-colors="white:prime"
            pad="v2 h3" 
            flex="1" 
            radius="a2" 
            shadow="entry"
            @click="emitSelection(addy)" 
          > 
            {{ addy }} 
          </x-link>
          <x-flex 
            aligns=":center" 
            colors=":entryBg_f.15"
            h-colors="white:prime" 
            cursor="pointer" 
            pad="a1.5" 
            radius="a100" 
            shadow="entry"
            @click="emitRemove(addy)" 
          >
            <x-icon name="trash" size="7" :title="`Delete ${addy}.`" tabindex="0" />
          </x-flex>
        </x-flex>
      </x-text>
    </x-box>
  </x-context>
</template>


<script>
import { XBox, XContext, XFlex, XIcon, XInput, XLink, XText } from 'exude'


export default
{
    name: 'AddressSelect',
    
    components: { XBox, XContext, XFlex, XIcon, XInput, XLink, XText },
    
    props:
    {
        /**
            List of addresses.
        */
        addys: Array
    },
    
    data: () => ({ value: '' }),
    
    computed:
    {
        list() 
        {
            let { addys, value } = this;
            let list = (addys || []).filter(a => a.indexOf(value) >= 0);
            
            return list.length === 0 ? addys : list;
        }
    },

    methods:
    {
        emitSelection(address)
        {
            this.$emit('select', address);
        },
      
        emitRemove(address)
        {
            this.$emit('remove', address);
        },
      
        handleKey(evt)
        {
            if (this.value && evt.code.toLowerCase() === 'enter') 
                this.emitSelection(this.value);
        }
    }
}
</script>
