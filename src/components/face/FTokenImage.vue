<template>
  <x-context #default="{ ext }">
    <x-flex v-bind="flexProps" :data-x-bone="loading" @click="$emit('click')" @hover="$emit('hover', $event)">
      <e-transition property="filter" :duration=".25" />
      <x-image 
        v-if="image" 
        :id="fsid" 
        :src="image" 
        :media-type="imageType" 
        height="100%" 
        width="100%"
        style="object-fit:contain"
        :hide="failing"
        :pos="failing ? 'absolute' : 'static'" 
        @loading="loading = $event"
        @failing="failing = $event"
      />
      <x-icon v-else name="apex" :colors="ext.diff + '_f.8'" size="50%" />
      <x-icon v-if="failing" name="alert" :colors="ext.diff + '_f.8'" size="50%" />
      <x-fullscreen 
        v-if="image && !failing" 
        :target-id="fsid" 
        colors="prime"
        h-colors="white"
        size="8" 
        filter="drop-shadow(.5px .5px 1px black)"
        pos="absolute" 
        pad="a0"
        :trbl="`b0 r${iconbar ? '0' : '-8'}`" 
        tabindex="-1"
      />
    </x-flex>
  </x-context>  
</template>


<script>
import { ETransition, XContext, XFlex, XFullscreen, XIcon, XImage } from 'exude'
import { m_toggle } from 'exude'


export default
{
    name: 'FTokenImage',
    
    mixins: [ m_toggle('iconbar') ],
    
    components: { ETransition, XContext, XFlex, XFullscreen, XIcon, XImage },
    
    props:
    {
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
    },
    
    data: () => ({ failing: false, loading: false }),
    
    computed:
    {
        flexProps()
        {
            let props =
            {
                ...this.$attrs,
                aligns: ':center:center', 
                height: this.size,
                width: this.size,
                overflow: 'hidden',
                pos: 'relative',
            };
            
            if (this.$listeners.click)
            {
                props.el = 'button';
                props.cursor = 'pointer';
                props.hfFilter = 'brightness(1.25)';
            }
            
            return props;
        },
        
        fsid() { return this._uid + '_fs' }
    }    
}
</script>
