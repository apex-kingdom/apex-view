
module.exports = num =>
{
    let period = {};
  
    Object.defineProperty(period, 'minutes', { get: () => num * 60, enumerable: true });
    Object.defineProperty(period, 'hours', { get: () => num * 60 * 60, enumerable: true });
    Object.defineProperty(period, 'days', { get: () => num * 60 * 60 * 24, enumerable: true });
    Object.defineProperty(period, 'weeks', { get: () => num * 60 * 60 * 24 * 7, enumerable: true });
    Object.defineProperty(period, 'months', { get: () => num * 60 * 60 * 24 * 30, enumerable: true });

    return period;
}
