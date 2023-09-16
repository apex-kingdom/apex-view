<template>
  <x-app :colors="`text:${settings.bgColor}`" min-height="100vh" font="base">
    <e-transition sel="div" property="width,height,margin,gap" :duration=".15" timing="ease" />
    <app-control @settings="settings = $event" />
    <x-context v-bind="context">
      <x-box pos="relative" z-index="1">
        <router-view />
      </x-box>
    </x-context>
  </x-app>
</template>


<script>
import color from 'color'
import { ETransition, XApp, XBox, XContext } from 'exude';
import AppControl from './AppControl'
import router from '_source/config/router'


export default
{
    name: 'Application',    
    
    el: `#${app.rootHtmlId}`,
    
    router,
        
    components: { AppControl, ETransition, XApp, XBox, XContext },
        
    data: () => ({ settings: {} }),
    
    created()
    {
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
        bgIsDark() { return color(this.settings.bgColor).isDark(); },
        
        context()
        {
            let { bgColor, hideCtrls, mobile, noCounts, noGutters, noLabels } = this.settings;
            
            let context =
            {
                hideCtrls,
                hideLbls: noLabels,
                hideCnts: noCounts,
                mobile,
                bgColor,
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
