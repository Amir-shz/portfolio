import mongoose from "mongoose";

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// One shared connection per server process (survives hot reloads in dev).
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      // fail fast instead of hanging a request for 30s when the DB is down
      serverSelectionTimeoutMS: 10_000,
      // close pooled sockets before the host drops them for being idle,
      // which otherwise shows up as "read ECONNRESET" on the next query
      maxIdleTimeMS: 60_000,
    };

    cached.promise = mongoose.connect(DB, options).then((m) => {
      console.log("DB connected");
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // don't cache a failed attempt, so the next request tries again
    cached.promise = null;
    throw error;
  }
  return cached.conn;
}
