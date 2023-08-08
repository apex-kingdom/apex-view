<template>
  <x-app colors="text" min-height="100vh" font="base" :style="{ backgroundColor: bgColor }" @click="hideNav(false)">
    <x-context 
      :hideCtrls="hideCtrls" 
      :hideLbls="settings.noLabels"
      :mobile="smallScreen" 
      :bgColor="bgColor"
      :bgDiff="color(bgColor).isDark() ? 'white' : 'black'"
      :bgDiff2="color(bgColor).isDark() ? 'ltgray' : 'gray'"
      :bgSame="color(bgColor).isDark() ? 'black' : 'white'"
      :bgSame2="color(bgColor).isDark() ? 'gray' : 'ltgray'"
      :cs="colspace"
      :rs="rowspace"
    >
      <x-box pos="fixed" trbl="t0 b0 l0" z-index="1000">
        <app-settings :show="openConfig" @update="settings = $event" />
        <f-main-nav 
          v-bind="navProps[navState]" 
          :hide.sync="hideCtrls" 
          :small="smallScreen"
          transition="nav" 
          @config="openConfig = !openConfig" 
        />
      </x-box>
      <x-box pos="relative" z-index="1">
        <router-view />
      </x-box>
    </x-context>
  </x-app>
</template>


<script>
import color from 'color'
import { XApp, XBox, XContext } from 'exude';
import { m_media_query } from 'exude'
import FMainNav from './face/FMainNav'
import AppSettings from './AppSettings'
import router from '_source/config/router'


export default
{
    name: 'Application',    
    
    el: `#${app.rootHtmlId}`,
    
    router,
    
    mixins: [ m_media_query('smallScreen') ],
    
    components: { AppSettings, FMainNav, XApp, XBox, XContext },
    
    data: () => 
    ({
        color,
        hideCtrls: false, 
        navState: 'show',
        openConfig: false,
        settings: {}
    }),
    
    created()
    {
        this.navProps =
        {
            show: { trbl: 'rshownav t0', opacity: 1 },
            hide: { trbl: 'rhidenav t0', opacity: 0 }
        }
        
        let timeId = null;
        this.hideNav = bool =>
        {
            clearTimeout(timeId);
            
            if (bool)
            {
                // do not allow main nav to close if settings open
                if (!this.openConfig)
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
        this.$watch('openConfig', () => this.hideNav(this.hideCtrls))        
    },
    
    computed:
    {
        bgColor() { return this.settings.bgColor || 'black'; },
      
        colspace() { return this.settings.noGutters ? 0 : 5; },
        
        rowspace() { return this.settings.noGutters ? 0 : 4; }
    }
}
</script>
