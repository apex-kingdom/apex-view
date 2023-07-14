<template>
  <x-context #default="{ bgColor, hideCtrls }">
    <x-text 
      display="inline-block" 
      align="center" 
      pad="v1"
      pos="fixed" 
      trbl="b1 l50%" 
      trans="tx-50%"
      font="tiny" 
      filter="contrast(4) invert(1)" 
      text-shadow="text"
      z-index="10"
      :style="{ color: bgColor }"
      :opacity="hideCtrls ? 0 : 1"
    >
      ©2023 Apex Kingdom &amp; wilsonape
    </x-text>
  </x-context>
</template>


<script>
import { XContext, XText } from 'exude'

export default
{
    name: 'ApexFooter',
  
    components: { XContext, XText }
}
</script>
