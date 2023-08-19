<template>
  <x-context #default="{ bgColor, ext }">
    <x-box width="100%">
      <f-token-image iconbar :image="data.image" :image-type="data.imageType" :size="size" margin="hauto" />
      <x-flex 
        aligns=":center:space-around" 
        colors="#EEEEEE:black_f.25" 
        border="v.25!white_f.5" 
        :width="size" 
        pad="a1"
        margin="hauto"
      >
        <f-data-value v-bind="assetProps" copy aligns=":center:center" :count="ocmds ? 20 : 24" font="micro" />
        <x-text v-if="ocmds" font="micro" colors="second"> {{ ocmds }} </x-text>
      </x-flex>
      <x-flex invert aligns=":center" margin="v5 h3">
        <x-text 
          v-if="data.description" 
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
          {{ data.description }}
        </x-text>
        <x-link 
          v-if="data.homepage" 
          font="micro"
          colors="quine:white_f.75" 
          :href="data.homepage" 
          target="_blank" 
          pad="v1 h3"
          radius="a10"
        >
          <x-icon name="web" size="4" align-v="middle" /> {{ data.homepage }}
        </x-link>
      </x-flex>
      <f-traits v-if="data.isNFT" :object="data.traits" />
      <f-traits v-if="data.isCollection" #default="{ value }" :object="data.traits">
        <x-grid inline cols="3fr 1fr" gap="1:1">
          <template v-for="(key, idx) in Object.keys(value)">
            <x-box :key="key" align="left"> {{ key }} </x-box>
            <x-box :key="key + '_ct'"> {{ value[key] }} </x-box>
          </template>
        </x-grid>
      </f-traits>
      <!-- <template v-for="(f, i) in token.files">
        <f-token-image
          v-if="f.mediaType.indexOf('image') === 0"
          iconbar
          :key="i" 
          :image="f.src" 
          :image-type="f.mediaType" 
          :size="size" 
          margin="hauto" 
        />
      </template> -->
    </x-box>
  </x-context>
</template>



<script>
import { XBox, XContext, XGrid, XFlex, XIcon, XImage, XLink, XText } from 'exude'
import FDataValue from './face/FDataValue'
import FTokenImage from './face/FTokenImage'
import FTraits from './face/FTraits'


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
    
    computed:
    {
        assetProps()
        {
            let props = {}, { data } = this;
            
            if (data.isCollection)
            {
                props.label = 'policy id';
                props.value = data.policyId;
            }
            else
            {
                props.label = 'fingerprint';
                props.value = data.fingerprint;
            }
        
            return props;
        },
        
        ocmds() { return this.data.onchainMetadataStandard; }
    }
}
</script>
