<template>
  <token-thumb 
    :title="data.name" 
    :count="count" 
    :image="data.image" 
    :image-type="data.imageType" 
    @open="handleOpen" 
    @amount="handleAmount" 
  />
</template>


<script>
import { XBox } from 'exude'
import { m_context } from 'exude'
import TokenThumb from '_comps/TokenThumb'
import { encode } from '_source/lib/json-code';


export default
{
    name: 'WalletItem',

    mixins: [ m_context('wallet').consumer ],

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
        count() { return this.data.isNFT ? null : this.data.userQuantityFormatted; },              

        isCollection() { return this.data.__entity === 'collection' },
    },
    
    methods:
    {
        handleAmount() 
        {
            if (this.isCollection)
            {
                let filter = 
                [ 
                    { $test: [ this.data.policyId ], filterType: 'collection', $path: 'policyId' } 
                ];
                this.$router.push({ name: 'nfts-filter', params: { hash: encode(filter) } });
            }
            else if (this.wallet)
            {
                this.wallet.showConsole(this.data);
            }
        },
        
        handleOpen() 
        { 
            console.log(this.data.name, this.data);
            
            if (this.wallet)
                this.wallet.showConsole(this.data);
        }        
    }
}
</script>
