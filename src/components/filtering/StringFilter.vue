<template>
  <div style="position:relative">
    <x-fieldset #default="{ $negate, $path }" :name="name">
      <x-flex v-bind="$attrs" aligns=":center" colors="quine" radius="a2" overflow="hidden">
        <x-background v-bind="backgroundProps($path, $negate)" />      
        <x-flex aligns=":center">
          <x-checkbox #default="{ checked }" name="$negate" hf-colors="white:black_f.5" pad="a1">
            <x-icon :name="checked ? 'not_equal' : 'equal'" :size="iconSize" />
          </x-checkbox>
          <x-flex aligns=":center">
            <x-input name="$test" font="base" colors="black" pad="a1" width="16vw" :debounce="200" />
            <x-button hf-colors="white:black_f.5" pad="a1" @click="show = !show">
              <x-icon name="caret" :size="iconSize" />
            </x-button>
          </x-flex>
          <x-drop-menu :show.sync="show" space="nowrap" min-breadth="100%" radius="a2" shadow="entry" z-index="10">
            <x-flex invert colors=":white" width="100%">
              <x-choose name="$path" multi font="base" align="left" pad="v1 h2">
                <x-option 
                  v-for="o in optionData" 
                  #default="{ selected }" 
                  :key="o.data" 
                  :colors="`black:${o.color}`"
                  :hf-colors="`white:${o.color}_d.75`"
                >
                  <x-flex aligns=":center" align="left" gap="1">
                    <x-icon :name="selected ? 'check' : 'checkEmpty'" :size="iconSize" />
                    <span>{{ o.label }}</span>
                  </x-flex>
                </x-option>                
              </x-choose>
            </x-flex>
          </x-drop-menu>
          <x-button hf-colors="white:black_f.5" pad="a1" @click="$emit('remove', $event)">
            <x-icon name="close" :size="iconSize" />
          </x-button>
        </x-flex>            
      </x-flex>
    </x-fieldset>
  </div>
</template>


<script>
import { XBackground, XButton, XCheckbox, XChoose, XDropMenu, XFieldset, XFlex, XIcon, XInput, XOption } from 'exude'


export default
{
    name: 'StringFilter',
    
    components: { XBackground, XButton, XCheckbox, XChoose, XDropMenu, XFieldset, XFlex, XIcon, XInput, XOption },
    
    props:
    {
        /**
            Icon size.
        */
        iconSize: { type: Number, default: 8 },
        /**
            Name for this filter.
        */
        name: [ String, Number ],
        /**
            Data for text filtering options.
            
            Array of objects to include:
            - data
            - color
            - label
        */
        optionData: Array
    },
    
    data: () => ({ show: false }),
    
    methods:
    {
        backgroundProps(path, negate)
        {
            let mapper = (object, option, index) =>
            {
                let value = 'color::' + (path.includes(option.data) ? option.color : 'white_f.15')                
                return { ...object, [`o${index}`]: value };
            }

            let props = this.optionData.reduce(mapper, {});
                        
            props.image = `linear-gradient(90deg, {=ng}, ${Object.keys(props).map(key => `{=${key}}`).join(', ')})`;
            props.ng = 'color::' + (negate ? 'negate' : 'white_f.15');
            
            return props;
        }      
    }
}
</script>
