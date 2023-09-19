<template>
  <x-context #default="{ ext, hideLbls, hideCnts }">
    <x-box v-observe-viewport-intersection="intersect" :width="size">
      <x-flex v-if="visible" invert align="center" width="100%">
        <x-text 
          v-if="!hideCnts && count" 
          font="tiny" 
          :colors="`${ext.diff}:${ext.same}_f.65`" 
          :h-colors="`${ext.same}:${ext.diff}_f.5`" 
          pad="v1 h.5" 
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
        <x-text v-if="!hideLbls" font="tiny" over-wrap="anywhere" :colors="`${ext.diff}:${ext.same}_f.65`" pad="v1 h.5"> 
          {{ title }} 
        </x-text>
      </x-flex>    
    </x-box>
  </x-context>
</template>


<script>
import { XBox, XContext, XFlex, XFullscreen, XIcon, XImage, XText } from 'exude'
import { observeViewportIntersection } from 'exude'
import FTokenImage from './face/FTokenImage'


export default 
{
    name: 'TokenThumb',
    
    components: { FTokenImage, XBox, XContext, XFlex, XFullscreen, XIcon, XImage, XText },
    
    directives: { observeViewportIntersection },
    
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
    
    data: () => ({ show: false, visible: false }),
    
    methods:
    {
        intersect(bool) { if (bool) this.visible = bool; }
    }
}
</script>
