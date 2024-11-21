import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import paginate from "express-paginate";
import historyRoutes from "./routes/history.route";
import { notFound, errorHandler } from "./middlewares/error.middleware";
import { config } from "./config/env.config"

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: config.INV_SERVICE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(paginate.middleware(5, 50));

app.use("/api", historyRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
