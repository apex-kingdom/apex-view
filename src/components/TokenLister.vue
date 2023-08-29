<template>
  <x-context #default="{ bgColor, ext, cs, rs }">
    <x-skeleton skeletize zombify :colors="`${ext.diff}_f.75:${bgColor}`" degrees="0">
      <x-flex wrap aligns=":flex-start:center" :gap="`${cs}:${rs}`" :pad="`h${cs} v${rs}`">
        <!-- token thumbnail slot -->
        <slot />
      </x-flex>
      <template #frames>
        <frame at="0%" background-position="-50% -50%" />
        <frame at="100%" background-position="150% 150%" />  
      </template>
    </x-skeleton>
  </x-context>
</template>


<script>
import { XContext, XFlex, XSkeleton } from 'exude'


export default
{
    name: 'TokenLister',
    
    components: { XContext, XFlex, XSkeleton }
}
</script>
