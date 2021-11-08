import { firebase } from '../constants/firebase';

Number.prototype.pad = function (size, c) {
    var s = String(this);
    while (s.length < (size || 2)) { s = c + s; }
    return s;
}

export const getTicketsList = async () => {
    
    var funcSuccess = "";
    var funcResult = "";
    var funcError = "";
    var funcWarning = "";
    var funcFailReason = "";

    var db = firebase.firestore();
    
    const settings = { timestampsInSnapshots: true };
    db.settings(settings);

    var ticketsDb = db.collection('HelpDesk');

    var tickets = [];

    return ticketsDb.get()
    .then((snapshot) => {

        if (snapshot.docs.length > 0)
        {
            snapshot.forEach((docTicket) => {
                tickets.push({...docTicket.data(), TicketNum: docTicket.id});

            });

            funcSuccess = 'Ok';
            funcResult = tickets;
            
        }
        else
        {
            funcSuccess = 'No';
            funcResult = [];
            funcFailReason = 'No Tickets were found. Returning empty list.';
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

export const getComplCat = async () => {
    
    var funcSuccess = "";
    var funcResult = "";
    var funcError = "";
    var funcWarning = "";
    var funcFailReason = "";

    var db = firebase.firestore();
    
    const settings = { timestampsInSnapshots: true };
    db.settings(settings);

    var ticketsDb = db.collection('Dependencies').doc('HelpDesk').collection('Categories');

    var compleCatList = [];

    return ticketsDb.get()
    .then((snapshot) => {

        if (snapshot.docs.length > 0)
        {
            snapshot.forEach((docTicket) => {
                compleCatList.push(docTicket.data().categName);

            });

            funcSuccess = 'Ok';
            funcResult = compleCatList;
            
        }
        else
        {
            funcSuccess = 'No';
            funcResult = [];
            funcFailReason = 'No Ticket Categories were found. Returning empty list.';
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

export const getTicketReplies = async (ticketNum) => {
    
    var funcSuccess = "";
    var funcResult = "";
    var funcError = "";
    var funcWarning = "";
    var funcFailReason = "";

    var db = firebase.firestore();
    
    const settings = { timestampsInSnapshots: true };
    db.settings(settings);

    var ticketsDb = db.collection('HelpDesk');

    var replies = [];

    return ticketsDb.doc(ticketNum).collection('Replies').get()
    .then((snapshot) => {
        
        if (snapshot.docs.length > 0)
        {
            snapshot.forEach((docReply) => {
                let reply = {
                    Details: docReply.data().Details,
                    FileAttachment: docReply.data().FileAttachment,
                    RepliedBy: docReply.data().RepliedBy,
                    replyId: docReply.id
                }

                replies.push(reply);

            });

            funcSuccess = 'Ok';
            funcResult = replies;
            
        }
        else
        {
            funcSuccess = 'No';
            funcResult = [];
            funcFailReason = 'No Replies were found. Returning empty list.';
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

export const addTicketSupport = (ticket) => {
    // This function creates a new Ticket document.
    //
    // A document exists if it has fields. Collections within the document
    // do not mean it exist if it has no fields.
    //

    var funcSuccess = "";
    var funcResult = "";
    var funcError = "";
    var funcWarning = "";
    var funcFailReason = "";

    var db = firebase.firestore();

    const settings = { timestampsInSnapshots: true };
    db.settings(settings);
    
    var newticket = {...ticket};

    var ticketcounter = 0;

    // get the tickets counter from the Dependencies/HelpDesk document...
    return db.collection('Dependencies').doc('HelpDesk').get()
        .then(snapshot => {
            ticketcounter = snapshot.data().TicketCounter;

            return db.collection('HelpDesk').doc('AFMS' + ticketcounter.pad(6, '0')).set(newticket);
        })
        .then((setResult) => {

            return db.collection('Dependencies').doc('HelpDesk').set({ TicketCounter: ticketcounter + 1 });

        })
        .then(retval => {
            var newTNumber = {
                TicketNumber: 'AFMS' + ticketcounter.pad(6, '0')
            };

            var funcReturn = {
                Success: 'Ok',
                Result: newTNumber.TicketNumber,
                FailReason: '',
                Error: '',
                Warning: ''
            };

          return funcReturn;

        })
        .catch((err) => {
            funcSuccess = 'No';
            funcResult = {};
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

export const postTicketReplySupport = (ticketNum, reply) => {
    // This function posts a new Ticket Reply document.
    //
    // A document exists if it has fields. Collections within the document
    // do not mean it exist if it has no fields.
    //

    var tn = ticketNum;
    var rb = reply.RepliedBy;
    var rdt = reply.tsReplyDT;
    var rd = reply.Details;
    // var san = req.body.attachedfiles;


    var funcSuccess = "";
    var funcResult = "";
    var funcError = "";
    var funcWarning = "";
    var funcFailReason = "";

    var db = firebase.firestore();

    const settings = { timestampsInSnapshots: true };
    db.settings(settings);
    
    var newreply = {
        RepliedBy: rb,
        Details: rd,
        FileAttachment: "X",
        tsReplyDT: new Date(rdt)

    }

    // get the tickets counter from the Dependencies/HelpDesk document...
    return db.collection('HelpDesk').doc(tn).collection('Replies').doc(reply.replyId).set(newreply)
      .then(result => {

          var funcReturn = {
              Success: 'Ok',
              Result: {},
              FailReason: '',
              Error: '',
              Warning: ''
          };

          return funcReturn;

      })
      .catch((err) => {
          funcSuccess = 'No';
          funcResult = {};
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

export const getUserDisplayName = async (UID) => {
    
    var funcSuccess = "";
    var funcResult = "";
    var funcError = "";
    var funcWarning = "";
    var funcFailReason = "";

    var db = firebase.firestore();
    
    const settings = { timestampsInSnapshots: true };
    db.settings(settings);

    var usersDb = db.collection('Users').doc('docUsers').collection('colUsers');

    var users = [];

    return usersDb.where('UID', '==', UID).get()
    .then((snapshot) => {

        if (snapshot.docs.length > 0)
        {
            snapshot.forEach((docUser) => {
                users.push(docUser.data().displayName);

            });

            funcSuccess = 'Ok';
            funcResult = users;
            
        }
        else
        {
            funcSuccess = 'No';
            funcResult = [];
            funcFailReason = 'No matching UIDs were found. Returning empty list.';
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

