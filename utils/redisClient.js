import { createClient } from 'redis';

// Create Redis client
const client = createClient();

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

// Connect to Redis
(async () => {
  try {
    await client.connect();
    console.log('Connected to Redis...');
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
})();

export default client;
