<template>
  <x-box v-bind="$attrs"> 
    <x-input 
      colors="text:entryBg" 
      font="large" 
      radius="a2" 
      placeholder="Enter wallet address or $handle"
      pad="v2 h3" 
      margin="b4"
      width="100%"
      :value.sync="value" 
      shadow="insetEntry"
      @keydown="handleKey"
    />
    <x-text 
      block 
      colors="text:entryBg" 
      height="62" 
      pad="a2 b0" 
      radius="a2" 
      shadow="insetEntry"
      overflow="auto" 
      over-wrap="anywhere"
    >
      <x-flex v-for="addy in list" :key="addy" aligns=":center" margin="b2" gap="2">
        <x-link 
          align="left" 
          colors="text:entryBg"
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
          colors=":entryBg"
          h-colors="white:prime" 
          cursor="pointer" 
          pad="a1" 
          radius="a100" 
          shadow="entry"
          @click="emitRemove(addy)" 
        >
          <x-icon name="trash" size="6" :title="`Delete ${addy}.`" tabindex="0" />
        </x-flex>
      </x-flex>
    </x-text>
  </x-box>
</template>


<script>
import { XBox, XFlex, XIcon, XInput, XLink, XText } from 'exude'


export default
{
    name: 'AddressSelect',
    
    components: { XBox, XFlex, XIcon, XInput, XLink, XText },
    
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
            let list = (addys || []).filter(a => value.indexOf(a) >= 0);
            
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
