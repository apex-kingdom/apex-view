<template>
  <token-thumb 
    :title="token.name" 
    :count="count" 
    :image="token.image" 
    :image-type="token.imageType" 
    @open="handleOpen" 
    @amount="handleAmount" 
  />
</template>


<script>
import { XBox } from 'exude'
import { m_context } from 'exude'
import TokenThumb from '_comps/TokenThumb'
import { encode } from '_source/lib/json-code';
import { extra } from '_source/lib/wallet';


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
    
    data: () => ({ token: {} }),
    
    computed:
    {
        count() { return this.token.isNFT ? null : this.token.userQuantityFormatted; },              

        isCollection() { return this.token.__entity === 'collection' }
    },
    
    watch:
    {
        data:
        {
            handler()
            {
                this.token = this.data;
                extra(this.data).__ready.then(data => this.token = { ...data });
            },
            immediate: true
        }
    },
    
    methods:
    {
        handleAmount() 
        {
            if (this.isCollection)
            {
                let filter = 
                [ 
                    { $test: [ this.token.policyId ], filterType: 'collection', $path: 'policyId' } 
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
            console.log(this.token.name, this.token);
            
            if (this.wallet)
                this.wallet.showConsole(this.data);
        }        
    }
}
</script>
