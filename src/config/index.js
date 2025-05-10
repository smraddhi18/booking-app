const { cleanEnv, str, port, num } = require('envalid');

module.exports = cleanEnv(process.env, {
  PORT: port({ 
    default: 3000,
    desc: 'Port to bind the HTTP server'
  }),
  
  MONGO_URI: str({ 
    desc: 'MongoDB connection string (e.g. mongodb+srv://…)' 
  }),
  
  JWT_SECRET: str({ 
    desc: 'JWT signing secret — keep this safe!' 
  }),

  RATE_LIMIT_WINDOW_MS: num({
    default: 15 * 60 * 1000,      // 15 minutes
    desc: 'Window size (in milliseconds) for rate‑limiting'
  }),

  RATE_LIMIT_MAX_REQUESTS: num({
    default: 100,                 // allow 100 requests per window
    desc: 'Max number of requests per window per IP'
  }),

  NODE_ENV: str({
    default: 'production',
    desc: 'Node environment variable'
  })
});
