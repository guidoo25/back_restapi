import express from "express";
import morgan from "morgan";
import cors from "cors";
import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";
import authRoutes from "./routes/authRoute.js";
import regisRoutes from "./routes/registerRoute.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
  allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));

// Routes
app.use("/", indexRoutes);
app.use("/api", employeesRoutes);
app.use("/api",authRoutes)
app.use("/api",regisRoutes)

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

export default app;
