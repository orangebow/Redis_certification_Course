# What are the bare minimum files we need to develop mq?
1. api.js ---- Producers.
2. Queue.js --- Providing waiting list.
3. Worker.js --- consumer of the jobs produced by the workers.

# Basic Archetectur:
1. Producer on the behalf of the client produce jobs
2. Waiting list hold the jobs until one of the consumers get free.
3. wokers also know as the consumers do actuall jobs. There can be many workers.

! Note : these queues hold jobs, these jobs are not the video themselves, but are the 