import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const publisher = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.post("notifications", async (req,res)=>{
    const payload = {
        title: req.body.title || "Default Title",
        createdAt: new Date().toISOString()
    };
    const recievers = await publisher.publish("notifications", JSON.stringify(payload));
    res.json({message: `Notification sent to ${recievers}  subscribers`});
});

app.listen(3000, ()=>{
    console.log("API server is listening at http://localhost:3000");
});

