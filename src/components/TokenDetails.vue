<template>
  <x-context #default="{ bgColor, ext, dm, apex }">
    <x-box :key="assetProps.value" width="100%">
      <f-token-image iconbar :image="token.image" :image-type="token.imageType" :size="size" margin="hauto" />
      <x-flex 
        aligns=":center:space-around" 
        colors="#EEEEEE:black_f.25" 
        border="v.25!white_f.5" 
        :width="size" 
        pad="a1"
        margin="hauto"
      >
        <f-data-value 
          v-bind="assetProps" 
          copy 
          aligns=":center:center" 
          :count="!ocmds !== !mintDate ? 18 : ocmds && mintDate ? 16 : 24" 
          font="micro" 
        />
        <x-text v-if="mintDate" font="micro" colors="quarter"> {{ mintDate }} </x-text> 
        <x-text v-if="ocmds" font="micro" colors="second"> {{ ocmds }} </x-text>
      </x-flex>
      <x-flex invert aligns=":center" margin="v5 h3">
        <x-text 
          v-if="token.description" 
          block
          align="center"
          font="base" 
          :colors="`${ext.diff}:${bgColor}_r-30_f.5`" 
          :border="`a.5!${bgColor}_r-20`"
          pad="v2 h3" 
          margin="b5"
          radius="a3"
          over-wrap="anywhere"
        >
          {{ token.description }}
        </x-text>
        <x-link 
          v-if="token.homepage" 
          font="micro"
          :colors="`${apex.diff}_f.5:${apex.diff}_f.75`" 
          :hf-colors="ext.diff" 
          :href="token.homepage" 
          target="_blank" 
          pad="v1 h3"
          radius="a10"
        >
          <x-icon name="web" size="4" align-v="middle" /> {{ token.homepage }}
        </x-link>
      </x-flex>
      <f-traits v-if="token.isNFT" :object="token.traits" @trait="heTrait" />
      <f-traits v-if="isCollection" #default="{ attr, value }" :object="token.traits" box-width="100%">
        <template v-for="(key, idx) in Object.keys(value).sort()">
          <x-flex 
            el="button"
            pointer
            :colors="`:${bgColor}_f.75`" 
            :hf-colors="`:${bgColor}_f.25`" 
            over-wrap="anywhere" 
            width="100%"
            pad="h1"
            margin="v1" 
            @click="heTrait({ attr, trait: key })"
          >
            <x-box :key="key" align="left" xelf="5" pad="a1"> 
              {{ key || '---' }} 
            </x-box>
            <x-box :key="key + '_ct'" align="right" xelf="1" pad="a1"> 
              {{ value[key] }} 
            </x-box>
          </x-flex>
        </template>
      </f-traits>
      <!-- <x-box :height="size" :width="size" margin="v8 hauto">
        <f-token-image
          v-for="(f, i) in images"
          iconbar
          :key="i" 
          :image="f.src" 
          :image-type="f.mediaType" 
          :size="size" 
          margin="v2" 
        />
        <x-box 
          v-if="videos.length" 
          el="video"
          controls 
          autoplay 
          loop 
          playsinline 
          muted 
          :poster="data.image" 
          :width="size" 
          margin="v2" 
        >
          <source v-for="(v, i) in videos" :key="i" :src="v.src" :type="v.mediaType" />
          <div> No HTML video support! </div>
        </x-box>
      </x-box> -->
    </x-box>
  </x-context>
</template>



<script>
import { XBox, XContext, XGrid, XFlex, XIcon, XImage, XLink, XText } from 'exude'
import FDataValue from './face/FDataValue'
import FTokenImage from './face/FTokenImage'
import FTraits from './face/FTraits'
import { encode } from '_source/lib/json-code';
import { extra } from '_source/lib/wallet';


export default
{
    name: 'TokenDetails',
    
    components: { FDataValue, FTokenImage, FTraits, XBox, XContext, XGrid, XFlex, XIcon, XImage, XLink, XText },
    
    props:
    {
        /**
            Scale unit image size.
        */
        size: { type: Number, default: 90 },
        /**
            Token data to be displayed.
        */
        data: Object
    },
    
    data: () => ({ token: {} }),
    
    computed:
    {
        assetProps()
        {
            let props = {}, { token } = this;
            
            if (this.isCollection)
            {
                props.label = 'policy id';
                props.value = token.policyId;
            }
            else
            {
                props.label = 'fingerprint';
                props.value = token.fingerprint;
            }
        
            return props;
        },
        
        images() 
        {
            let { files } = this.token;
            return files ? files.filter(i => (i.mediaType || '').includes('image')) : []; 
        },
        
        isCollection() { return this.token.__entity === 'collection' },
        
        mintDate()
        {
            if (!this.isCollection && this.token.mintTime)
            {
                let date = new Date(this.token.mintTime);
                let m = date.getUTCMonth() + 1;
                let d = date.getUTCDate();
                                           
                return [ date.getUTCFullYear(), m < 10 ? '0' + m : m, d < 10 ? '0' + d : d ].join('-');
            }
        },
        
        ocmds() { return this.token.onchainMetadataStandard; },

        videos() 
        {
            let { files } = this.token;
            return files ? files.filter(v => (v.mediaType || '').includes('video')) : []; 
        }
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
        heTrait({ attr, trait })
        {
            if (attr && trait)
            {
                let filter = 
                [ 
                    { $test: [ this.token.policyId ], filterType: 'collection', $path: 'policyId' },
                    { $test: `${attr}/${trait}`, filterType: 'string', $path: 'traits/keyvals' }
                ];
                
                this.$router.push({ name: 'nfts-filter', params: { hash: encode(filter) } });            
            }
        }
    }
}
</script>
