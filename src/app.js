require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const hpp = require("hpp");
const morgan = require("morgan");
const sanitize = require("./middlewares/sanitizeMiddleware");
const ratetLimiter = require('./middlewares/rateLimitMiddleware')
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const activityRoutes = require("./routes/activityRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const { NODE_ENV }  = require('./config');  

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
      },
    },
  })
);

app.use(
  cors({
    origin: ["https://your‑app.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(hpp());

app.use(compression());

app.use(sanitize);
app.use("/api/v1", ratetLimiter);

app.use(express.json({ limit: "10kb" }));
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("short"));
}

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/activities", activityRoutes);
app.use("/api/v1/bookings", bookingRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
