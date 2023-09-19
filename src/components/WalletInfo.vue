<template>
  <f-overbox>
    <f-data-value 
      :value="w.input" 
      label="wallet address" 
      font="vSmall" 
      icon-size="address" 
      copy 
      :action="handleClick" 
    /> 
    <x-flex aligns=":center:center"> 
      <x-icon name="austral" size="austral" />
      <x-text bold font="vBase"> {{ w.adaFormatted }} </x-text>
    </x-flex>
    <component v-if="w.pool" v-bind="poolProps"> {{ w.pool.ticker || 'UNSTAKED' }} </component>
    <x-link display="flex" title="reload data" @click="wallet.reload">
      <x-icon name="reload" size="austral" />
    </x-link>
  </f-overbox>
</template>


<script>
import { XFlex, XIcon, XLink, XText } from 'exude'
import { m_context } from 'exude'
import FDataValue from './face/FDataValue'
import FOverbox from './face/FOverbox'


export default
{
    name: 'WalletInfo',
    
    mixins: [ m_context('wallet').receiver ],

    components: { FDataValue, FOverbox, XFlex, XIcon, XLink, XText },
    
    computed:
    {
        poolProps()
        {
            let props = 
            {
                is: 'x-text',
                colors: 'terti',
                font: 'vBase'
            };
            
            if (this.w.pool.home)
            {
                props.is = 'x-link';
                props.href = this.w.pool.home;
                props.title = 'visit pool homepage'
                props.target = '_blank';
            }
            
            return props;
        },
        
        w() { return this.wallet.data; }
    },
    
    methods:
    {
        handleClick() { this.wallet.showConsole(this.wallet.data); }
    }
}
</script>
