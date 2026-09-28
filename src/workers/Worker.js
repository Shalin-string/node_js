const { Worker } = require("bullmq");
const Redis = require("ioredis");
const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const mailSend = require("../utils/MailUtils");

const redisConnection = new Redis(
  "redis://default:reDicq1gyjvZxZwdKafuBv5sypTVLviW@property-flight-neofast-41156.db.redis.io:19491",
  {
    maxRetriesPerRequest: null,
  },
);

const worker = new Worker(
  "taskQueue",
  async (job) => {
    console.log(`job has been started for ${job.data.name}`);
    console.log(`email = ${job.data.email}`);
    await mailSend(
      job.data.email,
      "hello from shalin",
      "not so important message",
    );
  },
  { connection: redisConnection },
);

worker.on("completed", (job) => {
  console.log(`task done for ${job.id}`);
});
worker.on("failed", (job, err) => {
    console.log(`task failed: ${job.id}`);
    console.log("ERROR:", err);
    console.log("ERROR MESSAGE:", err.message);
});