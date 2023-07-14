<template>
  <div @click="print">
    <token-thumb :title="title" :count="count" :image="image" :image-type="imageType"/>
  </div>
</template>


<script>
import { XBox } from 'exude'
import TokenThumb from '_comps/TokenThumb'


export default
{
    name: 'WalletItem',

    components: { TokenThumb, XBox },
    
    props:
    {
        /**
            Item data object.
        */
        data: Object
    },
    
    computed:
    {
        count() { return this.isNft && !this.data.collection_name ? null : this.data.user_quantity; },
        
        image() { return this.isNft ? this.ocmeta.image : this.meta.logo; },
      
        imageType() { return this.isNft ? null : 'png'; },
        
        isNft() { return this.data.isNFT; },

        meta() { return this.data.metadata || {}; },
        
        ocmeta() { return this.data.onchain_metadata || {}; },

        title() 
        { 
            let title = '';
            
            if (this.isNft)
                title = this.data.collection_name;
            else
                title = this.meta.ticker;
                
            return title || this.data.asset_name_dec;
        },
    },
    
    methods:
    {
        print() { console.log('item', this.data); }
    }
}
</script>
