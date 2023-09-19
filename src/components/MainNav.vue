<template>
  <f-overbox v-bind="$attrs" invert pos="absolute" margin="v2.5vh" pad="v.6vw h.8vw" @hover="$emit('hover', $event)">
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
      @update:value="$emit('bg-color', $event)"
    >
      <x-icon name="eyedropper" size="mainnav" />
    </x-color>
    <x-link display="flex" @click="$emit('config')">
      <x-icon name="settings" size="mainnav" />
    </x-link>
  </f-overbox>
</template>


<script>
import { XColor, XIcon, XLink } from 'exude'
import { m_toggle } from 'exude'
import FOverbox from './face/FOverbox'


export default
{
    name: 'MainNav',
    
    mixins: [ m_toggle('hide') ],
    
    components: { FOverbox, XColor, XIcon, XLink },
    
    props:
    {
        /**
            Display smaller version of this compnent?
        */
        small: Boolean
    }    
}
</script>
