'use strict';
    var path = require('path');
    var config    = require( "../config/config.js"  );
    var mongoose = require('mongoose')

class MongoNode { 

    constructor(database) { 
        //console.log('Initializing..');
        this.database = ("undefined" !== typeof database)?database: config.db.database;
        //this.retrieveModel('UserModel', 'User');
    }    
    /*
    * getkeys of an object
    */
    getKeys(obj){
        var keys = [];
        for(var key in obj)   keys.push(key);
        return keys;
    }

    connectDB() { 
        return new Promise((resolve, reject) => {
            try {
               var db = mongoose.connect(this.database, { useNewUrlParser: true , useUnifiedTopology: true }); //- connect db in classic way
            }catch(err) { 
                throw err;
                //reject({success: false, message: 'Database connection ==> Failed!', error: err });
            }

            resolve({success: true, message: 'Database connection ==> Success!' , db : db } );
        });
    }

    createModel(name, params){ 
        return new Promise((resolve,reject) => { 
            var Schema = mongoose.Schema,
            ObjectId = Schema.ObjectId;
            var model = new Schema(params);

            return mongoose.model(name, model);
        });

        

    
    }

    retrieveModel(name, modelName){ 
        return new Promise((resolve, reject) => {
            try {
                var _model = mongoose.model(name, modelName); 
                resolve({success: true, message: 'Model resolved successfully!' , model : _model } );
            }catch(err) { 
                throw err;
                //reject({success: false, message: 'No Such Model available', error : err });
            }
        });
    }

}

module.exports = MongoNode;