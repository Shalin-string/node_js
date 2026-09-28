const {Worker} = require("bullmq")
const Redis = require("ioredis")

const redisConnection = new Redis(
  "redis://default:reDicq1gyjvZxZwdKafuBv5sypTVLviW@property-flight-neofast-41156.db.redis.io:19491",
  {
    maxRetriesPerRequest:null
  }
);

const worker = new Worker(
    "taskQueue",
    async(job)=>{
        console.log(`job has been started for ${job.data.name}`);
        console.log(`email = ${job.data.email}`)
        await new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve()
            }, 3000);
        })
    },
    {connection:redisConnection}
)

worker.on("completed",(job)=>{
    console.log(`task done for ${job.id}`)

})
worker.on("failed",(err)=>{
    console.log(`task failed : ${err}`)
})

