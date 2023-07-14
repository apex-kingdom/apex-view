<template>
  <x-context v-if="w" #default="{ mobile }">
    <x-text block colors="quarter" :font="mobile ? 'small' : 'base'">
      <x-flex 
        wrap 
        aligns=":center:center" 
        colors=":black" 
        border="a.25!terti" 
        pad="v2 h4" 
        radius="a3" 
        gap="6:2" 
        margin="a4" 
        shadow="floater"
      >
        <x-link @click="$router.push({ name: 'tokens' })">
          <a-stat label="Tokens" :value="w.tokens.length" />
        </x-link>
        <x-link @click="$router.push({ name: 'collections' })">
          <a-stat label="Collections" :value="w.collections.length" />
        </x-link>
        <x-link @click="$router.push({ name: 'nfts' })">
          <a-stat label="NFTs" :value="w.nfts.length" />
        </x-link>
      </x-flex>
    </x-text>
  </x-context>
</template>


<script>
import { XContext, XFlex, XLink, XText } from 'exude'
import { m_context } from 'exude'
import AStat from './util/AStat'


export default
{
    name: 'DWalletInfo',
    
    mixins: [ m_context('wallet').receiver ],

    components: { AStat, XContext, XFlex, XLink, XText },
    
    computed:
    {
        w() { return this.wallet.data; }
    }    
}
</script>
