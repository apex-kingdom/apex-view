<template>
  <x-context #default="{ bgColor, bgDiff, bgSame, hideLbls }">
    <x-flex invert align="center" :width="size">
      <x-text 
        v-if="count" 
        font="tiny" 
        :colors="`${bgDiff}:${bgSame}_f.65`" 
        :h-colors="`${bgSame}:${bgDiff}_f.5`" 
        pad="v1" 
        cursor="pointer" 
        @click="$emit('amount')"
      > 
        {{ count }} 
      </x-text>
      <f-token-image 
        :iconbar="show && !hideLbls" 
        :image="image" 
        :image-type="imageType" 
        :size="size" 
        @click="$emit('open')"
        @hover="show = $event"
      />
      <x-text v-if="!hideLbls" font="tiny" over-wrap="anywhere" :colors="`${bgDiff}:${bgSame}_f.65`" pad="v1"> 
        {{ title }} 
      </x-text>
    </x-flex>    
  </x-context>
</template>


<script>
import { XContext, XFlex, XFullscreen, XIcon, XImage, XText } from 'exude'
import FTokenImage from './face/FTokenImage'


export default 
{
    name: 'TokenThumb',
    
    components: { FTokenImage, XContext, XFlex, XFullscreen, XIcon, XImage, XText },
    
    props:
    {
        /**
            Number of tokens.
        */
        count: [ Number, String ],
        /**
            URL of image for token thumb.
        */
        image: [ String, Array ],
        /**
            Type of image (if `image` is base64 data).
        */
        imageType: String,
        /**
            Size of the thumbnail image (width and height).
        */
        size: { type: Number, default: 48 },
        /**
            Title for token thumb.
        */
        title: String
    },
    
    data: () => ({ show: false })
}
</script>
