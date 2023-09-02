<template>
  <x-context #default="{ hideLbls }"> 
    <x-lister #default="{ array }" :filter-spec="filterSpec" :list="items">
      <x-field-list v-if="!hideLbls" #default="{ append, remove }" :value.sync="value">
        <x-flex wrap aligns=":center" margin="h12% t8 b5" gap="2:2">      
          <wallet-header margin="r2"> {{ array.length }} {{ label }} </wallet-header>
          <!-- @slot control buttons -->
          <slot v-if="items.length > 1" name="controls" :append="append" :disable="disable" />            
          <f-canvas-button 
            v-if="value.length"
            icon="close"
            title="clear all filters"
            @click="value = []"
          />
          <!-- @slot filter form entry -->
          <slot :remove="remove" />
        </x-flex>
      </x-field-list>
      <token-lister>
        <x-lister #iter="{ item }">
          <wallet-item :data="item" />
        </x-lister>
      </token-lister>
    </x-lister>
  </x-context>  
</template>


<script>
import { XContext, XFieldList, XFlex, XLister } from 'exude'
import { m_context } from 'exude'
import FCanvasButton from '../face/FCanvasButton'
import TokenLister from '_comps/TokenLister'
import WalletHeader from '_comps/WalletHeader'
import WalletItem from '_comps/WalletItem'
import escapeRE from '_source/lib/escape-re';
import { decode, encode } from '_source/lib/json-code';


export default
{
    name: 'WalletTokens',

    mixins: [ m_context('wallet').receiver ],

    components: 
    { 
        FCanvasButton,
        TokenLister, 
        WalletHeader, 
        WalletItem, 
        XContext, 
        XFieldList, 
        XFlex, 
        XLister 
    },
    
    props:
    {
        /**
            List of items to display.
        */
        items: Array,
        /**
            Label for entity count.
        */
        label: String
    },
    
    data: () => ({ value: [] }),

    created()
    {
        this.routeFilter = () =>
        {
            let { hash } = this.$route.params;
            this.value = hash ? decode(hash) : [];            
        }
        
        this.routeFilter();        
    },
    
    computed:
    {
        disable() 
        { 
            let { value } = this;
          
            let disable =
            {
                string: value.filter(v => v.filterType == 'string').length >= 4,
                collection: value.filter(v => v.filterType == 'collection').length >= 1
            }
            
            return disable;
        },
      
        filterSpec()
        {                      
            let $test = this.jsonSpec.map(value =>
            {
                let { filterType, ...spec } = value;
                
                if (filterType === 'string')
                {
                    let reTest = new RegExp(escapeRE(spec.$test), 'i');
                    
                    if (spec.$path.includes('collection'))
                    {
                        let { collections } = this.wallet.data;
                        
                        spec.$path = spec.$path.filter(p => p !== 'collection');
                        spec.$test = 
                        [
                            reTest,
                            // add collection lookup
                            v => reTest.test(collections.find(c => c.policyId === v.policyId).name)
                        ];
                    }
                    else
                    {
                        spec.$test = reTest;
                    }
                }
                    
                return spec;
            });
            
            return { $test, $and: true };
        },

        inputHash() { return this.jsonSpec.length ? encode(this.jsonSpec) : '' },

        jsonSpec()
        {
            return this.value.filter(({ $test, $path }) => 
            {              
                if (!$test) return false;
                if (!$path) return false;
                
                if (Array.isArray($test) && !$test.length) return false;
                if (Array.isArray($path) && !$path.length) return false;
                
                return true;
            });
        },
    },

    watch:
    {
        '$route.name'() { this.routeFilter(); },
        
        inputHash()
        {
            let name = this.label.toLowerCase() + '-filter';
          
            if (this.inputHash)
                this.$router.push({ name, params: { hash: this.inputHash } });
            else
                this.$router.push({ name });
        }      
    }
}
</script>
