<template>
  <x-context #default="{ ext }"> 
    <wallet-section label="NFTs" :items="nfts">
      <template #controls="{ append, disable }">
        <f-canvas-button  
          icon="search_collection"
          title="add collection filter"
          :disabled="disable.collection"
          @click="append(defaultCollectionFilter)"
        />
        <f-canvas-button  
          icon="search_text"
          title="add text filter"
          :disabled="disable.string"
          @click="append(defaultStringFilter)"
        />
      </template>
      <template #default="{ remove }">
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
      </template>
    </wallet-section>
  </x-context>
</template>


<script>
import { XContext, XLister } from 'exude'
import { m_context } from 'exude'
import CollectionFilter from '../filtering/CollectionFilter'
import FCanvasButton from '../face/FCanvasButton'
import StringFilter from '../filtering/StringFilter'
import WalletSection from './WalletSection'


export default
{
    name: 'WalletNfts',

    mixins: [ m_context('wallet').receiver ],

    components: { CollectionFilter, FCanvasButton, StringFilter, WalletSection, XContext, XLister },

    data: () => 
    ({ 
        defaultCollectionFilter: { filterType: 'collection', $path: 'policyId' },
        defaultStringFilter: { filterType: 'string', $path: ['traits/keyvals', 'name'] }
    }),
    
    created()
    {
        this.stringOptionData =
        [
            // { data: 'collection', color: 'collection', label: 'Collection Name' },
            { data: 'traits/keyvals', color: 'attribute', label: 'Attribute/Trait' },
            { data: 'traits', color: 'trait', label: 'Trait' },
            { data: 'name', color: 'name', label: 'Name' },
            { data: 'description', color: 'description', label: 'Description' },
            { data: 'onchainMetadataStandard', color: 'metadata', label: 'Metadata Standard' }
        ];            
    },
    
    computed:
    {
        collections() { return this.wallet.data.collections; },
        
        nfts() { return this.wallet.data.nfts; }        
    }
}
</script>
