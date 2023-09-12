<template>
  <x-app :colors="`text:${bgColor}`" min-height="100vh" font="base" @click="hideNav(false)">
    <e-transition sel="div" property="width,height,margin,gap" :duration=".15" timing="ease" />
    <x-context v-bind="context">
      <x-box v-listen-outside-click="() => openConfig = false" pos="fixed" trbl="t0 b0 l0" z-index="1000">
        <app-settings 
          :show="openConfig" 
          :bgColor.sync="bgColor"
          @update="settings = $event" 
          @about="openAbout = !openAbout, openConfig = false"
        />
        <main-nav 
          v-bind="navProps[navState]" 
          :hide.sync="hideCtrls" 
          :small="smallScreen"
          transition="nav" 
          z-index="10"
          @config="openConfig = !openConfig" 
          @bg-color="bgColor = $event"
          @hover="navHover = $event"
        />
      </x-box>
      <x-when #default="props" :test="openAbout" opacity="0" w-opacity="1" z-index="-1" w-z-index="1010">
        <x-flex v-bind="props" aligns=":center:center" colors=":black_f.25" pos="fixed" trbl="a0">
          <x-box 
            colors=":black" 
            height="75%" 
            width="75%" 
            overflow="auto"
            overscroll="contain"
            border="a1vw!black"
            pad="a1vw" 
            shadow="floater" 
            transition="about" 
            radius="a6"
          >
            <about @close="openAbout = false" />
          </x-box>
        </x-flex>
      </x-when>
      <x-box pos="relative" z-index="1">
        <router-view />
      </x-box>
    </x-context>
  </x-app>
</template>


<script>
import color from 'color'
import { ETransition, XApp, XBox, XContext, XFlex, XWhen } from 'exude';
import { m_media_query } from 'exude'
import { listenOutsideClick } from 'exude'
import About from './About'
import AppSettings from './AppSettings'
import MainNav from './MainNav'
import router from '_source/config/router'


export default
{
    name: 'Application',    
    
    el: `#${app.rootHtmlId}`,
    
    router,
    
    mixins: [ m_media_query('smallScreen') ],
    
    components: { About, AppSettings, ETransition, MainNav, XApp, XBox, XContext, XFlex, XWhen },
    
    directives: { listenOutsideClick },
    
    data: () => 
    ({
        bgColor: 'black',
        hideCtrls: false,
        navHover: false, 
        navState: 'show',
        openAbout: false,
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
                if (!this.openConfig && !this.navHover)
                    timeId = setTimeout(() => this.navState = 'hide', 4000);
            }
            else
            {
                this.navState = 'show';
                // hide again if necessary
                if (this.hideCtrls) this.hideNav(this.hideCtrls);
            }
        }
        
        ['hideCtrls', 'openConfig', 'navHover'].forEach(p => this.$watch(p, () => this.hideNav(this.hideCtrls)));
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
        bgIsDark() { return color(this.bgColor).isDark(); },
        
        context()
        {
            let { noCounts, noGutters, noLabels } = this.settings;
            
            let context =
            {
                hideCtrls: this.hideCtrls,
                hideLbls: noLabels,
                hideCnts: noCounts,
                mobile: this.smallScreen,
                bgColor: this.bgColor,
                ext: this.color('white', 'black'),
                gray: this.color('ltgray', 'gray'),
                apex: this.color('quarter', 'prime'),
                red: this.color('lightcoral', 'darkred'),
                dm: this.bgIsDark ? '_l' : '_d',
                sm: this.bgIsDark ? '_d' : '_l',
                cs: noGutters ? 0 : 5,
                rs: noGutters ? 0 : 4
            };
            
            return context;
        }
    }
}
</script>
