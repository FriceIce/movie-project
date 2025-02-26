import express from "express";
import { coloredConsoleLog } from "./utils/logger";

const app = express();
const port = process.env.PORT || 5000; 

app.listen(port, () => {
  coloredConsoleLog('highlight', `Server is running on port ${port}`);
})