const Redis = require('ioredis');

const redisInit = async () => {
    const redisClient = new Redis({
        host: '127.0.0.1',
        port: 6379
    });

    
    await redisClient.set('myKey', 'Hello from node');
    const myKeyValue = await redisClient.get('myKey');

    console.log(myKeyValue);
    redisClient.quit();


}

redisInit();

// export default redisInit;

