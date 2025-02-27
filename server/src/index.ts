import express from "express";
import { coloredConsoleLog } from "./utils/logger";
import { userRoutes } from "./routes/index"; 
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 5000; 

app.use(express.json());

// routes
app.use('/api', userRoutes); 

app.listen(port, () => {
  coloredConsoleLog('highlight', `Server is running on port ${port}`);
})