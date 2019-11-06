let models = require('../models');
let db = models.sequelize.models;
const bcrypt = require('bcrypt');
const saltRounds = 10;
class Users{
    async createUser(req,res){
        try{
            //console.log(req.body);
            var hash = bcrypt.hashSync(req.body.password, saltRounds);
            let usersData = await db.users.create({
                "name": req.body.name,
                "email": req.body.email,
                "phoneNumber": req.body.phoneNumber,
                "password": hash,
            })
            return res.json({
                success:true,
                message:`User successfully created`
            })
        }catch(error){
            return res.json({
                success:false,
                message:`api error. something wrong`,
                error:error
            })
        }
    }
    async getUsers(req,res){
        try{
           // console.log(req.body);
            let tokens = await db.tokens.findOne({});
            //console.log(tokens.token)
            let sessi = req.session;
            console.log(sessi.cookie.name);
            if(tokens.token == sessi.cookie.name){
            let usersData = await db.users.findAll()
            if(usersData.length>0){
            return res.json({
                success:true,
                data:usersData,
                message:`Data found successfully`
            })
        }else{
            return res.json({

                success:true,
                data:usersData,
                message:`No data found`
            })
        }
        }else{
            return res.json({
                success:false,
                data:[],
                message:`invalid access token`
            }) 
        }
        }catch(error){
            return res.json({
                success:false,
                message:`api error. something wrong`,
                error:error
            })
        }
    }
    async getUsersById(req,res){
        try{
           // console.log(req.body);
            let tokens = await db.tokens.findOne({});
            //console.log(tokens.token)
            let sessi = req.session;
            console.log(sessi.cookie.name);
            if(tokens.token == sessi.cookie.name){
            let usersData = await db.users.findOne({id:req.params.userId})
            if(usersData.length>0){
            return res.json({
                success:true,
                data:usersData,
                message:`Data found successfully`
            })
        }else{
            return res.json({

                success:true,
                data:usersData,
                message:`User found`
            })
        }
        }else{
            return res.json({
                success:false,
                data:[],
                message:`invalid access token`
            }) 
        }
        }catch(error){
            return res.json({
                success:false,
                message:`api error. something wrong`,
                error:error
            })
        }
    }
    async updateUser(req,res){
        try{
            console.log(req.body);
            if(req.body.password!=""){
            var hash = bcrypt.hashSync(req.body.password, saltRounds);
            req.body.password = hash;
            }
            let usersData = await db.users.update(req.body,{
            where:{ id: req.params.userId}
            })
            return res.json({
                success:true,
                data:usersData,
                message:`User successfully updated`
            })
        }catch(error){
            return res.json({
                success:false,
                message:`api error. something wrong`,
                error:error
            })
        }
    }
    async deleteUser(req,res){
        try{
            await db.users.destroy({
            where:{ id: req.params.userId}
            })
            return res.json({
                success:true,
               // data:usersData,
                message:`User successfully deleted`
            })
        }catch(error){
            return res.json({
                success:false,
                message:`api error. something wrong`,
                error:error
            })
        }
    }
}
module.exports = Users;
