<template>
  <x-when #default="{ font, pad }" :test="small" font="small" w-font="tiny" pad="v1 h2.5" w-pad="v.5 h2">
    <x-flex aligns=":center" border="b.25!quine" :pad="pad" gap="1.5" pos="relative">
      <x-text :font="font"> {{ shorten(value, 8) }} </x-text>
      <template v-if="copy">
        <x-copy-to-clipboard :data="value" size="4" @copied="showCopy = true" />
        <a-pop-message mode="alert" :timeo="4000" :show.sync="showCopy">
          <x-text colors="quarter" font="small" pad="a1"> Copied to clipboard! </x-text>
        </a-pop-message>
      </template>
      <template v-if="qrCode">
        <x-link @click="show = true">
          <x-icon name="qrcode" size="4" />
        </x-link>
        <a-pop-message mode="info" :show.sync="show">
          <x-text block align="center" colors="quarter" pad="a1" radius="a100" width="100%"> 
            {{ label }} 
          </x-text>
          <x-qr-code :content="value" :padding="2" colors="quarter:black" width="64" height="64" />
        </a-pop-message>
      </template>
    </x-flex>
  </x-when>
</template>


<script>
import { XCopyToClipboard, XFlex, XIcon, XLink, XQrCode, XText, XWhen } from 'exude'
import shorten from '_source/lib/shorten'
import APopMessage from './APopMessage'


export default
{
    name: 'AAddress',
    
    components: { APopMessage, XCopyToClipboard, XFlex, XIcon, XLink, XQrCode, XText, XWhen },
    
    props:
    {
        /**
            Allow copy to clipboard?
        */
        copy: Boolean,
        /**
            Lower text label.
        */
        label: String,
        /**
            Allow display of qr code?
        */
        qrCode: Boolean,
        /**
            Display a more compact version of this layout?
        */
        small: Boolean,
        /**
            Data to display.
        */
        value: String
    },
    
    data: () => ({ shorten, show: false, showCopy: false })
}
</script>
