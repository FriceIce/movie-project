import express from "express";
import helmet from "helmet";
import cors from "cors"; 
import { consoleLog } from "./utils/logger";
import { userRoutes } from "./routes/index"; 
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 5000; 

// middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// routes
app.use('/api', userRoutes); 

app.listen(port, () => {
  consoleLog('highlight', `Server is running on port ${port}`);
})