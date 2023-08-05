
/**
    Icons.
    -------------------------
*/
let reKey = /^(.+\/)*(.+)[.].+$/;
let files = require.context('./icons/', false, /\.svg$/);
let icons = files.keys().reduce((o, k) => ({ ...o, [k.replace(reKey, '$2')]: files(k).default }), {});

export { icons }
