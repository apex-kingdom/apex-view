<template>
  <x-context #default="{ bgColor, ext }">
    <x-flex v-bind="$attrs" inline :colors="`:${bgColor}_f.15`" aligns=":center:center" pos="fixed" trbl="a0">
      <f-loading :colors="`${ext.diff}:${bgColor}`" size="17vw" :rps="3" radius="a1000" />
      <f-loading :colors="bgColor" size="16vw" :rps="3.1" pos="absolute" />
      <x-flex pos="absolute">
        <x-icon name="apex" size="6vw" :colors="ext.diff" />
      </x-flex>
    </x-flex>
  </x-context>
</template>


<script>
import { XContext, XFlex, XIcon } from 'exude'
import FLoading from './FLoading'


export default
{
    name: 'FSiteLoading',
    
    components: { FLoading, XContext, XFlex, XIcon }
}
</script>
