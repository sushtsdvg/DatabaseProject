const button=document.getElementById('exec');
button.onclick=execute();
function execute(){
const {Client, Query}=require('pg');
    const client=new Client({
        host:"localhost",
        user:"postgres",
        port:5432,
        password:"sush",
        database:"Employee"
    })
    client.connect();
    
    client.query(`select firstname from Employee group by empid`,(err,res)=>{
        if(!err){
            console.log(res.rows);
        } else{
            console.log(err.message);
        }
        client.end;
    })
}
