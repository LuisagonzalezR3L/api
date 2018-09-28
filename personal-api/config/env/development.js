module.exports = {
  'web': {
    'port': process.env.PORT || 3000,
  },
  'db': {
    'connectionString': 'mongodb://r3l:TrudatDB!@candidate.63.mongolayer.com:10158,candidate.64.mongolayer.com:10006/r3l-dev?replicaSet=set-56a64ef1800903aee6000d01'
  },
  'env':'development'
};
