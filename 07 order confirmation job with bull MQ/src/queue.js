import {Queue} from 'bullmq';

const connection = {
    host : 'localhost',
    port : 6379,
};

const emailQueue = new Queue('emails', {connection});

// Similarly, we can create queue for order
// for payment
// and in this manner we can create multiple queues for different purposes and process them separately in different workers -- Scaling.


module.exports ={
    emailQueue,
    connection,
};