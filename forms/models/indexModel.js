const db = require('./connection');
const myCrypto = require('../routes/myCrypto');


function indexModel() {

    this.register = (userDetails,f1_name) => {
        return new Promise((reslove, reject) => {
            db.collection('register').find().toArray((err, result) => {
                var regid
                if (result.length > 0) {
                    regid = result[0].regid
                    for (let i = 1; i < result.length; i++) {
                        if (regid < result[i].regid) {
                            regid = result[i].regid
                        }
                    }
                }
                else
                    regid = 0;
                userDetails.regid = regid + 1
                userDetails.role = 'user'
                userDetails.status = 0
                userDetails.f1_name = f1_name;
                userDetails.dt = Date()
                userDetails.password = myCrypto.myencrypt(userDetails.password);

                db.collection('register').insertOne(userDetails, (err, result1) => {
                    err ? reject(err) : reslove(result1)
                })

            })
        })
    }
    this.login = (userDetails) => {
        return new Promise((resolve, reject) => {
            pass = myCrypto.myencrypt(userDetails.password);
            db.collection('register').find({ 'email': userDetails.email, 'password': pass, 'status': 0 }).toArray((err, result) => {
                err ? reject(err) : resolve(result)
            })
        })
    }


}

module.exports = new indexModel()