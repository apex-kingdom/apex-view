<template>
  <x-box> 
    <wallet-header> {{ w.tokens.length }} Tokens </wallet-header>
    <token-lister>
      <wallet-item v-for="t in w.tokens" :key="t.fingerprint" :data="t" />
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
    name: 'WalletTokens',

    mixins: [ m_context('wallet').receiver ],

    components: { TokenLister, WalletHeader, WalletItem, XBox },
    
    computed:
    {
        w() { return this.wallet.data; }
    }    
}
</script>
