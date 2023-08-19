<template>
  <x-text block colors="quarter" font="vBase">
    <x-flex 
      wrap 
      aligns=":center:center" 
      colors=":black_f.125" 
      border="a.1vw!gray"
      pad="v.8vw h1.8vw" 
      radius="a1vw" 
      gap="2vw"
      margin="a2.5vh" 
      shadow="floater"
    >
      <x-link @click="$router.push({ name: 'tokens' })">
        <f-stat label="Tokens" :active="$route.name === 'tokens'" :value="w.tokens.length" />
      </x-link>
      <x-link @click="$router.push({ name: 'collections' })">
        <f-stat label="Collections" :active="$route.name === 'collections'" :value="w.collections.length" />
      </x-link>
      <x-link @click="$router.push({ name: 'nfts' })">
        <f-stat label="NFTs" :active="$route.name.indexOf('nft') === 0" :value="w.nfts.length" />
      </x-link>
    </x-flex>
  </x-text>
</template>


<script>
import { XFlex, XLink, XText } from 'exude'
import { m_context } from 'exude'
import FStat from './face/FStat'


export default
{
    name: 'WalletTabs',
    
    mixins: [ m_context('wallet').receiver ],

    components: { FStat, XFlex, XLink, XText },
    
    computed:
    {        
        w() { return this.wallet.data; }
    }
}
</script>
