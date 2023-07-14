<template>
  <x-context #default="{ bgIsDark, bw = bgIsDark ? 'white' : 'black' }">
    <x-flex invert align="center" gap=":1.5" :width="size">
      <x-flex aligns=":center:center" :height="size" overflow="hidden">
        <x-image v-if="image" :src="image" :type="imageType" max-height="100%" max-width="100%" />
        <x-icon v-else name="apex" :colors="bw + '_f.8'" size="50%" />
      </x-flex>
      <x-text v-if="count" font="tiny" :colors="bw"> 
        {{ count }} 
      </x-text>
      <x-text font="tiny" over-wrap="anywhere" :colors="bw"> 
        {{ title }} 
      </x-text>
    </x-flex>    
  </x-context>
</template>


<script>
import { XContext, XFlex, XIcon, XImage, XText } from 'exude'


export default 
{
    name: 'TokenThumb',
    
    components: { XContext, XFlex, XIcon, XImage, XText },
    
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
        size: { type: Number, default: 40 },
        /**
            Title for token thumb.
        */
        title: String
    }
}
</script>
