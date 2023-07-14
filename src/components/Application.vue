<template>
  <x-app colors="text" min-height="100vh" font="base" :style="{ backgroundColor: bgColor }" @click="hideNav(false)">
    <x-context 
      :hideCtrls="hideCtrls" 
      :mobile="smallScreen" 
      :bgColor="bgColor"
      :bgIsDark="color(bgColor).isDark()"
      :cs="colspace"
      :rs="rowspace"
    >
      <apex-nav v-bind="navProps[navState]" :hide.sync="hideCtrls" transition="nav" @input="bgColor = $event" />
      <router-view />
      <apex-footer />
    </x-context>
  </x-app>
</template>


<script>
import color from 'color'
import { XApp, XBox, XContext } from 'exude';
import { m_media_query } from 'exude'
import ApexFooter from './ApexFooter'
import ApexNav from './ApexNav'
import router from '_source/config/router'


export default
{
    name: 'Application',    
    
    el: `#${app.rootHtmlId}`,
    
    router,
    
    mixins: [ m_media_query('smallScreen') ],
    
    components: { ApexFooter, ApexNav, XApp, XBox, XContext },
    
    data: () => 
    ({
        bgColor: 'black',
        color,
        colspace: 5,
        rowspace: 4, 
        hideCtrls: false, 
        // hideLbls: false,
        navState: 'show'
    }),
    
    created()
    {
        this.navProps =
        {
            show: { trbl: 'l6 t6', opacity: 1 },
            hide: { trbl: 'l-20 t6', opacity: 0 }
        }
        
        let timeId = null;
        this.hideNav = bool =>
        {
            clearTimeout(timeId);
            
            if (bool)
            {
                timeId = setTimeout(() => this.navState = 'hide', 4000);
            }
            else
            {
                this.navState = 'show';
                // hide again if necessary
                if (this.hideCtrls) this.hideNav(this.hideCtrls);
            }
        }
        this.$watch('hideCtrls', this.hideNav)        
    }
}
</script>
