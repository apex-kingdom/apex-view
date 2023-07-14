<template>
  <x-context #default="{ mobile }">
    <x-when #default="{ size }" :test="mobile" size="12" w-size="8">
      <x-flex v-bind="$attrs" invert pos="fixed" filter="drop-shadow(2px 2px 0 black)" z-index="10">
        <x-link @click="$router.push({ name: 'home' })" colors="quarter">
          <x-icon name="apex" :size="size" />
        </x-link>
        <x-link @click="hideToggle">
          <x-icon :name="hide ? 'subtitles' : 'subtitlesOff'" :size="size" />
        </x-link>
        <x-box v-listen-outside-click="() => picker = false" pos="relative">
          <x-link @click="picker = !picker">
            <x-icon name="palette" :size="size" />
          </x-link>
          <a-color-picker v-show="picker" name="bgColor" pos="absolute" trbl="t0 l14" @input="$emit('input', $event)" />
        </x-box>
      </x-flex>
    </x-when>
  </x-context>
</template>


<script>
import { XBox, XContext, XFlex, XIcon, XLink, XWhen } from 'exude'
import { listenOutsideClick, m_toggle } from 'exude'
import AColorPicker from './util/AColorPicker'


export default
{
    name: 'ApexNav',
    
    mixins: [ m_toggle('hide') ],
    
    components: { AColorPicker, XBox, XContext, XFlex, XIcon, XLink, XWhen },
    
    directives: { listenOutsideClick },
    
    data: () => ({ picker: false })
}
</script>
