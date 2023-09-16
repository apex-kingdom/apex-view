<template>
  <x-box v-listen-outside-click="heOutsideClick" pos="fixed" trbl="t0 b0 l0" z-index="1000">
    <e-extension sel=".nav" transition="nav" /> 
    <app-settings :show="openConfig" :bgColor.sync="bgColor" @update="heUpdate" @about="heAbout" />
    <main-nav 
      v-bind="navProps" 
      class="nav"
      :hide.sync="hideCtrls" 
      @config="heConfig" 
      @bg-color="bgColor = $event"
      @hover="navHover = $event"
    />
    <x-flex 
      v-if="openAbout" 
      aligns=":center:center" 
      colors=":black_f.25" 
      pos="fixed" 
      trbl="a0" 
      z-index="1010" 
      @click="openAbout = false"
    >
      <about colors=":black" size="75%" border="a1vw!black" shadow="floater" radius="a6" @close="openAbout = false" />
    </x-flex>
  </x-box>
</template>


<script>
import { EExtension, XBox, XFlex } from 'exude';
import { m_media_query } from 'exude'
import { listenOutsideClick } from 'exude'
import About from './About'
import AppSettings from './AppSettings'
import MainNav from './MainNav'


export default
{
    name: 'AppControl',    
    
    mixins: [ m_media_query('smallScreen') ],
    
    components: { About, AppSettings, EExtension, MainNav, XBox, XFlex },
    
    directives: { listenOutsideClick },
    
    data: () => 
    ({
        bgColor: 'black',
        hideCtrls: false,
        navHover: false, 
        navShow: true,
        openAbout: false,
        openConfig: false,
        settings: {}
    }),
    
    created()
    {
        let timeId = null;
        
        this.hideNav = bool =>
        {
            clearTimeout(timeId);
            
            if (bool)
            {
                // do not allow main nav to close if settings open
                if (!this.openConfig && !this.navHover)
                    timeId = setTimeout(() => this.navShow = false, 4000);
            }
            else
            {
                this.navShow = true;
                // hide again if necessary
                if (this.hideCtrls) this.hideNav(this.hideCtrls);
            }
        }
        
        let fireSettings = () => this.$emit('settings', 
        { 
            ...this.settings, 
            bgColor: this.bgColor,
            hideCtrls: this.hideCtrls,
            mobile: this.smallScreen 
        });
        
        ['hideCtrls', 'openConfig', 'navHover'].forEach(p => this.$watch(p, () => this.hideNav(this.hideCtrls)));
        ['bgColor', 'hideCtrls', 'settings', 'smallScreen'].forEach(p => this.$watch(p, fireSettings));
    },
    
    computed:
    {
        navProps()
        {
            let { navShow, smallScreen } = this;
          
            let props =
            {
                small: smallScreen,
                opacity: navShow ? 1 : 0,
                trbl: `r${navShow ? 'show' : 'hide'}nav t0`,
                zIndex: 10
            };
            
            return props;
        }
    },
    
    methods:
    {
        heAbout() { this.openAbout = !this.openAbout; this.openConfig = false; },
        
        heConfig() { this.openConfig = !this.openConfig; },

        heOutsideClick() { this.openConfig = false; this.hideNav(false); },
        
        heUpdate(settings) { this.settings = settings; }
    }
}
</script>
