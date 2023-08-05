<template>
  <x-flex aligns=":center:center" height="100vh">
    <x-text align="center" colors="white:red_d.75" width="60%" max-width="250" min-width="100" pad="a6">
      <x-text block bold font="h4"> Unable to load wallet data! </x-text>
      <x-text block font="large" colors="red" overflow="auto" max-height="100" margin="v10">
        <code>
            {{ error.code }} 
            <br /><br />
            {{ error.message }} 
        </code>
      </x-text>
      <x-link @click="$router.push({ name: 'home' })">
        back to homepage
      </x-link>
    </x-text>
  </x-flex>
</template>


<script>
import { XBox, XFlex, XLink, XText } from 'exude'


export default
{
    name: 'FWalletError',
    
    components: { XBox, XFlex, XLink, XText },
    
    props:
    {
        /**
            Error to display.
        */
        error: null
    }
}
</script>
