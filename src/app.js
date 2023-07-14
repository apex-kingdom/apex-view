import Vue from 'vue'
import Verte from 'verte'
import exude from 'exude'
import Application from './components/Application'
import uiConfig from './config/exude'


exude(uiConfig);

Vue.use(Verte, 
{
    recentColors: JSON.parse(localStorage.getItem('colors')),
    onRecentColorsChange: (colors) => localStorage.setItem('colors', JSON.stringify(colors))
});

new Vue(Application);
