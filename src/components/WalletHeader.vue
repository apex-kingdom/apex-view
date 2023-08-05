<template>
  <x-context #default="{ bgDiff, hideLbls }">
    <x-text 
      v-if="!hideLbls" 
      block 
      bold 
      font="h5" 
      :colors="`${bgDiff}_f.25`"
      margin="h20% v6"
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
