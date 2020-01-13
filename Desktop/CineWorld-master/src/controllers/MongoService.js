//jshint esversion:6
((MongoService,  mongoose) => {
    const connectionString = process.env.MongoconnectionString
        ||
        "mongodb+srv://admin-munir:test123@cluster0-onjha.mongodb.net/CineWorldDB";



    const Connect = (cb) =>{
        mongoose.connect(connectionString,  {  
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, db) => {
            return cb(err, db, () => {
                db.close(); 
            });
        
        });
    };

    MongoService.Create = (colName, createObj, cb) =>{
        Connect((err, db, close) =>{
            db.collection(colName).insert(createObj, (err, results)=>{
                cb(err, results);
                return close();
            });
        });
    };

    MongoService.Read = (colName, readObj, cb) =>{
        Connect((err, db, close)=>{
            db.collection(colName).find(readObj).toArray((err, results)=>{
                cb(err, results);
                return close();

            });
        });
    };


    MongoService.Update = (colName, findObj, updateObj, cb)=>{
        Connect((err, db, close)=>{
            db.collection(colName).update(findObj, {$set: updateObj}, (err, results)=>{
                cb(err, results);
                return close();
            });
        });
    };

    MongoService.Delete = (colName, findObj, cb)=>{
        Connect((err, db, close)=>{
            db.collection(colName).remove(findObj, (err, results)=>{
                cb(err, results);
                return close();
            });
        });
    };

})
(
    module.exports,
    require('mongoose')
);
