# ⚡ Mastering Redis Hashes: The Ultimate Guide

A high-performance, developer-friendly guide to managing structured object data in Redis using **Hashes**. Learn how to efficiently map fields to values using `HSET`, `HGET`, and `HGETALL`.

---

## 🗺️ Visualizing a Redis Hash

Unlike a basic Key-Value string pair, a **Redis Hash** acts like a flat JavaScript object or a dictionary nested inside a key. It is the most memory-efficient data structure for storing user profiles, configurations, or session objects.

| Redis Key | Field (Property) | Value |
| :--- | :--- | :--- |
| **`user:101:profile`** | `username` | `"ironman"` |
| | `level` | `"99"` |
| | `isOnline` | `"true"` |

---

## 🛠️ Core Hash Commands & Implementation

### 1. 🟢 `HSET` — Create or Update Fields
Sets the specified fields to their respective values within the hash stored at the key. If the key does not exist, a new key holding a hash is created.

* **CLI Syntax:** `HSET key field value [field value ...]`
* **Node.js (`ioredis`):** `await redis.hset(key, object);` or `await redis.hset(key, field, value);`

#### 💻 Terminal Example:
```bash
127.0.0.1:6379> HSET user:101:profile username "ironman" level "99" isOnline "true"
(integer) 3