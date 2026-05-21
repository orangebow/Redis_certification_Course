import express from "express";
import {emailQueue} from "./queue.js";
const app = express();
app.use(express.json());


app.post('/welcome-email', async (req, res)=>{
    const job = emailQueue.add('send-welcome-email', 
        {
            to : req.body.to,
            name : req.body.name || "Learner",
        },
        {
            attempts : 3, // Number of times to retry the job if it fails
             backoff : {
                type : 'exponential', // Type of backoff strategy (e.g., fixed, exponential)
                delay : 2000, // Initial delay in milliseconds before retrying the job
             }, 
        }

    );

    res.json({message : "Welcome email job has been added to the queue", jobId : job.id});
});

app.listen(3000,()=>{
    console.log("server is running on the http://localhost:3000");
});