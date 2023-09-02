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
    <x-color 
      colors="terti"
      hf-colors="white"
      cursor="pointer" 
      radius="a2"
      shadow="insetFloater"
      @update:value="$emit('bg-color', $event)"
    >
      <x-icon name="eyedropper" size="mainnav" />
    </x-color>
    <x-link display="flex" @click="$emit('config')">
      <x-icon name="settings" size="mainnav" />
    </x-link>
  </x-flex>
</template>


<script>
import { XColor, XFlex, XIcon, XLink } from 'exude'
import { m_toggle } from 'exude'


export default
{
    name: 'MainNav',
    
    mixins: [ m_toggle('hide') ],
    
    components: { XColor, XFlex, XIcon, XLink },
    
    props:
    {
        /**
            Display smaller version of this compnent?
        */
        small: Boolean
    }    
}
</script>
