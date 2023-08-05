<template>
  <x-box width="100%">
    <f-token-image iconbar :image="token.image" :image-type="token.imageType" :size="size" margin="hauto" />
    <x-flex aligns=":center:space-around" colors="white:black" border="t.25!prime"  :width="size" margin="hauto">
      <f-data-value v-bind="assetProps" copy aligns=":center:center" :count="ocmds ? 20 : 24" font="micro" />
      <x-text v-if="ocmds" font="micro" colors="second"> 
        {{ ocmds }} 
      </x-text>
    </x-flex>
    <f-traits v-if="token.isNFT" :object="token.traits" />
    <f-traits v-if="token.isCollection" #default="{ value }" :object="token.traits">
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
</template>



<script>
import { XBox, XGrid, XFlex, XIcon, XImage, XText } from 'exude'
import FDataValue from './face/FDataValue'
import FTokenImage from './face/FTokenImage'
import FTraits from './face/FTraits'


export default
{
    name: 'TokenDetails',
    
    components: { FDataValue, FTokenImage, FTraits, XBox, XGrid, XFlex, XIcon, XImage, XText },
    
    props:
    {
        /**
            Scale unit image size.
        */
        size: { type: Number, default: 90 },
        /**
            Token data to be displayed.
        */
        token: Object
    },
    
    computed:
    {
        assetProps()
        {
            let props = {}, { token } = this;
            
            if (token.isCollection)
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
        
        ocmds() { return this.token.onchainMetadataStandard; }
    }
}
</script>
