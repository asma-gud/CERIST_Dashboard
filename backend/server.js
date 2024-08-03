import express, { json } from 'express';
import mysql from 'mysql';
import  jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import request from 'request';
import cookieParser from 'cookie-parser';
import cors from 'cors';
/* _______________________________________const_______________________________________  */
const salt = 10;
const app = express();
/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  
  app.get('/', (req, res) => {
    request(
      { url: 'http://localhost:3000/' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status
        }
  
        res.json(JSON.parse(body));
      }
    )
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`listening on ${PORT}`));
/*____________________________________________________________________________________ */
app.use(cors());
app.use(express.json());

app.use(cookieParser());
/* _______________________________________db connection_______________________________________  */
const db = mysql.createConnection ({
    
    host: '192.168.64.2',
    user: "root",
    password: "",
    database: "CERIST",
    
}
)
db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + db.threadId);
});
/* _______________________________________Signup in db_______________________________________  */
app.post('/Dash/form',(req, res)=>{
    const sql="INSERT INTO Signup (`Nom` ,`Prenom` , `Email` , `Password` , `Numtel`,`Admin`) VALUES (?)"
  
    const values =[
        req.body.Nom,
        req.body.Prenom,
        req.body.Email,
        req.body.mdp,
        req.body.Numtel,
        parseInt(req.body.Admin)
       
    
    ]
    db.query(sql,[values] , (err , data)=>{
        if(err){
            console.log(err);
            if(err.code==='ER_DUP_ENTRY') return res.json({ Error: "Error : cet email existe déja"});
            else return res.json({ Error: "Error lors de la creation de ce compte"});

        }
        console.log(" Success")
        return res.json({Status:true});
    })
   })
   /* ______________________________________home page______________________________________  */
  
    app.get('/home',(req,res)=>{
      
      return res.json({Status :true })
    })
   /* ______________________________________login in db______________________________________  */
   function getdata (Nom , Email,Admin,Status){
    return {
      Nom :Nom,
      Email : Email,
      Admin: Admin,
      Status: Status,

     }
}
   app.post('/login',(req, res)=>{
    const sql="SELECT * FROM Signup WHERE Email = ?";
    db.query(sql,[req.body.email] , (err , data)=>{
        if(err){
           
            return res.json({ Error: "login Error in server"});

        }
        if(data.length >0){
            if(data[0].Password === req.body.password){
            console.log(" Success");
            const Nom=data[0].Nom +' '+ data[0].Prenom;
              
            return res.json(getdata(Nom ,data[0].Email,data[0].Admin ,true))}
        else{ 
          console.log(" ERROR")
        return res.json(getdata(false,""))}
        }
      
    })
   })
   /* ______________________________________Get all user from db______________________________________  */
   app.post('/Dash/team',(req, res)=>{
    const sql="SELECT * FROM Signup";
    db.query(sql , (err , data)=>{
        if(err){
           
            return res.json({ Error: " Error in server"});

        }
        if(data.length >0){
         
            console.log(" Success");
              
            return res.json({Users : data , Status: true})}
        else{ 
          console.log(" ERROR")
        return res.json({Status: false})}
        })
      
    })
app.listen(8081,()=>{
    console.log("Running ...");
})
/* ______________________________________delete users from db______________________________________  */

app.delete('/Dash/team:id',(req,res)=>{
  const sql = "DELETE FROM Signup WHERE id = ?"
  const id = req.params.id;
  db.query(sql,[id] , (err , data)=>{
   
    if(err){
      console.log(err);
    
      return res.json({ Error: "Deleting data Error in server"});

  }
 
  return res.json({Status:true});
    }
  
)})

