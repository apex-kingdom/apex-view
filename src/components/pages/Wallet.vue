<template>
  <x-context #default="{ hideCtrls, cs, rs }">
    <x-flex v-if="data" invert aligns=":center">
      <x-exapse no-scroll :expand="!hideCtrls" max-breadth="85%" pos="fixed" trbl="t0" z-index="10">
        <wallet-info />
      </x-exapse>
      <x-box :margin="`v${ hideCtrls ? 0 : '12vh' }`" place-self="stretch">
        <router-view />
      </x-box> 
      <x-exapse lower no-scroll :expand="!hideCtrls" max-breadth="90%" pos="fixed" trbl="b0" z-index="10">
        <wallet-tabs />
      </x-exapse>
    </x-flex>
    <x-box pos="fixed" trbl="t0 b0 r0" z-index="20" radius="t6 l6">
      <e-background :image="`linear-gradient(#99999922 50%, #66666622 0)`" size="50 50" />
      <e-background :image="`linear-gradient(72deg, #99999922 50%, #22222222 0)`" size="50 50" />
      <e-background :image="`linear-gradient(144deg, #99999922 50%, #22222222 0)`" size="50 50" />
      <e-background :image="`linear-gradient(216deg, #99999922 50%, #22222222 0)`" size="50 50" />
      <e-background :image="`linear-gradient(288deg, #99999922 50%, #22222222 0)`" size="50 50" />
      <wallet-console :show.sync="showConsole" :title="title">
        <component :is="details" :data="consoleData" />
      </wallet-console>
    </x-box>
    <f-site-loading :opacity="loading ? 1 : 0" :z-index="loading ? 1000 : -1" />
    <f-wallet-error v-if="error" :error="error" />
  </x-context>
</template>


<script>
import { EBackground, XBox, XContext, XExapse, XFlex } from 'exude'
import { m_context } from 'exude'
import FSiteLoading from '../face/FSiteLoading'
import FWalletError from '../face/FWalletError'
import TokenDetails from '../TokenDetails'
import WalletConsole from '../WalletConsole'
import WalletDetails from '../WalletDetails'
import WalletInfo from '../WalletInfo'
import WalletTabs from '../WalletTabs'
import shorten from '_source/lib/shorten'
import wallet from '_source/lib/wallet'


export default
{
    name: 'Wallet',
        
    mixins: [ m_context('wallet').provider ],
    
    components: 
    { 
        FSiteLoading, 
        FWalletError, 
        TokenDetails, 
        WalletConsole, 
        WalletDetails,
        WalletInfo, 
        WalletTabs, 
        EBackground, 
        XBox, 
        XContext, 
        XExapse, 
        XFlex 
    },
    
    data: () => 
    ({ 
        address: null, 
        consoleData: {},
        data: null, 
        error: null,
        loading: false,
        showConsole: false, 
    }),
    
    computed:
    {
        details()
        {
            switch(this.entity)
            {
                case 'account': 
                    return 'wallet-details';
                case 'collection': 
                case 'asset': 
                    return 'token-details';
            }
        },
      
        entity() { return this.consoleData.__entity; },
        
        title() 
        {          
            switch(this.entity)
            {
                case 'account': 
                    return shorten(this.consoleData.input, 8);
                case 'collection': 
                    return this.consoleData.name;
                case 'asset': 
                    return this.consoleData.title;
            }
        }
    },
    
    watch:
    {
        address() 
        { 
            this.data = null;
            this.requestData().then(data => { this.data = data; this.updateHistory(this.address) });
        },
        
        '$route.params':
        {
            handler({ address }) { this.address = address },
            immediate: true
        }
    },
    
    methods:
    {
        provideWalletContext()
        {
            let obj = 
            {
                reload: () => this.requestData(true).then(data => this.data = data),             
                showConsole: data =>
                {
                    if (this.showConsole && this.consoleData === data)
                    {
                        this.showConsole = false;
                    }
                    else
                    {
                        this.consoleData = data;
                        this.showConsole = true;
                    }
                }
            };
            
            Object.defineProperty(obj, 'data', { get: () => this.data || {}, enumerable: true });

            return obj;           
        },
        
        requestData(reset)
        {
            this.loading = true;
            
            return wallet(this.address, reset)
                .catch(error => { this.data = null; throw this.error = error; })
                .finally(() => { this.loading = false; });    
        }, 
        
        updateHistory(address)
        {
            if (address)
            {
                let addys = JSON.parse(window.localStorage.getItem('addys') || '[]');
                let index = 0;
                // remove current address from list if exists
                while ((index = addys.indexOf(address)) >= 0)
                    addys = [ ...addys.slice(0, index), ...addys.slice(index + 1) ];
                
                addys.unshift(address);
                // limit saved addresses to 50
                addys = addys.slice(0, 50);
                
                window.localStorage.setItem('addys', JSON.stringify(addys));
            }
        }
    }
}
</script>
