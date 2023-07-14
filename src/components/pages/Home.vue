<template>
  <x-flex invert aligns=":center">
    <x-flex invert aligns=":center" margin="t12 b12">
      <apex-title label="ApexView" font="jumbo" />
      <x-flex display="inline-block" colors="quarter" margin="v5" filter="drop-shadow(4px 4px 0 black)">
        <x-icon name="cardano" size="32" colors=":black_f.5" stroke-width=".5" />
      </x-flex>
    </x-flex>    
    <apex-input 
      font="base" 
      placeholder="Enter wallet address or $handle" 
      width="65%" 
      :value.sync="address"
      @keydown="handleKey"
    />
  </x-flex>
</template>


<script>
import { XFlex, XIcon } from 'exude';
import ApexInput from '../form/ApexInput';
import ApexTitle from '../ApexTitle';


export default
{
    name: 'Home',
        
    components: { ApexInput, ApexTitle, XFlex, XIcon },
    
    data: () => ({ address: '' }),
    
    methods:
    {
        handleKey(evt)
        {
            if (evt.code.toLowerCase() === 'enter')
                this.$router.push({ name: 'tokens', params: { address: this.address } });              
        }
    }
}
</script>
