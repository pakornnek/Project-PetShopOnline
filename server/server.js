const express = require("express");
const app = express();
const morgan = require("morgan");
const { readdirSync } = require("fs");
const cors = require('cors')




app.use(morgan("dev"));
app.use(express.json({limit: '20mb'}));
app.use(cors())





readdirSync("./routes")
.map((p)=> app.use("/api", require("./routes/" + p)));

app.listen(5005, () => console.log("Server is Running on port 5005"));
