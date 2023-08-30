<template>
  <x-context #default="{ bgColor, ext, sm }">
    <x-box width="100%">
      <x-qr-code 
        :content="data.stakeKey" 
        :padding="2" 
        colors="quarter:gray_f.25" 
        :width="size" 
        :height="size" 
        margin="hauto"
      />
      <f-data-value 
        v-bind="assetProps" 
        copy 
        aligns=":center:center" 
        colors="#EEEEEE:black_f.25" 
        border="v.25!quarter_f.5" 
        :width="size" 
        :count="24" 
        font="micro" 
        pad="a1"
        margin="hauto"
      />
      <x-grid cols="1fr 1fr" gap="1:1" :width="size" margin="hauto v5" pad="h2">
        <template v-for="({ label, value }) in gridData">
          <x-flex :key="label" aligns=":center" :colors="`:${ext.diff}_f.35`" pad="v1.5 h2"> 
            <x-text font="small" :colors="`${bgColor+sm}.6`"> {{ label }} </x-text>
          </x-flex>
          <x-flex :key="value" :colors="`${ext.same}:${ext.diff}_f.4`" pad="v1.5 h2"> 
            <x-text :colors="ext.same"> {{ value }} </x-text>
          </x-flex>
        </template>
      </x-grid>
    </x-box>
  </x-context>
</template>



<script>
import { XBox, XContext, XFlex, XGrid, XQrCode, XText } from 'exude'
import FDataValue from './face/FDataValue'


export default
{
    name: 'WalletDetails',
    
    components: { FDataValue, XBox, XContext, XFlex, XGrid, XQrCode, XText },
    
    props:
    {
        /**
            Scale unit image size.
        */
        size: { type: Number, default: 90 },
        /**
            Wallet data to be displayed.
        */
        data: Object
    },
    
    computed:
    {
        assetProps()
        {
            let props = 
            {
                label: 'stake key',
                value: this.data.stakeKey
            };
                    
            return props;
        },
        
        gridData()
        {
            let { data } = this;
          
            let gdata = 
            [
                { label: '₳ Amount', value: data.adaFormatted },
                { label: '₳ Rewards Total', value: data.rewardsFormatted },
                { label: 'Asset Count', value: data.tokens.length + data.nfts.length },
                { label: 'Stake Pool', value: data.pool.ticker || 'UNSTAKED' },
                { label: 'Since Epoch', value: data.epoch || '???' },
            ];
            
            return gdata;
        }
    }
}
</script>
