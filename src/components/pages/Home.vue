<template>
  <x-context #default="{ mobile }">
    <x-flex invert aligns=":center">
      <f-main-title block text="ApexView" :font="mobile ? 'huge' : 'jumbo'" margin="t8" />
      <x-flex display="inline-block" colors="quarter" margin="t4 b7" filter="drop-shadow(4px 4px 0 black)">
        <x-icon name="cardano" :size="mobile ? 28 : 32" colors=":black_f.5" stroke-width=".5" />
      </x-flex>
      <x-text 
        block 
        align="center" 
        font="tiny" 
        colors="white:red_l-.75" 
        width="50%" 
        min-width="86" 
        max-width="180" 
        radius="a2" 
        pad="a4" 
        margin="b5"
      >
        <p>
          Please note that this app is currently in <u>ALPHA</u> as bugs are squashed and features are 
          being added.  
        </p>
        <br />
        <p>
          <b>Beware that third-party service limits may cut off access to the app with excessive usage.</b>
        </p>
      </x-text>
      <address-select :addys="addys" width="75%" max-width="225" @select="handleSelect" @remove="handleRemove" />
    </x-flex>
  </x-context>
</template>


<script>
import { XBox, XContext, XFlex, XIcon, XText } from 'exude'
import AddressSelect from '../AddressSelect'
import FMainTitle from '../face/FMainTitle'


export default
{
    name: 'Home',
        
    components: { AddressSelect, FMainTitle, XBox, XContext, XFlex, XIcon, XText },
    
    data: () => ({ addys: [] }),
    
    created()
    {
        this.updateAddys();
    },
    
    methods:
    {
        handleSelect(address)
        {
            this.$router.push({ name: 'tokens', params: { address } });              
        },

        handleRemove(address)
        {
            let { addys } = this, index = 0;
            
            while ((index = addys.indexOf(address)) >= 0)
                addys = [ ...addys.slice(0, index), ...addys.slice(index + 1) ];
            
            window.localStorage.setItem('addys', JSON.stringify(addys));
            
            this.updateAddys();
        },
        
        updateAddys()
        {
            this.addys = JSON.parse(window.localStorage.getItem('addys')) || [];          
        }
    }
}
</script>
