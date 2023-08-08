<template>
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
      colors="white:black" 
      border="t.25!prime" 
      :width="size" 
      :count="24" 
      font="micro" 
      pad="a1"
      margin="hauto"
    />
  </x-box>
</template>



<script>
import { XBox, XFlex, XQrCode } from 'exude'
import FDataValue from './face/FDataValue'


export default
{
    name: 'WalletDetails',
    
    components: { FDataValue, XBox, XFlex, XQrCode },
    
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
        }
    }
}
</script>
