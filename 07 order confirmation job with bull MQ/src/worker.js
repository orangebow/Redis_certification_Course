import {Worker} from 'bullmq';
import {connection} from './queue.js';

const worker = new Worker(
    'emails', // Parameter 1: which queue to listen to
    async (job) => { // Parameter 2: the function(Business logic) to process the job
        console.log("Processing email job", job.id, job.name, job.data);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Email job completed", job.id ,job.name, job.data);
    },
    {connection} // Parameter 3: the connection options for Redis
);

worker.on('completed', (job) => {
    console.log("Job completed event received for job", job.id, job.name, job.data);
});

worker.on('failed', (job, err) => {
    console.log("Job failed event received for job", job.id, job.name, job.data, "Error:", err);
});