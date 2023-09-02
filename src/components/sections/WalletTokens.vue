<template>
  <x-context #default="{ ext }"> 
    <wallet-section label="Tokens" :items="tokens">
      <template #controls="{ append, disable }">
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
        </x-lister>
      </template>
    </wallet-section>
  </x-context>
</template>


<script>
import { XContext, XLister } from 'exude'
import { m_context } from 'exude'
import FCanvasButton from '../face/FCanvasButton'
import StringFilter from '../filtering/StringFilter'
import WalletSection from './WalletSection'


export default
{
    name: 'WalletTokens',

    mixins: [ m_context('wallet').receiver ],

    components: { FCanvasButton, StringFilter, WalletSection, XContext, XLister },

    data: () => 
    ({ 
        defaultStringFilter: { filterType: 'string', $path: ['name'] },
    }),

    created()
    {
        this.stringOptionData =
        [
            { data: 'name', color: 'name', label: 'Name' },            
            { data: 'description', color: 'description', label: 'Description' },         
            { data: 'onchainMetadataStandard', color: 'metadata', label: 'Metadata Standard' }
        ];            
    },
    
    computed:
    {
        tokens() { return this.wallet.data.tokens; }        
    }
}
</script>
