<template>
  <x-flex v-bind="$attrs" :aligns="aligns" gap=".25vw" pos="relative">
    <component v-bind="linkProps" v-on="linkEvents">
      {{ shorten(value, count) }}
    </component>
    <template v-if="copy">
      <x-copy-to-clipboard :data="value" display="flex" :size="iconSize" duration="3" />
    </template>
  </x-flex>
</template>


<script>
import { XCopyToClipboard, XFlex, XLink, XText } from 'exude'
import shorten from '_source/lib/shorten'


export default
{
    name: 'FDataValue',
    
    components: { XCopyToClipboard, XFlex, XLink, XText },
    
    props:
    {
        /**
            URL to open or function to call on click.
        */
        action: [ String, Function ],
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
            The data value.
        */
        value: String
    },
    
    data: () => ({ shorten }),
    
    computed:
    {
        linkProps()
        {
            let props = { font: this.font };
            
            if (this.action)
            {
                props.is = 'x-link';
                if (typeof this.action === 'string')
                    props.href = this.action;
            }
            else
            {
                props.is = 'x-text';
            }
            
            return props;
        },
        
        linkEvents()
        {
            let events = {};
            
            if (typeof this.action === 'function')
                events.click = this.action;
            
            return events;
        }
    }
}
</script>
