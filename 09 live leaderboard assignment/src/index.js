import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.post("/post/:id/vierw", async (req,res)=>{
    const postId = req.params.id;
    const userId = req.body.userId;

    // Increment the view count for the post
    const viewCount = await redis.incr(`post:${postId}:views`);
    res.json({ viewCount });
});

app.post("/leaderboard/:userId/score", async (req,res)=>{
    const userId = req.params.userId;
    const score = req.body.score;

    //add points to the user's score in the leaderboard
    await redis.zincrby("leaderboard", score, userId);
    res.json({ message: "Score updated successfully" });
});

app.get("/leaderboard", async (req,res)=>{
    // Get the top 10 users from the leaderboard
    const leaderboard = await redis.zrevrange("leaderboard", 0, 9, "WITHSCORES");
    const formattedLeaderboard = [];
    for(let i=0; i<leaderboard.length; i+=2){
        formattedLeaderboard.push({ userId: leaderboard[i], score: parseInt(leaderboard[i+1]) });
    }
    res.json({ leaderboard: formattedLeaderboard });
});

app.get("/leaderboard/:userId/rank", async (req,res)=>{
    const userId = req.params.userId;

    // Get the rank of the user in the leaderboard
    const rank = await redis.zrevrank("leaderboard", userId);
    const score = await redis.zscore("leaderboard", userId);

    if (rank === null || score === null) {
        return res.status(404).json({ error: "User not found in leaderboard" });
    }

    res.json({ rank: rank + 1, score: parseInt(score) });
});

app.listen(3000, ()=>{
    console.log("Server is running on http://localhost:3000");
});