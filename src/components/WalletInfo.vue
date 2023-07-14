<template>
  <x-context v-if="w" #default="{ mobile }">
    <x-flex 
      wrap 
      aligns=":center:center" 
      colors=":black" 
      border="a.25!terti" 
      pad="v2 h4" 
      radius="a3" 
      gap="4:2" 
      margin="a4" 
      shadow="floater"
    >
      <a-address :value="w.address" label="wallet address" :small="mobile" copy qr-code /> 
      <a-address :value="w.stakeKey" label="stake key" :small="mobile" copy qr-code /> 
      <x-flex aligns=":center:center"> 
        <x-icon name="austral" :size="mobile ? 4 : 8" />
        <x-text bold :font="mobile ? 'base' : 'large'"> {{ w.ada }} </x-text>
      </x-flex>
      <x-text colors="terti" :font="mobile ? 'base' : 'large'"> 
        {{ w.stakePool || 'UNSTAKED' }} 
      </x-text>
    </x-flex>
  </x-context>
</template>


<script>
import { XContext, XFlex, XIcon, XText } from 'exude'
import { m_context } from 'exude'
import AAddress from './util/AAddress'


export default
{
    name: 'WalletInfo',
    
    mixins: [ m_context('wallet').receiver ],

    components: { AAddress, XContext, XFlex, XIcon, XText },
    
    computed:
    {
        w() { return this.wallet.data; }
    }    
}
</script>
