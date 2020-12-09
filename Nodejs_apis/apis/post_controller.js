const { QueryTypes} = require('sequelize');
const signature = require("../security/security").Signature;
const jwToken = require("jsonwebtoken");

var date_actu = new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDay()+" "
+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();

module.exports = (app,bodyParser,db)=>{


    app.post("/signin",bodyParser.json(),(req,res)=>{
        return db.sequelize.query(
            "SELECT id FROM Emetteurs WHERE email=? AND password=?",
        {
            replacements: [req.body.email,req.body.password],
            type:QueryTypes.SELECT
        }).then((result)=>{
            try{               
                    //create the token
                    var token = jwToken.sign({
                        email:req.body.email,
                        password:req.body.password
                    },
                    signature
                    ,
                    {
                        expiresIn:60*60
                    }
                    );
                    //create the object to send ,
                    var obj={
                        idUser:result[0].id,
                        idToken:token,
                        error:true
                    }
                return res.status(200).send(obj);
            }catch(err){
                return res.status(403).send({error:false});
            }
            
        })
       
    });


    app.post("/insert_retrait",bodyParser.json(),async(req,res)=>{

        //fetch the user in the database
        var user_exist=await db.sequelize.query(
            "SELECT nom FROM Emetteurs WHERE id=?",
            {
                replacements:[
                    req.body.recepteur_id
                ],
                type:QueryTypes.SELECT
            }
        )

        //verify if the target exists
        if(user_exist!==null){

            //==========we verify if the solde of the account of the sender is greater==============
            var solde_suffisant = await db.sequelize.query(
            "SELECT id FROM Comptes WHERE (solde+10000) > ? AND userId = ?",
            {
                replacements:[
                    req.body.montant,
                    req.body.emmeteur_id
                ],
                type:QueryTypes.SELECT
            }
        )

            if(solde_suffisant!==null){

                var t = await db.sequelize.query(
                    "INSERT INTO Envois (date, type_transaction, montant, emmeteurId, RecepteurId) VALUES (?,?,?,?,?)",
                    {
                        replacements:[
                            date_actu,
                            "DEPOT",
                            req.body.montant,
                            req.body.emmeteur_id,
                            req.body.recepteur_id
                        ],
                        type:QueryTypes.INSERT
                    }
                )
        
                if(t!==null){
                    
                    //update the Compte of the receptor
                    var update_recepteur = await db.sequelize.query(
                        "UPDATE Comptes set solde=solde+? WHERE userId=?",
                        {
                            replacements:[
                                req.body.montant,
                                req.body.recepteur_id
                            ],
                            type:QueryTypes.UPDATE
                        }
                    )


                    //update the account of the sender
                    var update_sender = await db.sequelize.query(
                        "UPDATE Comptes set solde=solde-? WHERE userId=?",
                        {
                            replacements:[
                                req.body.montant,
                                req.body.emmeteur_id
                            ],
                            type:QueryTypes.INSERT
                        }
                    )

                    if(update_recepteur!==null && update_sender!==null){
                        var obj={
                            montant:req.body.montant,
                            type:"RETRAIT"
                        }
                        res.send({success:true,info:[obj]});
                    }else{
                        res.send({success:false,message:"UPDATE FAILED"});
                    }
                    
                }else{
                    res.send({success:false});
                }

            }else{
                res.send({success:false,message:"LE SOLDE EST INSUFFISANT"});
            }

        }else{
            res.send({success:false,message:"THE RECEPTOR DOES NOT EXIST"});
        }

       
        
    });

   

    app.post("/insert_compte",bodyParser.json(),async(req,res)=>{
        var t = await db.sequelize.query(
            "INSERT INTO Comptes(solde,userId) VALUES(?,?)",
            {
                replacements: [req.body.solde,req.body.user_id],
                type: QueryTypes.INSERT
            }
          )

         if(t!==null){
             res.send({solde:req.body.solde,userId:req.body.user_id,success:true});
         }else{
            res.send({success:false});
         }
    });

    app.post("/insert_user",bodyParser.json(),async(req,res)=>{
        var obj ={
            nom:req.body.nom,
            prenom:req.body.prenom,
            tel: req.body.tel,
            cin:req.body.cin,
            email:req.body.email,
            password:req.body.password
        }

        var val=await db.sequelize.query(
            "INSERT INTO Emetteurs(nom,prenom,tel,cin,email,password) VALUES (?,?,?,?,?,?)",
            {
                replacements:[
                    obj.nom,
                    obj.prenom,
                    obj.tel,
                    obj.cin,
                    obj.email,
                    obj.password
                ],
                type:QueryTypes.INSERT
            }
        )

       if(val!==null){
           res.status(200).send(obj);
       }else{
           res.json({error:true});
       }
        
    });



}