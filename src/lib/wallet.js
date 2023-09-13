import axios from 'axios'


let cache = {};

export function wallet(input, reset = false)
{
    if (reset || !cache[input])
        return axios.get(`/wallet/${input}`).then(({ data }) => cache[input] = data);
    
    return Promise.resolve(cache[input]);
}


export function extra(entity, reset = false)
{
    let { __extra, __ready } = entity;
    
    if (__extra)
    {
        if (reset || !__ready)
        {
            entity.__ready = axios.post(...__extra)
                .then(r => Object.keys(r.data).reduce((o, k) => { o[k] = r.data[k] || o[k]; return o; }, entity))
                .catch(e => console.info('Unable to retrieve additional entity data', e));
        }
    }
    else
    {
        entity.__ready = Promise.resolve(entity);
    }
    
    return entity;
}


extra.all = function(entities, reset = false)
{
    return Promise.all(entities.map(entity => extra(entity, reset).__ready));
}
