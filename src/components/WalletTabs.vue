<template>
  <x-text block colors="quarter" font="vBase">
    <x-flex 
      wrap 
      aligns=":center:center" 
      colors=":black_f.125" 
      border="a.1vw!gray"
      pad="v.6vw h1.8vw" 
      radius="a1vw" 
      gap="1.5vw:1.5vw"
      margin="a2.5vh" 
      shadow="floater"
    >
      <template v-for="({ name, label }) of sections">
        <x-link :key="name" @click="$router.push({ name })">
          <f-stat :label="label" :active="$route.name.indexOf(name) === 0" :value="w[name].length" />
        </x-link>
      </template>
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
        sections()
        {
            let sections =
            [
                { label: 'Tokens', name: 'tokens' },
                { label: 'Collections', name: 'collections' },
                { label: 'NFTs', name: 'nfts' }
            ];
            
            return sections;
        },
      
        w() { return this.wallet.data; },
    }
}
</script>
