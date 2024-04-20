<template>
  <x-context #default="{ ext }">
    <x-flex v-bind="flexProps" :data-x-bone="loading" @click="$emit('click')" @hover="$emit('hover', $event)">
      <e-transition property="filter" :duration=".25" />
      <x-embed 
        v-if="image" 
        :id="fsid" 
        :src="image" 
        height="100%" 
        width="100%"
        object="contain"
        :hide="failing"
        :pos="failing ? 'absolute' : 'static'" 
        @loading="loading = $event"
        @failing="failing = $event"
      />
      <x-icon v-else name="apex" :colors="ext.diff + '_f.8'" size="50%" />
      <x-icon v-if="failing" name="alert" :colors="ext.diff + '_f.8'" size="50%" />
      <x-flex 
        v-if="image" 
        aligns=":center" 
        colors="prime" 
        pos="absolute" 
        :trbl="`b0 r${iconbar ? '0' : '-8'}`"
        filter="drop-shadow(.5px .5px 1px black)"
      >
        <x-fullscreen 
          v-if="!failing" 
          :target-id="fsid" 
          colors="prime"
          h-colors="white"
          size="8" 
          pad="a0"           
          tabindex="-1"
        />
      </x-flex>
    </x-flex>
  </x-context>  
</template>


<script>
import { ETransition, XButton, XContext, XEmbed, XFlex, XFullscreen, XIcon } from 'exude'
import { m_toggle } from 'exude'


export default
{
    name: 'FTokenImage',
    
    mixins: [ m_toggle('iconbar') ],
    
    components: { ETransition, XButton, XContext, XEmbed, XFlex, XFullscreen, XIcon },
    
    props:
    {
        /**
            URL of image for token thumb.
        */
        image: [ String, Array ],
        /**
            Turn off hover filter when clickable?
        */
        noHoverFilter: Boolean,
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
                
                if (!this.noHoverFilter)
                  props.hfFilter = 'brightness(1.25)';
            }
            
            return props;
        },
        
        fsid() { return this._uid + '_fs' }
    }    
}
</script>
