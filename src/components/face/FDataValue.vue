<template>
  <x-flex v-bind="$attrs" :aligns="aligns" gap=".25vw" pos="relative">
    <component :is="link ? 'x-link' : 'x-text'" :font="font">
      {{ shorten(value, count) }}
    </component>
    <template v-if="copy">
      <x-copy-to-clipboard :data="value" display="flex" :size="iconSize" @copied="showCopy = true" />
      <f-pop-message mode="alert" :timeo="4000" :show.sync="showCopy">
        <x-text colors="quarter" font="small" pad="a1"> Copied to clipboard! </x-text>
      </f-pop-message>
    </template>
    <template v-if="qrCode">
      <x-link display="flex" @click="show = true">
        <x-icon name="qrcode" :size="iconSize" />
      </x-link>
      <f-pop-message mode="info" :show.sync="show">
        <x-text block align="center" colors="quarter" pad="a1" radius="a100" width="100%"> 
          {{ label }} 
        </x-text>
        <x-qr-code :content="value" :padding="2" colors="quarter:black" width="64" height="64" />
      </f-pop-message>
    </template>
  </x-flex>
</template>


<script>
import { XCopyToClipboard, XFlex, XIcon, XLink, XQrCode, XText } from 'exude'
import shorten from '_source/lib/shorten'
import FPopMessage from './FPopMessage'


export default
{
    name: 'FDataValue',
    
    components: { FPopMessage, XCopyToClipboard, XFlex, XIcon, XLink, XQrCode, XText },
    
    props:
    {
        /**
            Flex alignment values.
        */
        aligns: { type: String, default: ':center' },
        /**
            Allow copy to clipboard?
        */
        copy: Boolean,
        /**
            Max number of chars to display (on each side of ellipsis).
        */
        count: { type: Number, default: 8 },
        /**
            Data value font size.
        */
        font: String,
        /**
            Size of utility icons.
        */
        iconSize: { type: [ String, Number ], default: 4 },
        /**
            Label for the data value.
        */
        label: String,
        /**
            URL for data value.
        */
        link: String,
        /**
            Allow display of QR code?
        */
        qrCode: Boolean,
        /**
            The data value.
        */
        value: String
    },
    
    data: () => ({ shorten, show: false, showCopy: false })
}
</script>
