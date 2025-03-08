import express from "express";
import { consoleLog } from "./utils/logger";
import { userRoutes } from "./routes/index"; 
import 'dotenv/config'
import { errorHandler } from "./utils/error/errorFunc";

const app = express();
const port = process.env.PORT || 5000; 

app.use(express.json());

// routes
app.use('/api', userRoutes); 

app.listen(port, () => {
  consoleLog('highlight', `Server is running on port ${port}`);
})