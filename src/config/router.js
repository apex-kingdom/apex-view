import Vue from 'vue'
import Router from 'vue-router'
import Home from '_comps/pages/Home'
import Wallet from '_comps/pages/Wallet'
import WalletCollections from '_comps/sections/WalletCollections'
import WalletNfts from '_comps/sections/WalletNfts'
import WalletTokens from '_comps/sections/WalletTokens'


Vue.use(Router);

var routes = 
[
    { path: '/', name: 'home', component: Home },
    { 
        path: '/:address', 
        name: 'wallet',
        component: Wallet,
        children: 
        [
            
            { path: 't', name: 'tokens', component: WalletTokens },
            { path: 't/:hash?', name: 'tokens-filter', component: WalletTokens },
            { path: 'c', name: 'collections', component: WalletCollections },
            { path: 'c/:hash?', name: 'collections-filter', component: WalletCollections },
            { path: 'n', name: 'nfts', component: WalletNfts },
            { path: 'n/:hash?', name: 'nfts-filter', component: WalletNfts }
        ]
    }
]


export default new Router({ routes, mode: 'history' });
