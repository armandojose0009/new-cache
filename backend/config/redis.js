const Redis = require('ioredis');

const redis = new Redis({
  host: `redis`,
  port: 6379
});

redis.on('connect', () => {
  console.log('Conectado a Redis');
});

redis.on('error', (error) => {
  console.error('Error en Redis:', error);
});

module.exports = redis;
