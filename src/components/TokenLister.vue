<template>
  <x-context #default="{ cs, rs }">
    <x-flex wrap aligns=":flex-start:center" :gap="`${cs}:${rs}`">
      <!-- token thumbnail slot -->
      <slot />
    </x-flex>
  </x-context>
</template>


<script>
import { XContext, XFlex } from 'exude'


export default
{
    name: 'TokenLister',
    
    components: { XContext, XFlex }
}
</script>
