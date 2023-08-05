<template>
  <x-flex 
    v-bind="$attrs" 
    invert 
    pos="absolute"         
    aligns=":center" 
    colors=":black_f.125" 
    border="a.25!terti" 
    pad="v2 h4" 
    radius="a3" 
    margin="t4" 
    shadow="floater"
  >
    <x-link @click="$router.push({ name: 'home' })" colors="quarter">
      <x-icon name="apex" :size="size" />
    </x-link>
    <x-link @click="hideToggle">
      <x-icon :name="hide ? 'subtitles' : 'subtitlesOff'" :size="size" />
    </x-link>
    <x-link @click="$emit('config')">
      <x-icon name="settings" :size="size" />
    </x-link>
  </x-flex>
</template>


<script>
import { XFlex, XIcon, XLink } from 'exude'
import { m_toggle } from 'exude'


export default
{
    name: 'ApexNav',
    
    mixins: [ m_toggle('hide') ],
    
    components: { XFlex, XIcon, XLink },
    
    props:
    {
        /**
            Display smaller version of this compnent?
        */
        small: Boolean
    },
    
    computed:
    {
        size() { return this.small ? 8 : 12; }
    }
}
</script>
