const express =require("express");
const router = express.Router();
const {handleSubmit}=require('../../middlewares/handleSubmit');

router.post('/submit',handleSubmit)

module.exports=router;
