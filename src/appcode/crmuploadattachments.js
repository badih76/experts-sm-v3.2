import { firebase } from '../constants/firebase';
import 'firebase/storage';
import { resolve } from 'q';

Number.prototype.pad = function (size, c) {
    var s = String(this);
    while (s.length < (size || 2)) { s = c + s; }
    return s;
}

export const getAttachmentsList = async () => {
    
    var funcSuccess = "";
    var funcResult = "";
    var funcError = "";
    var funcWarning = "";
    var funcFailReason = "";

    var db = firebase.firestore();
    
    const settings = { timestampsInSnapshots: true };
    db.settings(settings);

    var storageDb = db.collection('StorageUploads').doc("Documents").collection("Files");

    var attachments = [];

    return storageDb.get()
    .then((snapshot) => {

        if (snapshot.docs.length > 0)
        {
            snapshot.forEach((docAttachment) => {
                attachments.push({...docAttachment.data()});

            });

            funcSuccess = 'Ok';
            funcResult = attachments;
            
        }
        else
        {
            funcSuccess = 'No';
            funcResult = [];
            funcFailReason = 'No Attachments were found. Returning empty list.';
        }

        var funcReturn = {
            Success: funcSuccess,
            Result: funcResult,
            FailReason: funcFailReason,
            Error: funcError,
            Warning: funcWarning
        };

        return funcReturn;
    })
    .catch((err) => {
        funcSuccess = 'No';
        funcResult = [];
        funcFailReason = 'Error';
        funcError = err.message;

        var funcReturn = {
            Success: funcSuccess,
            Result: funcResult,
            FailReason: funcFailReason,
            Error: funcError,
            Warning: funcWarning
        };

        return funcReturn;
    });
};

export const uploadAttachment = async (attachment, file) => {
    
    var funcSuccess = "";
    var funcResult = "";
    var funcError = "";
    var funcWarning = "";
    var funcFailReason = "";

    var db = firebase.firestore();
    // var storage = firebase.storage();
    
    const settings = { timestampsInSnapshots: true };
    db.settings(settings);

    let storageRef = firebase.storage().ref('attachments/' + file.name);

    // Upload file
    let task = storageRef.put(file);
    
    // update progress bar
    return new Promise((resolve, reject) => {
        task.on('state_changed',
            function progress(snapshot) {
                // const {bytesTransferred, totalBytes} = snapshot;

                // var percentage = bytesTransferred * 100 / totalBytes ; 
                // uploader.value = percentage;
                // console.log(percentage);
            },

            function error(err) {
                funcSuccess = 'No';
                funcResult = [];
                funcFailReason = 'Error';
                funcError = err.message;

                var funcReturn = {
                    Success: funcSuccess,
                    Result: funcResult,
                    FailReason: funcFailReason,
                    Error: funcError,
                    Warning: funcWarning
                };

                reject(funcReturn);
            },

            function complete() {
                let downloadURL = "";

                task.snapshot.ref.getDownloadURL().then(function(dURL) {
                    downloadURL = dURL;

                    attachment.downloadURL = downloadURL;
                    attachment.UploadDate = new Date().toString();

                    logUpload(attachment)
                    .then(result => {
                        console.log("LogUpload: ", result);
                        funcSuccess = 'Ok';
                        funcResult = result;

                        var funcReturn = {
                            Success: funcSuccess,
                            Result: attachment,
                            FailReason: funcFailReason,
                            Error: funcError,
                            Warning: funcWarning
                        };
                        
                        resolve(funcReturn);
                    });
                    
                    
                });
            }
        );
    })
    .then(result => {
        console.log("Resolved: ", result);
        return result;
    })
    .catch(error => {
        console.log("Error: ", error);
        return error;
    });
};

const logUpload = (attachment) => {
    const { TitleText, FileName, FileSize, downloadURL, UploadDate } = attachment;

    const db = firebase.firestore();
    const storageDb = db.collection("StorageUploads").doc("Documents").collection("Files");

    const storageDoc = {
        TitleText: TitleText,
        FileSize: FileSize,
        FileName: FileName,
        DownloadURL: downloadURL,
        UploadDate: UploadDate
    }

    return storageDb.doc(FileName).set(storageDoc)
        .then(result => {
            return attachment;
        })
        .catch(error => {
            console.log(error);
            return false;
        })
    
}

export const deleteAttachment = async (attachment) => {
    
    var funcSuccess = "";
    var funcResult = "";
    var funcError = "";
    var funcWarning = "";
    var funcFailReason = "";

    var db = firebase.firestore();
    // var storage = firebase.storage();
    
    const settings = { timestampsInSnapshots: true };
    db.settings(settings);

    let storageRef = firebase.storage().ref('attachments/' + attachment.FileName);

    storageRef.delete()
        .then(() => {
            unLogUpload(attachment)
                .then(result => {
                    funcSuccess = 'Ok';
                    funcResult = result;

                    var funcReturn = {
                        Success: funcSuccess,
                        Result: attachment,
                        FailReason: funcFailReason,
                        Error: funcError,
                        Warning: funcWarning
                    };
                    
                    return funcReturn;
                })
        })
        .catch(error => {
            funcSuccess = 'No';
            funcResult = [];
            funcFailReason = 'Error';
            funcError = error.message;

            var funcReturn = {
                Success: funcSuccess,
                Result: funcResult,
                FailReason: funcFailReason,
                Error: funcError,
                Warning: funcWarning
            };

            return funcReturn;
        })
            
};

const unLogUpload = (attachment) => {
    const { TitleText, FileName, FileSize, downloadURL, UploadDate } = attachment;

    const db = firebase.firestore();
    const storageDb = db.collection("StorageUploads").doc("Documents").collection("Files");

    return storageDb.doc(FileName).delete()
        .then(result => {
            return attachment;
        })
        .catch(error => {
            console.log(error);
            return false;
        })
    
}
