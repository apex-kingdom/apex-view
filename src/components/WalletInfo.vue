<template>
  <x-flex 
    wrap 
    aligns=":center:center" 
    colors=":black_f.125" 
    border="a.1vw!terti!"
    pad="v.8vw h1.8vw" 
    radius="a1vh" 
    gap="2vw"
    margin="a2.5vh" 
    shadow="floater"
  >
    <f-data-value :value="w.input" label="wallet address" font="vSmall" icon-size="1.25vw" copy qr-code /> 
    <f-data-value :value="w.stakeKey" label="stake key" font="vSmall" icon-size="1.25vw" copy qr-code /> 
    <x-flex aligns=":center:center"> 
      <x-icon name="austral" size="2.25vw" />
      <x-text bold font="vBase"> {{ w.adaFormatted }} </x-text>
    </x-flex>
    <component v-if="w.pool" v-bind="poolProps"> {{ w.pool.ticker || 'UNSTAKED' }} </component>
    <x-link display="flex" title="reload data" @click="wallet.reload">
      <x-icon name="reload" size="2.25vw" />
    </x-link>
  </x-flex>
</template>


<script>
import { XFlex, XIcon, XLink, XText } from 'exude'
import { m_context } from 'exude'
import FDataValue from './face/FDataValue'


export default
{
    name: 'WalletInfo',
    
    mixins: [ m_context('wallet').receiver ],

    components: { FDataValue, XFlex, XIcon, XLink, XText },
    
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
    }
}
</script>
