<template>
  <x-context #default="{ bgColor, ext, gray, cs, rs }">
    <x-skeleton skeletize zombify :colors="`${ext.diff}_f.75:${bgColor}`" degrees="0">
      <x-flex wrap aligns=":flex-start:center" :gap="`${cs}:${rs}`" :pad="`h${cs} v${rs}`">
        <x-lister #iter="{ item }">
          <wallet-item :data="item" />
        </x-lister>
      </x-flex>
      <template #frames>
        <frame at="0%" background-position="-50% -50%" />
        <frame at="100%" background-position="150% 150%" />  
      </template>
    </x-skeleton>
  </x-context>
</template>


<script>
import { XContext, XFlex, XLister, XSkeleton } from 'exude'
import WalletItem from '_comps/WalletItem'


export default
{
    name: 'TokenLister',
    
    components: { WalletItem, XContext, XFlex, XLister, XSkeleton }
}
</script>
