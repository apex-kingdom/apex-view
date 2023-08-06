import axios from 'axios'


let cache = {};

export default function get(input, reset = false)
{
    if (reset || !cache[input])
        return axios.get(`/wallet/${input}`).then(({ data }) => cache[input] = data);
    
    return Promise.resolve(cache[input]);
}
