const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: true}); // still experiencing cors issues even with this + npm install cors

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// Accept comment and return the same comment to the user
exports.postcomment = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const currentTime = admin.firestore.Timestamp.now();
        request.body.timestamp = currentTime;
        return admin.firestore().collection('comments').add({description:request.body.data.description,imagename:request.body.data.imagename,image:request.body.data.image,comment:request.body.data.comment,contact:request.body.data.contact, price:request.body.data.price, dblbeds:request.body.data.dblbeds,sglbeds:request.body.data.sglbeds,twnbeds:request.body.data.twnbeds, contact:request.body.data.contact, timestamp: request.body.timestamp, uid: request.body.data.uid }).then(() => {
            response.send({"data": "Saved in Database"});
        });
    });
});

exports.getcomments = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        // 1. Connect to our Firestore database
        let myData = []
        admin.firestore().collection('comments').orderBy("timestamp", "desc").get().then((snapshot) => {

            if (snapshot.empty) {
                console.log('No matching documents.');
                response.send({data: 'No data in database'});
                return;
            }

            snapshot.forEach(doc => {
                myData.push(Object.assign(doc.data(), {id:doc.id}));
            });

            // 2. Send data back to client
            response.send({data : myData});
        });
    });
});

exports.deletecomment = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log(request.query);
        return admin.firestore().collection('comments').doc(request.query.id).delete().then(() => {
            response.send({"data": "Deleted document from database"});
        });
    });
});

exports.updatecomment = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        return admin.firestore().collection('comments').doc(request.query.id).update(request.body.data).then(() => {
            response.send({"data": "Updated document in database"});
        });
    });
});

// This function is not doing what its supposed to
exports.secure = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;
    if(!uid) {
        throw new functions.https.HttpsError('no-userid','The requested user was not found');
    }
    else {
        return admin.firestore().collection('comments').where("uid", "==", uid).get().then((snapshot) => {
            let myData = [];

            if(snapshot.empty) {
                console.log('No matching documents.');
                return({data:'No data in database'});
            }

            snapshot.forEach(doc => {
                myData.push(Object.assign(doc.data(), {id:doc.id}));
            });

            return({data : myData});
        });
    }
});