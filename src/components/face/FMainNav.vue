<template>
  <x-flex 
    v-bind="$attrs" 
    invert 
    pos="absolute"         
    aligns=":center" 
    colors=":black_f.125" 
    border="a.1vw!gray" 
    pad="a.8vw" 
    gap=":.75vw"
    radius="a1vw" 
    margin="t2.5vh" 
    shadow="floater"
  >
    <x-link colors="quarter" display="flex" @click="$router.push({ name: 'home' })">
      <x-icon name="apex" size="mainnav" />
    </x-link>
    <x-link display="flex" @click="hideToggle">
      <x-icon :name="hide ? 'subtitles' : 'subtitlesOff'" size="mainnav" />
    </x-link>
    <x-link display="flex" @click="$emit('config')">
      <x-icon name="settings" size="mainnav" />
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
    }    
}
</script>
