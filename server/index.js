const express =require("express");
const dotenv =require("dotenv");
const apiRoutes =require('./routes');
const cors= require('cors');
dotenv.config();



const app =express();
const PORT=process.env.PORT;


// middlewares
app.use(cors());
app.use(express.json());
app.use("/api",apiRoutes);

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})
