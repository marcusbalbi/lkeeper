export default {
  secret: 'test',
  exp_time: Math.floor(Date.now() / 1000) + 60 * 60, //1 hour
};
