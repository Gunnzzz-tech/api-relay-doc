const express= require('express');
const app=express();
app.use(express.json());
app.post('/convert',(req,res)=>{
    const {from,to}=req.body;
    const rates={
        'INR-USD':0.012,
        'INR-EUR':0.011,
        'INR-INR':1,
    };
    const key='${from}-${to}';
    const rate=rates[key];
    if(rate){
        res.json({from,to,rate});
    }
    else{
        res.status(400).json({error:'Unsupported currency pair'});
    }
});
app.listen(4000,()=>console.log('Backend B running on port 4000'));
