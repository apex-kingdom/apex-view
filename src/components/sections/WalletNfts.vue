<template>
  <x-box> 
    <wallet-header> {{ list.length }} NFTs </wallet-header>
    <token-lister>
      <wallet-item v-for="t in list" :key="t.fingerprint" :data="t" />
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
    name: 'WalletNfts',

    mixins: [ m_context('wallet').receiver ],

    components: { TokenLister, WalletHeader, WalletItem, XBox },
    
    computed:
    {
        c() { return this.$route.query.c; },
        
        list() 
        { 
            let { nfts } = this.wallet.data;
            
            if (this.c)
                return nfts.filter(nft => nft.policyId === this.c);
            
            return nfts;
        }
    }    
}
</script>
