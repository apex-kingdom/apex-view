<template>
  <x-context v-if="w" #default="{ mobile }">
    <x-text block colors="quarter" :font="mobile ? 'small' : 'base'">
      <x-flex 
        wrap 
        aligns=":center:center" 
        colors=":black_f.125" 
        border="a.25!terti" 
        pad="v2 h4" 
        radius="a3" 
        gap="6:2" 
        margin="a2" 
        shadow="floater"
      >
        <x-link @click="$router.push({ name: 'tokens' })">
          <f-stat label="Tokens" :active="$route.name === 'tokens'" :value="w.tokens.length" />
        </x-link>
        <x-link @click="$router.push({ name: 'collections' })">
          <f-stat label="Collections" :active="$route.name === 'collections'" :value="w.collections.length" />
        </x-link>
        <x-link @click="$router.push({ name: 'nfts' })">
          <f-stat label="NFTs" :active="$route.name === 'nfts'" :value="w.nfts.length" />
        </x-link>
      </x-flex>
    </x-text>
  </x-context>
</template>


<script>
import { XContext, XFlex, XLink, XText } from 'exude'
import { m_context } from 'exude'
import FStat from './face/FStat'


export default
{
    name: 'WalletTabs',
    
    mixins: [ m_context('wallet').receiver ],

    components: { FStat, XContext, XFlex, XLink, XText },
    
    computed:
    {        
        w() { return this.wallet.data; }
    }
}
</script>
