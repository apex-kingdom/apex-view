<template>
  <x-layout cols="12" col-gap="3" row-gap="10">
    <x-layout-cell span="7">
      <x-text block align="center" font="vSmall" margin="h2" pad="v2">
        <f-main-title block text="ApexView" align="center" font="vHuge" margin="t5 b8" />
        <e-stylesheet sel="p" margin="v8" />
        <p>
          ApexView is built and maintained by <b>Wilsonape</b> and brought to you by
          the <b>ApexKingdom</b> CNFT project.
        </p>
        <p>
          Take snapshots of your wallet here and flex them on twitter... be sure to
          tag us!
          <br />
          <x-link block href="https://twitter.com/ApexKingdomCnft">
            @ApexKingdomCnft
          </x-link>
        </p>
        <p>
          Got some feedback or maybe a feature you'd like to see here?  Hop into our
          discord and let us know!
          <x-link block href="https://discord.gg/jyWgDmGd63" target="_blank">
            <x-icon name="discord" size="10" title="ApexKingdom Discord" />
          </x-link>
        </p>
        <!-- doscord link -->
      </x-text>
    </x-layout-cell>
    <x-layout-cell span="5" anchor="center:center">
      <x-box overflow="hidden" radius="a1000px" pos="relative" height="25vw" width="25vw">
        <e-stylesheet 
          sel="&::after" 
          content=""
          shadow="0px 0px 48px gray, inset 0px 0px 48px black" 
          border="a.5!black"
          pos="absolute" 
          trbl="a3"
          radius="a250"
        />
        <x-image src="ipfs://QmY2v4eNHjRCCnDngHPGvrALqFakqMkoxNR4oNfYEgvZp5" width="100%" />
      </x-box>
    </x-layout-cell>
    <x-layout-cell span="12" expanded>
      <x-text bold font="large" colors="prime" border="b.25!prime" pad="v1 h5">
        Donate
      </x-text>
    </x-layout-cell>
    <x-layout-cell span="7">
      <x-text block align="center" font="vSmall" margin="h4" pad="v2">
        If you appreciate this app, please consider sending a small donation.
        It can really help us pay the bills and keep the site running. Thanks!
      </x-text>
    </x-layout-cell>
    <x-layout-cell span="5" anchor="center:center">
      <f-main-title block text="$avdonate" font="vBase" align="center" margin="v4" />
    </x-layout-cell>
    <x-layout-cell span="12" expanded>
      <x-text bold font="large" colors="prime" border="b.25!prime" pad="v1 h5">
        Credits
      </x-text>
    </x-layout-cell>
    <x-layout-cell span="4" anchor="bottom:center">
      <x-flex invert aligns=":center:flex-end">
        <x-image src="https://baianat.github.io/verte/verte.png" alt="Verte Logo" width="10vw" />
        <x-text block font="vSmaller" margin="t.4vw"> 
          Color Picker by 
          <x-link href="https://baianat.github.io/verte/" target="_blank">Verte</x-link>.
        </x-text>
      </x-flex>
    </x-layout-cell>
    <x-layout-cell span="4" anchor="bottom:center">
      <x-flex invert aligns=":center:flex-end">
        <x-icon name="pictogrammers" title="Pictogrammers Logo" size="10vw" />
        <x-text block font="vSmaller" margin="t.4vw"> 
          Icons from 
          <x-link href="https://pictogrammers.com/" target="_blank">Pictogrammers</x-link>.
        </x-text>
      </x-flex>
    </x-layout-cell>
    <x-layout-cell span="4" anchor="bottom:center">
      <x-flex invert aligns=":center:flex-end">
        <x-image src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" alt="Vuejs Logo" width="10vw" />
        <x-text block font="vSmaller" margin="t1.2vw"> 
          Built on 
          <x-link href="https://vuejs.org/" target="_blank">VueJs</x-link>.
        </x-text>
      </x-flex>
    </x-layout-cell>
    <x-layout-cell span="12" anchor="center:center">
      <f-button font="vSmall" margin="v8 hauto" @click="$emit('close')"> Close </f-button>
      <x-text colors="quine" font="vSmaller">
        <x-icon name="cardano" size="4" title="Cardano Logo" align-v="middle" margin="b.5" />ApexView 
        is Copyright ©2023 
        <x-icon name="apex" size="4" title="AK Logo" align-v="middle" margin="b.5" />Apex Kingdom &amp; 
        <x-image :src="hadley" height="4" title="The Hadley" align=":middle" margin="b.5" />Wilsonape
      </x-text>
    </x-layout-cell>
  </x-layout>
</template>


<script>
import { EStylesheet, XBox, XFlex, XIcon, XImage, XLayout, XLayoutCell, XLink, XText } from 'exude'
import FButton from './face/FButton'
import FMainTitle from './face/FMainTitle'


export default
{
    name: 'About',
    
    components: { EStylesheet, FButton, FMainTitle, XBox, XFlex, XIcon, XImage, XLayout, XLayoutCell, XLink, XText },
    
    data: () => 
    ({
        hadley: 'ipfs://QmQxwA5eVHGtnHZopTXtvwj6YGqihTRPLBVsRnb39Y5x4q?tk=MHOf8yRgyDlTTS0-sFhf6vfLV2P1YO37AOvSmNbo4ZQ'
    })
}
</script>
