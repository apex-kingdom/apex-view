<template>
  <x-context #default="{ bgColor, ext, hideLbls }"> 
    <x-lister #default="{ array }" :filter-spec="filterSpec" :list="nfts">
      <x-field-list v-if="!hideLbls" #default="{ append, remove }" :value.sync="value">
        <x-flex wrap aligns=":center" margin="h15% t8 b5" gap="2:2">
          <x-flex aligns=":center" gap="2" flex="100%">      
            <wallet-header margin="r2"> {{ array.length }} NFTs </wallet-header>
            <f-canvas-button  
              icon="search_collection"
              title="add collection filter"
              :disabled="disableCollection"
              @click="append(defaultCollectionFilter)"
            />
            <f-canvas-button  
              icon="search_text"
              title="add text filter"
              :disabled="disableString"
              @click="append(defaultStringFilter)"
            />
            <f-canvas-button  
              v-if="value.length"
              icon="close"
              title="clear all filters"
              @click="value = []"
            />
          </x-flex>      
          <x-lister #iter="{ item: { filterType }, index }">
            <string-filter 
              v-if="filterType == 'string'" 
              :name="index"
              :optionData="stringOptionData" 
              :border="`a.25!${ext.diff}_f.25`" 
              @remove="remove(index)" 
            />
            <collection-filter 
              v-if="filterType == 'collection'" 
              :name="index" 
              :collections="collections" 
              :border="`a.25!${ext.diff}_f.25`" 
              @remove="remove(index)" 
            />
          </x-lister>
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
import { XButton, XContext, XFieldList, XFlex, XIcon, XLister } from 'exude'
import { m_context } from 'exude'
import CollectionFilter from '../filtering/CollectionFilter'
import FCanvasButton from '../face/FCanvasButton'
import StringFilter from '../filtering/StringFilter'
import TokenLister from '../TokenLister'
import WalletHeader from '../WalletHeader'
import WalletItem from '../WalletItem'
import escapeRE from '_source/lib/escape-re';
import { decode, encode } from '_source/lib/json-code';


export default
{
    name: 'WalletNfts',

    mixins: [ m_context('wallet').receiver ],

    components: 
    { 
        CollectionFilter,
        FCanvasButton,
        StringFilter, 
        TokenLister, 
        WalletHeader, 
        WalletItem, 
        XButton, 
        XContext, 
        XFieldList, 
        XFlex, 
        XIcon, 
        XLister 
    },
    
    data: () => 
    ({ 
        defaultCollectionFilter: { filterType: 'collection', $path: 'policyId' },
        defaultStringFilter: { filterType: 'string', $path: ['traits/keyvals', 'name'] },
        value: [] 
    }),
    
    created()
    {
        this.routeFilter = () =>
        {
            let { hash } = this.$route.params;
            this.value = hash ? decode(hash) : [];            
        }
        
        this.routeFilter();
        
        this.stringOptionData =
        [
            { data: 'traits/keyvals', color: 'attribute', label: 'Attribute/Trait' },
            { data: 'traits', color: 'trait', label: 'Trait' },
            { data: 'name', color: 'name', label: 'Name' }                
        ];            
    },
    
    computed:
    {
        collections() { return this.wallet.data.collections; },
        
        disableCollection() { return this.value.filter(v => v.filterType == 'collection').length >= 1; },

        disableString() { return this.value.filter(v => v.filterType == 'string').length >= 4; },
        
        filterSpec()
        {                      
            let $test = this.jsonSpec.map(value =>
            {
                let { filterType, ...spec } = value;
                
                if (filterType === 'string')
                    spec.$test = new RegExp(escapeRE(spec.$test), 'i');
                    
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
        
        nfts() { return this.wallet.data.nfts; }        
    },
    
    watch:
    {
        '$route.name'() { this.routeFilter(); },
        
        inputHash()
        {
            if (this.inputHash)
                this.$router.push({ name: 'nft-filter', params: { hash: this.inputHash } });
            else
                this.$router.push({ name: 'nft-filter' });
        }      
    }
}
</script>
