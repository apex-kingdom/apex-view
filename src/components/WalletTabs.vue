<template>
  <f-overbox>
    <e-stylesheet colors="quarter" font="vBase" />
    <template v-for="({ name, label }) of sections">
      <x-link :key="name" @click="$router.push({ name })">
        <f-stat :label="label" :active="$route.name.indexOf(name) === 0" :value="w[name].length" />
      </x-link>
    </template>
  </f-overbox>
</template>


<script>
import { EStylesheet, XLink, XText } from 'exude'
import { m_context } from 'exude'
import FOverbox from './face/FOverbox'
import FStat from './face/FStat'


export default
{
    name: 'WalletTabs',
    
    mixins: [ m_context('wallet').receiver ],

    components: { EStylesheet, FOverbox, FStat, XLink, XText },
    
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
