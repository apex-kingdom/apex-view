<template>
  <x-context #default="{ ext, hideLbls }">
    <x-text 
      v-if="!hideLbls" 
      v-bind="$attrs"
      block 
      bold 
      font="h5" 
      :colors="`${ext.diff}_f.25`"
    >
      <!-- @slot header content -->
      <slot />
    </x-text>
  </x-context>
</template>


<script>
import { XContext, XText } from 'exude'


export default
{
    name: 'WalletHeader',
    
    components: { XContext, XText }
}
</script>
