import app from "./src/app";
import { config } from "./src/config/env.config";
import logger from "./src/utils/logger.util";

try {
  app.listen(config.PORT, () => {
    logger.info(`Server Listening: http://localhost:${config.PORT}`);
  });
} catch (error) {
  if ((error as NodeJS.ErrnoException).code === "EADDRINUSE") {
    logger.error(`Port ${config.PORT} is already in use.`);
  } else if (error instanceof Error) {
    logger.error("Error starting the server:", error.message);
  } else {
    logger.error("An unknown error occurred.");
  }
  process.exit(1);
}
