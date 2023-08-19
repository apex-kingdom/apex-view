<template>
  <x-app :colors="`text:${bgColor}`" min-height="100vh" font="base" @click="hideNav(false)">
    <x-context 
      :hideCtrls="hideCtrls" 
      :hideLbls="settings.noLabels"
      :mobile="smallScreen" 
      :bgColor="bgColor"
      :ext="color('white', 'black')"
      :gray="color('ltgray', 'gray')"
      :apex="color('quarter', 'prime')"
      :red="color('lightcoral', 'darkred')"
      :dm="bgIsDark ? '_l' : '_d'"
      :sm="bgIsDark ? '_d' : '_l'"
      :cs="colspace"
      :rs="rowspace"
    >
      <x-box v-listen-outside-click="() => openConfig = false" pos="fixed" trbl="t0 b0 l0" z-index="1000">
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
import { listenOutsideClick } from 'exude'
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
    
    directives: { listenOutsideClick },
    
    data: () => 
    ({
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
        // color swapper
        this.color = (light, dark) =>
        {
            let obj = { light, dark };
            
            Object.defineProperty(obj, 'diff', { get: () => this.bgIsDark ? light : dark, enumerable: true });
            Object.defineProperty(obj, 'same', { get: () => this.bgIsDark ? dark : light, enumerable: true });
            
            return obj;
        }
    },
    
    computed:
    {
        bgColor() { return this.settings.bgColor || 'black'; },
        
        bgIsDark() { return color(this.bgColor).isDark(); },
      
        colspace() { return this.settings.noGutters ? 0 : 5; },
        
        rowspace() { return this.settings.noGutters ? 0 : 4; }
    }
}
</script>
