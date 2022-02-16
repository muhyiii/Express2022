const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;
const router = require("./routes/index");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(router);

////////////////////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`....................Server Berjalan di port ${port} Berhasil....................`);
});
////////////////////////////////////////////////////////////////////
