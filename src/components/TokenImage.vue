<template>
  <x-box el="image" :src="image" />
</template>


<script>
import { XBox } from 'exude'


export default
{
    name: 'TokenImage',
    
    components: { XBox },
    
    props:
    {
        /**
            Image data string.
        */
        data: String
    },
    
    computed:
    {
        image() { return 'data:image/png;base64,' + this.data }
    }
}
</script>
