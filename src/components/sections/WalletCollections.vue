<template>
  <x-box> 
    <token-lister>
      <wallet-item v-for="t in w.collections" :key="t.fingerprint" :data="t" />
    </token-lister>
  </x-box>
</template>


<script>
import { XBox } from 'exude'
import { m_context } from 'exude'
import TokenLister from '_comps/TokenLister'
import WalletItem from '_comps/WalletItem'


export default
{
    name: 'WalletCollections',

    mixins: [ m_context('wallet').receiver ],

    components: { TokenLister, WalletItem, XBox },
    
    computed:
    {
        w() { return this.wallet.data; }
    }    
}
</script>
