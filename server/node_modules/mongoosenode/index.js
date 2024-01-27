'use strict';

/*!
 * Module dependencies.
 */

    var config    = require( "./config/config.js"  );
    var MongoNode = require('./src/mongonode')
/*
    var mn = new MongoNode('mongodb://username:password@127.0.0.1:27017/databasename')
    console.log(mn);

   var db = mn.connectDB().then(async(res) => { 
       try { 
           console.log(res);
        return res;  
       }catch(e) { 
           console.log(e);
       }
    });
   

    var params = {
        //id: ObjectId,
        name: {type : String, default: ''},
        pass: {type : String, default: ''},
        token: {type : String, default: ''},
        secret: {type : String, default: ''},
        updated: { type:Date, default : new Date },
        status: {type: Boolean, default : false },
        admin: {type : Boolean, default : false},
    };


    var model = mn.createModel('User', params ).then(async(res) => { 
        console.log(res);
    });
    
   
   var model = mn.retrieveModel('User','User').then(async(res) => { 
       try { 
           console.log(res);
        return res;  
       }catch(e) { 
           console.log(e);
       }
   })
*/
module.exports = MongoNode;