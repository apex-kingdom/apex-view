<template>
  <x-context v-if="w" #default="{ mobile }">
    <x-flex 
      wrap 
      aligns=":center:center" 
      colors=":black_f.125" 
      border="a.25!terti" 
      pad="v2 h4" 
      radius="a3" 
      gap="4:2" 
      margin="a2" 
      shadow="floater"
    >
      <f-data-value :value="w.input" label="wallet address" :font="mobile ? 'tiny' : 'small'" copy qr-code /> 
      <f-data-value :value="w.stakeKey" label="stake key" :font="mobile ? 'tiny' : 'small'" copy qr-code /> 
      <x-flex aligns=":center:center"> 
        <x-icon name="austral" :size="mobile ? 4 : 8" />
        <x-text bold :font="mobile ? 'base' : 'large'"> {{ w.adaFormatted }} </x-text>
      </x-flex>
      <component v-if="w.pool" v-bind="poolProps"> {{ w.pool.ticker || 'UNSTAKED' }} </component>
      <x-link @click="wallet.reload" title="reload data">
        <x-icon name="reload" size="7" align-v="middle" />
      </x-link>
    </x-flex>
  </x-context>
</template>


<script>
import { XContext, XFlex, XIcon, XLink, XText } from 'exude'
import { m_context } from 'exude'
import FDataValue from './face/FDataValue'


export default
{
    name: 'WalletInfo',
    
    mixins: [ m_context('wallet').receiver ],

    components: { FDataValue, XContext, XFlex, XIcon, XLink, XText },
    
    computed:
    {
        poolProps()
        {
            let props = 
            {
                is: 'x-text',
                colors: 'terti',
                font: this.mobile ? 'base' : 'large'
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
