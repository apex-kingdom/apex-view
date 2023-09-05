<template>
  <x-context #default="{ bgColor, ext, sm }">
    <div style="position:relative">
      <x-fieldset #default="{ $negate, $path }" :name="name">
        <x-flex v-bind="$attrs" aligns=":center" radius="a2" overflow="hidden">
          <x-background v-bind="backgroundProps($path, $negate)" />      
          <x-flex :colors="ext.diff" aligns=":center">
            <x-checkbox #default="{ checked }" name="$negate" :hf-colors="`${bgColor}:${ext.diff}_f.25`" pad="a1">
              <x-icon :name="checked ? 'not_equal' : 'equal'" :size="iconSize" />
            </x-checkbox>
            <x-flex aligns=":center">
              <x-destyler sel="input::placeholder" :color="ext.diff" opacity=".5" />
              <x-input 
                ref="input"
                name="$test" 
                font="base" 
                :colors="`:${bgColor}`" 
                pad="v1 h2" 
                width="16vw" 
                placeholder="text search"
                :debounce="200" 
              />
              <x-button :hf-colors="`${bgColor}:${ext.diff}_f.25`" pad="a1" @click="show = !show">
                <x-icon name="caret" :size="iconSize" />
              </x-button>
            </x-flex>
            <x-button :hf-colors="`${bgColor}:${ext.diff}_f.25`" pad="a1" @click="$emit('remove', $event)">
              <x-icon name="close" :size="iconSize" />
            </x-button>
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
          </x-flex>            
        </x-flex>
      </x-fieldset>
    </div>
  </x-context>
</template>


<script>
import { XBackground, XButton, XCheckbox, XChoose, XContext } from 'exude'
import { XDestyler, XDropMenu, XFieldset, XFlex, XIcon, XInput, XOption } from 'exude'


export default
{
    name: 'StringFilter',
    
    components: 
    { 
        XBackground, 
        XButton, 
        XCheckbox, 
        XChoose, 
        XContext, 
        XDestyler, 
        XDropMenu, 
        XFieldset, 
        XFlex, 
        XIcon, 
        XInput, 
        XOption 
    },
    
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
    
    mounted()
    {
        this.$refs.input.$el.focus();
    },
    
    methods:
    {
        backgroundProps(path, negate)
        {
            let mapper = (object, option, index) =>
            {
                let value = 'color::' + (path.includes(option.data) ? option.color : 'transparent')                
                return { ...object, [`o${index}`]: value };
            }

            let props = this.optionData.reduce(mapper, {});
                        
            props.image = `linear-gradient(90deg, {=ng}, ${Object.keys(props).map(key => `{=${key}}`).join(', ')})`;
            props.ng = 'color::' + (negate ? 'negate' : 'transparent');
            
            return props;
        }      
    }
}
</script>
