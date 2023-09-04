<template>
  <x-context #default="{ bgColor, ext, sm, hideCtrls, hideCnts }"> 
    <x-lister #default="{ array }" :filter-spec="filterSpec" :list="sortedItems">
      <x-flex wrap aligns=":center" margin="h12% t8 b5" gap="1.5:2">
        <x-text v-if="!hideCnts" block bold font="h5" :colors="`${ext.diff}_f.25`" pad="h1">
          {{ array.length }} {{ label }}
        </x-text>        
        <x-field-list v-if="!hideCtrls" #default="{ append, remove }" :value.sync="value">
          <div v-if="items.length > 1" style="position:relative">
            <f-canvas-button icon="sort" title="sort items" @click="show = !show" />
            <x-drop-menu :show.sync="show" space="nowrap" min-breadth="100%" radius="a2" shadow="entry" z-index="10">
              <x-flex invert :colors="`${ext.diff}:${bgColor}${sm}.5`" width="100%">
                <x-choose 
                  form-context="sort" 
                  :value="sort" 
                  font="base" 
                  align="left" 
                  pad="v1 h2" 
                  @update:value="handleUpdate"
                >
                  <x-option 
                    v-for="key of sortKeys" 
                    #default="{ selected }" 
                    :key="key" 
                    :hf-colors="`${ext.same}:${ext.diff}`"
                  >
                    <x-flex aligns=":center" align="left" gap="2">
                      <x-icon :name="selected ? 'radio' : 'radioEmpty'" :size="iconSize" />
                      <span>{{ sorting[key].label }}</span>
                    </x-flex>
                  </x-option>                
                </x-choose>
              </x-flex>
            </x-drop-menu>
          </div>
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
        </x-field-list>
      </x-flex>
      <token-lister>
        <x-lister #iter="{ item }">
          <wallet-item :data="item" />
        </x-lister>
      </token-lister>
    </x-lister>
  </x-context>  
</template>


<script>
import { XButton, XChoose, XContext, XDropMenu, XFieldList, XFlex, XIcon, XLister, XOption, XText } from 'exude'
import { m_context } from 'exude'
import FCanvasButton from '../face/FCanvasButton'
import TokenLister from '_comps/TokenLister'
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
        WalletItem, 
        XButton, 
        XChoose, 
        XContext, 
        XDropMenu, 
        XFieldList, 
        XFlex, 
        XIcon, 
        XLister, 
        XOption, 
        XText
    },
    
    props:
    {
        /**
            Icon size.
        */
        iconSize: { type: Number, default: 8 },
        /**
            List of items to display.
        */
        items: Array,
        /**
            Label for entity count.
        */
        label: String,
    },
    
    data()
    {
        let sorting =
        {
            time: { label: 'Date', fn: (a, b) => a.mintTime - b.mintTime, },
            timeDesc: { label: 'Date (desc)', fn: (a, b) => (b.mintTime - a.mintTime) },
            name: { label: 'Name', fn: (a, b) => a.name.localeCompare(b.name) },
            nameDesc: { label: 'Name (desc)', fn: (a, b) => b.name.localeCompare(a.name) },
        };
        
        return { show: false, sort: 'time', sorting, sortKeys: Object.keys(sorting), value: [] };
    },

    created()
    {
        this.routeFilter = () =>
        {
            let { hash } = this.$route.params;
            this.value = hash ? decode(hash) : [];            
        }
        
        this.routeFilter();
        
        this.sort = localStorage.getItem(this.label.toLowerCase() + '-sort') || 'time';
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
        
        sortedItems() 
        {
            let { items, sorting, sort } = this;
            return sort ? items.sort(sorting[sort].fn) : items; 
        }
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
        },
        
        sort() { localStorage.setItem(this.label.toLowerCase() + '-sort', this.sort); }
    },
    
    methods:
    {
        handleUpdate(value) { this.sort = value; this.show = false; }
    }
}
</script>
