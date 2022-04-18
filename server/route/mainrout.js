// const apik = require('../middleware/apikey');
const router=require('express').Router();
// const apikmid=require('../middleware/apikey');           //importing middleware api 
const cors=require('cors')
const fpic=require('express-fileupload');
const fs = require("fs");
const flash = require('connect-flash');
const coki=require('cookie-parser');
const mysql=require('mysql');                 //importing mysql
const session=require('express-session');
 const bodyParser = require('body-parser');          //body parser is needed to parse or  to take data after submition like in  form
const { json, text } = require('body-parser');
const fileUpload = require('express-fileupload');
const bcrypt=require('bcrypt');
const saltRounds=10;
const path = require('path');
const { Console } = require('console');
const { Router } = require('express');
router.use(cors(
    {
        origin:['http://localhost:3000'],
        methods:['GET','POST'],
        credentials:true,
    }
));
 router.use(bodyParser.urlencoded({ extended: true}))
 router.use(fileUpload());
 router.use(coki());
 router.use(flash());
 router.use(session({
      key: "userId",
      secret:'some secret',
      resave: false,
      saveUninitialized:false,
      cookie:{maxAge:24*60*60*1000}
 }))                            //importing middlware for whole file
 router.use(bodyParser.json())                                           //writing one by one
const pool=mysql.createPool({          //create a pool or a area where database and details are there
    connectionLimit: 10,
    host:'localhost',
    user:'root',
    password:'',
    database:'react_db'

})
router.get('/',(req,res)=>       
{          //here 'text' is a key for flash 
   if (req.session.loggedin) {
       res.send({loggedin:true,user:req.session.user})
    //    res.send(req.session.loggedin)
   } else {
    res.send({loggedin:false})             // flash taking as object
   }                               
})
router.post('/gallery',(req,res)=>       
{
    
    pool.getConnection((err, connection) => {
        let sampleFile;
        let uploadPath;

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        // name of the input is sampleFile
        sampleFile = req.files.pname;
        uploadPath = '../my-app/public/images/' + sampleFile.name;
        desc= req.body.pdesc;
        title=req.body.ptitle;
        console.log(sampleFile);
        // Use mv() to place file on the server
        sampleFile.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err);

          connection.query('INSERT into gallery SET title=? ,name=?,description=?', [title, sampleFile.name,desc], (err, rows) => {
                connection.release()
                if (!err) {
                    console.log('done');
                } else {
                    console.log(err);
                }
            });
        });

    })

})
router.post('/signup',(req,res)=>       
{
   pool.getConnection( (err, connection) => {
      if (err)
          throw err;

      // const {name,mail,password} = req.body
      const name = req.body.name;
       const password = req.body.password;
      
       connection.query('SELECT * FROM user where name=?', [name], function (error, results) {
        connection.release();
        if (error)
            throw error;

        if (results.length > 0) {
            res.send({message:'username already exixt'});
            console.log('uxseendndn');
          } else {
              connection.query('INSERT INTO user SET ?', ({ name: name, password: password }), (err, rows) => {
                  // return the connection to pool
                  if (!err) {
                      console.log('signnning')
                  }

                  console.log('done');

              });
          }
      });
    })

})  
router.get('/login',(req,res)=>       
{          //here 'text' is a key for flash 
   if (req.session.loggedin) {
       res.send({loggedin:true,user:req.session.user})
    //    res.send(req.session.loggedin)
   } else {
    res.send({loggedin:false})             // flash taking as object
   }                               
})
router.post('/login',(req,res)=>       
{
    pool.getConnection((err, connection) => {
        if (err)
            throw err;
        var name = req.body.name;
        var password = req.body.password;
        if (name && password) {
            connection.query('SELECT * FROM user WHERE name = ?', [name],function (error, results) {
             
                if (results.length > 0) {
                    connection.query('SELECT * FROM user WHERE password= ?', [password],function (error, rows) {
                          connection.release();
                     if (results.length > 0) {
                        req.session.loggedin = true;
                        req.session.user = name;
                        console.log(req.session.user);
                        console.log(req.session.loggedin)
                      //   res.render('profile_pic',{results});
                        res.send({text:'yu logged in',result:results});
                    } else{
                        res.send({text:'wrong password'}); //flash for error message with key 'text' and message ''wrong info'
                    }
               })
              }
               else {
                   res.send({text:'wrong info '}); //flash for error message with key 'text' and message ''wrong info'
              }
         })
        }
    });
  })
router.get('/display',(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query('SELECT * from gallery',(err, rows) => {
            connection.release()
            if (!err) {
               res.send(rows)
            } else {
                console.log('errr')
            }
        }) 
   })
})
router.get('/edit/:id',(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query('SELECT * from gallery where id=?',[req.params.id],(err, rows) => {
            connection.release()
            if (!err) {
               res.send(rows)
            } else {
                console.log('errr')
            }
        }) 
   })
})
router.post('/edit/:id',(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) 
        throw err;
        const {ptitle, pdesc } = req.body;
        console.log(req.body);
        connection.query('UPDATE gallery SET title=?, description=? WHERE id=? ',[ptitle,pdesc,req.params.id], (err, results) => {
            connection.release()
            if (!err) {
                console.log('done up')
            } else {
                console.log('errrrrrrrr')
            }
        })
    })
})
router.get('/del/:id', (req, res) => {                         // delet is done by get not post
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected
                connection.query('DELETE FROM gallery where id=?', [req.params.id], (err, results) => {
                    connection.release()
                    console.log('done')
                })
            console.log('The data from user table: \n');
        });
})
router.post('/picture',(req,res)=>       
{
    pool.getConnection((err, connection) => {
        let sampleFile;
        let uploadPath;

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        // name of the input is sampleFile
        sampleFile = req.files.pname;
        uploadPath = '../my-app/public/images/' + sampleFile.name;
        desc= req.body.pdesc;
        // title=req.body.ptitle;
        console.log(sampleFile);
        // Use mv() to place file on the server
        sampleFile.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err);

          connection.query('INSERT into picture SET name=?,des=?', [sampleFile.name,desc], (err, rows) => {
                connection.release()
                if (!err) {
                    console.log('done');
                } else {
                    console.log(err);
                }
            });
        });

    })
})
router.get('/user',(req,res)=>       
{          
    pool.getConnection((err, connection) => {
        if (err) throw err
        if(!req.session.user)
       return res.send({logout:'not log'});
        connection.query('SELECT * from user where name=?',[req.session.user],(err, rows) => {
            connection.release()
            if (!err) {
                console.log(req.session.loggedin)
              return res.send(rows)
            } else {
             return  console.log('errr')
            }
        }) 
   })                           
})
router.get('/logout',(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) throw err
        req.session.destroy();
        if(!session.loggedin){
            res.send({logout:true})
        }else{
            console.log('some problem in logging out')
        }
    }) 
})
module.exports=router     
