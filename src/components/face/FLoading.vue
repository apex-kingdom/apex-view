<template>
  <x-flex v-bind="$attrs" inline>
    <x-animation name="spin" repeat="infinite" :duration="rps + 's'" timing="linear" />
    <x-icon :name="icon" :size="size" :colors="iconColors" />
  </x-flex>
</template>


<script>
import { XAnimation, XFlex, XIcon } from 'exude'


/**
    A simple perpetual loading spin.
*/
export default
{
    name: 'FLoading',

    components: { XAnimation, XFlex, XIcon },

    props:
    {
        /**
            Name of icon to display.
        */
        icon: { type: String, default: 'loading' },
        /**
            Colors for the icon.
        */
        iconColors: String,
        /**
            Rotations per second.
        */
        rps: { type: Number, default: 1 },
        /**
            Icon size.
        */
        size: [ String, Number ]
    }
}
</script>
