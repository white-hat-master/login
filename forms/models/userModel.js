const db = require('./connection');

function userModel() {
    this.viewUser = () => {
        return new Promise((resolve, reject) => {
            db.collection('register').find({ 'role': 'user' }).toArray((err, result) => {
                err ? reject(err) : resolve(result);
            })
        })
    }

    this.manageUserStatus = (details) => {
        return new Promise((resolve, reject) => {
            if (details.s == 'block') {
                db.collection('register').update({ 'regid': parseInt(details.regid) }, { $set: { 'status': 0 } }, (err, result) => {
                    err ? reject(err) : resolve(result);
                })
            }
            else if (details.s == 'unblock') {
                db.collection('register').update({ 'regid': parseInt(details.regid) }, { $set: { 'status': 1 } }, (err, result) => {
                    err ? reject(err) : resolve(result);
                })
            }
            else {
                db.collection('register').remove({ 'regid': parseInt(details.regid) }, (err, result) => {
                    err ? reject(err) : resolve(result);
                })
            }
        })
    }

}

module.exports = new userModel()