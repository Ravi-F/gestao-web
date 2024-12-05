import { app, port } from './config/config.js'; 
import db from "./database/db.js";

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await db.sync({ force: false });
});