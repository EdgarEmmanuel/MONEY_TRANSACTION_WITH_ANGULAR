let signature = require("../security/security").Signature;
const middleware = require("../security/security").middleware;
var jwToken = require("jsonwebtoken");
const { QueryTypes} = require('sequelize');

module.exports =(app,emetteur,db)=>{

    app.get("/users",(req,res)=>{
        emetteur.findAll({
            attributes: ['nom','prenom','tel','cin','email','password'],
            raw:true
        })
        .then((users)=>{
            res.send(users);
        });
    });



    app.get("/get_cni/:cni",middleware,(req,res)=>{
        db.sequelize.query(
            "SELECT id FROM Emetteurs WHERE cin=?",
            {
                replacements:[req.params.cni],
                type:QueryTypes.SELECT
            }
        ).then((data)=>{
            if(data.length==0){
                return res.send({success:false})
            }
            return res.send({success:true,data:data});
        }).catch(err=>{
            return res.send({success:false});
        })
    })


    app.get("/compte/:id",middleware,(req,res)=>{
        db.sequelize.query(
            "SELECT * FROM Comptes WHERE userId=?",
            {
                replacements:[req.params.id],
                type:QueryTypes.SELECT
            }
        ).then((data)=>{
            return res.send({success:true,data:data});
        }).catch(err=>{
            return res.send({success:false});
        })
    });


    app.get("/envoi/:id",middleware,(req,res)=>{
        return db.sequelize.query(
            "SELECT * FROM Envois WHERE id=?",
            {
                replacements:[req.params.id],
                type:QueryTypes.SELECT
            }
        ).then((data)=>{
            return res.send({success:true,data:data})
        }).catch((err)=>{
            return res.send({success:false})
        })
    });

    app.get("/all_envoi_user/:id",middleware,(req,res)=>{
        return db.sequelize.query(
            "SELECT * FROM Envois WHERE RecepteurId=? or emmeteurId=?",
            {
                replacements:[req.params.id,req.params.id],
                type:QueryTypes.SELECT
            }
        ).then((data)=>{
            return res.send({success:true,data:data})
        }).catch((err)=>{
            return res.send({success:false})
        })
    });


    app.get("/recent/:id",middleware,(req,res)=>{
        return db.sequelize.query(
            "SELECT * FROM Envois WHERE RecepteurId=? or emmeteurId=? limit 3",
            {
                replacements:[req.params.id,req.params.id],
                type:QueryTypes.SELECT
            }
        ).then((data)=>{
            return res.send({success:true,data:data})
        }).catch((err)=>{
            return res.send({success:false})
        })
    });


    app.get("/user/:id",middleware,(req,res)=>{
        return db.sequelize.query(
            "SELECT * FROM Emetteurs WHERE id=?",
            {
                replacements:[parseInt(req.params.id)],
                type:QueryTypes.SELECT
            }
        ).then((data)=>{
            return res.send({success:true,data:data});
        }).catch(err=>{
            return res.send({success:false})
        })
    });

       


   

}