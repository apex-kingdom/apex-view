<template>
  <x-box> 
    <wallet-header margin="h15% v8"> {{ w.collections.length }} Collections </wallet-header>
    <token-lister>
      <wallet-item v-for="t in w.collections" :key="t.fingerprint" :data="t" />
    </token-lister>
  </x-box>
</template>


<script>
import { XBox } from 'exude'
import { m_context } from 'exude'
import TokenLister from '_comps/TokenLister'
import WalletHeader from '_comps/WalletHeader'
import WalletItem from '_comps/WalletItem'


export default
{
    name: 'WalletCollections',

    mixins: [ m_context('wallet').receiver ],

    components: { TokenLister, WalletHeader, WalletItem, XBox },
    
    computed:
    {
        w() { return this.wallet.data; }
    }    
}
</script>
