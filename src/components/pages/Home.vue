<template>
  <x-context #default="{ mobile }">
    <x-flex invert aligns=":center" min-height="100vh" pers="100vh" overflow="hidden">
      <e-extension sel="&::before" background="homepage" />
      <e-stylesheet 
        sel="&::before" 
        content 
        trans="rx38"
        filter="grayscale(100%)"
        opacity=".25"
        pos="fixed"
        trbl="b-10%"
        width="150%"
        height="160%"
        z-index="-1"
      />
      <f-main-title block text="ApexView" :font="mobile ? 'huge' : 'jumbo'" margin="t8" />
      <x-flex colors="quarter" margin="t4 b7" filter="drop-shadow(6px 6px 0 #00000099)">
        <e-animation sel="svg" infinite name="spin" duration="30s" timing="linear" />
        <x-icon name="cardano" :size="mobile ? 28 : 32" colors=":terti_d.5" stroke-width=".25" />
      </x-flex>
      <x-text 
        block 
        align="center" 
        font="tiny" 
        colors="blue_l.6:blue_l-.75" 
        border="a.5!blue_l-.25"
        width="60%" 
        min-width="86" 
        max-width="180" 
        radius="a2" 
        pad="v3 h4" 
        margin="b5"
      >
        <x-text bold inline block font="large" border="b.25!blue" pad="b1 h10" margin="b3">
          BETA
        </x-text>
        <p>
          Please make abundant use of this app and feel free to offer feedback, suggestions, and comments in the 
          <x-link colors="blue_l.75" href="https://discord.gg/jyWgDmGd63" target="_blank">Apex Kingdom discord</x-link>!
        </p>
      </x-text>
      <address-select :addys="addys" width="75%" max-width="225" @select="handleSelect" @remove="handleRemove" />
    </x-flex>
  </x-context>
</template>


<script>
import { EAnimation, EExtension, EStylesheet, XBox, XContext, XFlex, XIcon, XLink, XText } from 'exude'
import AddressSelect from '../AddressSelect'
import FMainTitle from '../face/FMainTitle'


export default
{
    name: 'Home',
        
    components: 
    { 
        AddressSelect, EAnimation, EExtension, EStylesheet, FMainTitle, XBox, XContext, XFlex, XIcon, XLink, XText 
    },
    
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
