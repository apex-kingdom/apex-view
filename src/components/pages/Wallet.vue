<template>
  <x-context #default="{ hideCtrls, cs }">
    <x-flex v-if="data" invert aligns=":center">
      <x-exapse :expand="!hideCtrls" max-breadth="75%" pos="fixed" trbl="t0" pad="t3" z-index="10">
        <wallet-info />
      </x-exapse>
      <x-box :margin="`h${cs} v30`">
        <router-view />
      </x-box> 
      <x-exapse lower :expand="!hideCtrls" max-breadth="75%" pos="fixed" trbl="b0" pad="b3" z-index="10">
        <wallet-tabs />
      </x-exapse>
    </x-flex>
  </x-context>
</template>


<script>
import { XBox, XContext, XExapse, XFlex } from 'exude'
import { m_context } from 'exude'
import WalletInfo from '../WalletInfo'
import WalletTabs from '../WalletTabs'
import account from '_source/lib/account'


export default
{
    name: 'Wallet',
        
    mixins: [ m_context('wallet').provider ],
    
    components: { WalletInfo, WalletTabs, XBox, XContext, XExapse, XFlex },
    
    data: () => ({ data: null }),
    
    watch:
    {
        '$route.params': 
        {
            handler({ address, group }) 
            { 
                this.data = null;       
                account(address).then(data => this.data = data);                
            },
            immediate: true
        }
    },
    
    methods:
    {
        provideWalletContext()
        {
            let obj = {}

            Object.defineProperty(obj, 'data', { get: () => this.data || {}, enumerable: true });

            return obj;           
        }
    }
}
</script>
