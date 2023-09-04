<template>
  <x-context #default="{ bgColor, ext, sm }">
    <div style="position:relative">
      <x-fieldset #default="{ $negate, $test }" :name="name">
        <x-flex v-bind="$attrs" aligns=":center" colors="quine" radius="a2" overflow="hidden">
          <x-background 
            image="linear-gradient(90deg, {=ng}, {=wh}, {=wh}, {=wh})"
            wh="color::white_f.15"
            :ng="'color::' + ($negate ? 'negate' : 'white_f.15')"
          />      
          <x-flex aligns=":center">
            <x-checkbox #default="{ checked }" name="$negate" hf-colors="white:black_f.5" pad="a1">
              <x-icon :name="checked ? 'not_equal' : 'equal'" :size="iconSize" />
            </x-checkbox>
            <x-flex aligns=":center" @click="show = !show">
              <x-text block font="base" colors="black" pad="a1" width="16vw" space="nowrap" overflow="auto">
                <template v-if="$test && $test.length">
                  {{ $test.length == 1 ? policyMap[$test[0]] : $test.length + ' collections selected.' }}
                </template>
              </x-text>
              <x-button hf-colors="white:black_f.5" pad="a1">
                <x-icon name="caret" :size="iconSize" />
              </x-button>
            </x-flex>
            <x-drop-menu 
              :show.sync="show" 
              space="nowrap" 
              :max-extent="56"
              max-breadth="100%" 
              min-breadth="100%" 
              radius="a2" 
              shadow="entry" 
              z-index="10"
            >
              <x-flex invert :colors="`${ext.diff}:${bgColor}${sm}.5`" width="100%">
                <x-choose name="$test" multi font="base" pad="v1 h2">
                  <x-option 
                    v-for="c in list" 
                    #default="{ selected }" 
                    :key="c.policyId" 
                    :hf-colors="`${ext.same}:${ext.diff}`"
                  >
                    <x-flex aligns=":center" align="left" gap="1">
                      <x-icon :name="selected ? 'check' : 'checkEmpty'" :size="iconSize" /> 
                      <x-text flex="1 0" overflow="auto"> {{ c.name }} </x-text>
                    </x-flex>
                  </x-option>                
                </x-choose>
              </x-flex>
            </x-drop-menu>
          </x-flex>            
          <x-button hf-colors="white:black_f.5" pad="a1" @click="$emit('remove', $event)">
            <x-icon name="close" colors="danger" :size="iconSize" />
          </x-button>
        </x-flex>
      </x-fieldset>
    </div>
  </x-context>
</template>


<script>
import { XBackground, XButton, XCheckbox, XChoose, XContext } from 'exude'
import { XDropMenu, XFieldset, XFlex, XIcon, XOption, XText } from 'exude'


export default
{
    name: 'CollectionFilter',
    
    components: 
    { 
        XBackground, 
        XButton, 
        XCheckbox, 
        XChoose, 
        XContext, 
        XDropMenu, 
        XFieldset, 
        XFlex, 
        XIcon, 
        XOption, 
        XText 
    },
    
    props:
    {
        /**
            Available collection options.
        */
        collections: Array,
        /**
            Icon size.
        */
        iconSize: { type: Number, default: 8 },
        /**
            Name for this filter.
        */
        name: [ String, Number ]
    },
    
    data: () =>
    ({ 
        compare: (s1, s2) =>
        {
            let one = s1.name.toLowerCase();
            let two = s2.name.toLowerCase();
            
            return one.localeCompare(two);
        },
        show: false 
    }),
    
    computed:
    {
        list() { return (this.collections || []).sort(this.compare); },
        
        policyMap() { return (this.collections || []).reduce((o, c) => ({ ...o, [c.policyId]: c.name }), {}); }
    }
}
</script>
