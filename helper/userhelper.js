const db = require('../config/connections');
const objectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');


module.exports={
    
    addUser:(Data)=>{
        return new Promise(async(resolve,reject)=>{
            Data.password = await bcrypt.hash(Data.password,10)
            db.get().collection('users').insertOne(Data).then((res)=>{
                resolve(res);
            })
        })
    },


    deleteUsers:(Id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('users').deleteOne({_id:objectId(Id)}).then(()=>{
                resolve()
            })
        })
    },

    getUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            let allUsers=await db.get().collection('users').find().toArray()
            resolve(allUsers)
        })
    },

    getUser:(Id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('users').findOne({_id:objectId(Id)}).then((user)=>{
                resolve(user)
            })
        })
    },

    editUsers:(userId,userDetails)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection('users').updateOne({_id:objectId(userId)},{
                $set:{
                    Firstname:userDetails.Firstname,
                    Lastname:userDetails.Lastname,
                    email:userDetails.email,
                }              
            }).then((response)=>{
                resolve(response)
            })
        })
    },

    deleteUsers: (Id)=>{
        return new Promise((resolve, reject) => {
            db.get().collection('users').deleteOne({_id:objectId(Id)}).then((user)=>{
                resolve();
            })
        })
    },


    doSearch:({search})=>{
        return new Promise(async(resolve,reject)=>{
            try{
                let user = await db.get().collection('users').find({Firstname:new RegExp(search)}).toArray();
                if(user){
                    resolve(user);
                }else{
                    reject();
                }
            }catch{
                reject(err);
            }
        })
    },


    doLogin: (Logindata) => {
        return new Promise(async( resolve,reject)=>{
            let loginstatus = false;
            let response = {};
            let user = await db.get().collection('users').findOne({email:Logindata.email});
            if(user){
                bcrypt.compare(Logindata.password,user.password).then((status)=>{

                    if(status) {
                        response.user = user;
                        response.status = true;
                        resolve(response);
                    }else{
                        console.log('login failed');
                        resolve({status : false});
                    }
                })
            }else{

                console.log('not exist');
                resolve({status : false});
            }
        })
    },
    
    checkUser: (UserLogin) => {
        return new Promise(async(resolve,reject)=>{
           let user =await db.get().collection('users').findOne({email:UserLogin.email})
           if(user){
            resolve({status:true})
           }
           else{
            resolve({status:false})
           }
        })
    }

}