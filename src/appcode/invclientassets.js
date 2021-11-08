import { firebase } from "../constants/firebase";
import axios from "axios";
import environment from "../resources/environment.json";

Number.prototype.pad = function(size, c) {
  var s = String(this);
  while (s.length < (size || 2)) {
    s = c + s;
  }
  return s;
};

export const getClientDocument = async (clID) => {
  // This function gets the existing document of the given Client Name.
  //
  // A document exists if it has fields. Collections within the document
  // do not mean it exist if it has no fields.
  //

  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  let res = axios
    .get(environment.apiURL + "/client/" + clID)
    .then((result) => {
      let { data, status } = result;

      if (status === 200) {
        // fetch was successful, get the data...
        let client = { ...data.funcResult[0] };

        funcSuccess = "Ok";
        funcResult = client;
      } else {
        funcSuccess = "No";
        funcResult = "{}";
        funcFailReason = "No Clients were found. Returning empty list.";
      }

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    })
    .catch((err) => {
      console.log(err);
      funcSuccess = "No";
      funcResult = "{}";
      funcFailReason = "Error";
      funcError = err.message;

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      // res.send(JSON.stringify(funcReturn));
      return funcReturn;
    });

  return res;
};

export const addClient = async (client) => {
  // This function creates a new Client Profile document,
  // or reset the existing one.
  //
  // A document exists if it has fields. Collections within the document
  // do not mean it exist if it has no fields.
  //

  var cn = client.clName;
  var ce = client.clEmail;
  var cpnam = client.clContactName;
  var cpnum = client.clContactNumber;
  var cadd = client.clAddress;

  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  var newclient = {
    clName: cn,
    clEmail: ce,
    clContactName: cpnam,
    clContactNumber: cpnum,
    clAddress: cadd,
    SitesCount: 0,
  };

  // check if a document exists for the mentioned client name...
  return axios
    .post(environment.apiURL + "/client", newclient)
    .then((result) => {
      // On successful writing of client document to database...
      console.log("Result: ", result);
      if (result.data.funcSuccess === "Ok") {
        funcSuccess = "Ok";
        funcResult = "{}";

        var funcReturn = {
          Success: funcSuccess,
          Result: funcResult,
          FailReason: funcFailReason,
          Error: funcError,
          Warning: funcWarning,
        };
      } else {
        funcSuccess = "No";
        funcResult = "{}";

        var funcReturn = {
          Success: funcSuccess,
          Result: funcResult,
          FailReason: result.data.funcFailReason,
          Error: result.data.funcError,
          Warning: result.data.funcWarning,
        };
      }

      return funcReturn;
    })
    .catch((err) => {
      funcSuccess = "No";
      funcResult = "{}";
      funcFailReason = "Error";
      funcError = err.message;

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    });
};

export const updateClientByName = (client) => {
  // This function updates an existsing Client Profile document.
  //
  // A document exists if it has fields. Collections within the document
  // do not mean it exist if it has no fields.
  //

  var cn = client.clName;
  var ce = client.clEmail;
  var cpnam = client.clContactName;
  var cpnum = client.clContactNumber;
  var cadd = client.clAddress;

  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  console.log(client);

  let res = axios
    .put(environment.apiURL + "/client", { ...client })
    .then((result) => {
      let { data, status } = result;
      console.log("Result: ", data);

      if (status === 200) {
        // fetch was successful, get the data...
        // let client = { ...data.funcResult[0] };

        funcSuccess = "Ok";
        funcResult = client;
      } else {
        funcSuccess = "No";
        funcResult = "{}";
        funcFailReason = "No Clients were found. Returning empty list.";
      }

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    })
    .catch((err) => {
      console.log(err);
      funcSuccess = "No";
      funcResult = "{}";
      funcFailReason = "Error";
      funcError = err.message;

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      // res.send(JSON.stringify(funcReturn));
      return funcReturn;
    });

  return res;

  // var db = firebase.firestore();
  // const settings = { timestampsInSnapshots: true };
  // db.settings(settings);
  // var clientsDb = db
  //   .collection("Inventory")
  //   .doc("Assets")
  //   .collection("Clients");

  // var updateclient = {
  //   clName: cn,
  //   clEmail: ce,
  //   clContactName: cpnam,
  //   clContactNumber: cpnum,
  //   clAddress: cadd,
  // };

  // // check if a document exists for the mentioned client name...
  // return clientsDb
  //   .doc(cn)
  //   .get()
  //   .then((snapshot) => {
  //     if (snapshot.exists) {
  //       // The client document exists. Update client profile document...
  //       return clientsDb.doc(cn).set(updateclient);
  //     } else {
  //       // No document exists for this client... Return result...
  //       funcSuccess = "No";
  //       funcResult = "{}";
  //       funcFailReason = "Client Profile do not exist.";

  //       var funcReturn = {
  //         Success: funcSuccess,
  //         Result: funcResult,
  //         FailReason: funcFailReason,
  //         Error: funcError,
  //         Warning: funcWarning,
  //       };

  //       return funcReturn;
  //     }
  //   })
  //   .then((result) => {
  //     // On successful writing of client document to database...
  //     funcSuccess = "Ok";
  //     funcResult = "{}";

  //     var funcReturn = {
  //       Success: funcSuccess,
  //       Result: funcResult,
  //       FailReason: funcFailReason,
  //       Error: funcError,
  //       Warning: funcWarning,
  //     };

  //     return funcReturn;
  //   })
  //   .catch((err) => {
  //     funcSuccess = "No";
  //     funcResult = "{}";
  //     funcFailReason = "Error";
  //     funcError = err.message;

  //     var funcReturn = {
  //       Success: funcSuccess,
  //       Result: funcResult,
  //       FailReason: funcFailReason,
  //       Error: funcError,
  //       Warning: funcWarning,
  //     };

  //     return funcReturn;
  //   });
};

// --------------------------------------------------------------

export const getAssetDoc = (aid) => {
  // This function gets an existing asset documen under Contract
  // under project of a Client.
  //
  // A document exists if it has fields. Collections within the document
  // do not mean it exist if it has no fields.
  //

  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  // check if a document exists for the mentioned client name...
  return axios
    .get(environment.apiURL + "/asset/" + aid)
    .then((result) => {
      let assets = [];
      const { data, status } = result;

      if (status === 200) {
        data.funcResult.forEach((docAsset) => {
          assets.push(docAsset);
        });

        funcSuccess = "Ok";
        funcResult = assets;
      } else {
        // The client document exists...
        // Do not overwrite... Return the results...
        funcSuccess = "No";
        funcResult = assets;
        funcFailReason = "No assets found. Returning empty list.";
      }

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    })
    .catch((err) => {
      funcSuccess = "No";
      funcResult = {};
      funcFailReason = "Error";
      funcError = err.message;

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    });
};

export const addAsset = (contID, asset) => {
  // This function creates a new Level 1Asset Record under Contract under
  // project of a Client.
  //
  // A document exists if it has fields. Collections within the document
  // do not mean it exist if it has no fields.
  //
  // The parameter asset is an object containing the asset's details...
  //

  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  var newasset = {
    contID: contID,
    asset: {...asset}
  };

  return axios
    .post(environment.apiURL + "/assets", newasset)
    .then((result) => {
      // On successful writing of client document to database...
      console.log("Result: ", result);
      if (result.data.funcSuccess === "Ok") {
        funcSuccess = "Ok";
        funcResult = "{}";

        var funcReturn = {
          Success: funcSuccess,
          Result: funcResult,
          FailReason: funcFailReason,
          Error: funcError,
          Warning: funcWarning,
        };
      } else {
        funcSuccess = "No";
        funcResult = "{}";

        var funcReturn = {
          Success: funcSuccess,
          Result: funcResult,
          FailReason: result.data.funcFailReason,
          Error: result.data.funcError,
          Warning: result.data.funcWarning,
        };
      }

      return funcReturn;
    })
    .catch((err) => {
      funcSuccess = "No";
      funcResult = "{}";
      funcFailReason = "Error";
      funcError = err.message;

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    });

};

export const updateAsset = (contID, assetID, asset) => {
  // This function updates an existing Level 1Asset Record under Contract
  // under project of a Client.
  //
  // A document exists if it has fields. Collections within the document
  // do not mean it exist if it has no fields.
  //
  // Parameter asset is an object containing the asset's details...
  //


  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  var updateasset = {
    contID: contID,
    assetID: assetID,
    asset: {...asset}
  };

  // check if a document exists for the mentioned client name...
  return axios
    .put(environment.apiURL + "/assets", updateasset)
    .then((result) => {
      // On successful writing to database...
      console.log("Result: ", result);
      if (result.data.funcSuccess === "Ok") {
        funcSuccess = "Ok";
        funcResult = "{}";

        var funcReturn = {
          Success: funcSuccess,
          Result: funcResult,
          FailReason: funcFailReason,
          Error: funcError,
          Warning: funcWarning,
        };
      } else {
        funcSuccess = "No";
        funcResult = "{}";

        var funcReturn = {
          Success: funcSuccess,
          Result: funcResult,
          FailReason: result.data.funcFailReason,
          Error: result.data.funcError,
          Warning: result.data.funcWarning,
        };
      }

      return funcReturn;
    })
    .catch((err) => {
      funcSuccess = "No";
      funcResult = "{}";
      funcFailReason = "Error";
      funcError = err.message;

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    });

};

export const getAssetsList = (contID) => {
  // This function gets an existing asset documen under Contract
  // under project of a Client.
  //
  // A document exists if it has fields. Collections within the document
  // do not mean it exist if it has no fields.
  //

  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  // check if a document exists for the mentioned client name...
  return axios
    .get(environment.apiURL + "/assets/contract/" + contID)
    .then((result) => {
      let assets = [];
      const { data, status } = result;
      // console.log(environment.apiURL + "/contract/assets/" + contID);

      if (status === 200) {
        data.funcResult.forEach((docAsset) => {
          assets.push(docAsset);
        });

        funcSuccess = "Ok";
        funcResult = assets;
      } else {
        // The client document exists...
        // Do not overwrite... Return the results...
        funcSuccess = "No";
        funcResult = assets;
        funcFailReason = "No assets found. Returning empty list.";
      }

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    })
    .catch((err) => {
      funcSuccess = "No";
      funcResult = {};
      funcFailReason = "Error";
      funcError = err.message;

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    });
};

// --------------------------------------------------------------

export const getContractByID = (contID) => {
  // This function gets an existsing Contract of Project by the specified
  // Project name and Contract Name.
  //
  // A document exists if it has fields. Collections within the document
  // do not mean it exist if it has no fields.
  //

  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  // check if a document exists for the mentioned Project/Contract...
  return axios
    .get(environment.apiURL + "/contract/" + contID)
    .then((result) => {
      const { data, status } = result;

      console.log("Contract: ", data.funcResult);
      if (status === 200) {
        // The document exists. Return the document...
        funcSuccess = "Ok";
        funcResult = data;

        let contract = {
          contName: data.funcResult.contName,
          contCode: data.funcResult.contID,
          Description: data.funcResult.contDescription,
          contactEmails: data.funcResult.contactEmail,
          contactPerson: data.funcResult.contactPerson,
          effectDate: data.funcResult.effectDate,
          expiryDate: data.funcResult.expiryDate
        }
        
        var funcReturn = {
          Success: funcSuccess,
          Result: contract,
          FailReason: funcFailReason,
          Error: funcError,
          Warning: funcWarning,
        };

        return funcReturn;
      } else {
        // No document exists for this project... Return result...
        funcSuccess = "No";
        funcResult = {};
        funcFailReason = "Contract do not exist.";

        var funcReturn = {
          Success: funcSuccess,
          Result: funcResult,
          FailReason: funcFailReason,
          Error: funcError,
          Warning: funcWarning,
        };

        return funcReturn;
      }
    })
    .catch((err) => {
      funcSuccess = "No";
      funcResult = {};
      funcFailReason = "Error";
      funcError = err.message;

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    });
};

// --------------------------------------------------------------

export const getMainLogList = (aid) => {
  // This function retrieves all transactions under the Statement of accounts
  // of a Client's Project's Contract (hence, CPC), starting with the open
  // balance transaction created at the time of creating the contract.
  //

  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  return axios
    .get(environment.apiURL + "/asset/mainlog/" + aid)
    .then((result) => {
      const { data, status } = result;

      if (status === 200) {
        // The document exists. Return the document...
        funcSuccess = "Ok";
        funcResult = data;

        var funcReturn = {
          Success: funcSuccess,
          Result: funcResult,
          FailReason: funcFailReason,
          Error: funcError,
          Warning: funcWarning,
        };

        return funcReturn;
      } else {
        // Do not overwrite... Return the results...
        funcSuccess = "No";
        funcResult = [];
        funcFailReason = "Could not find logs for given asset.";
      }

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    })
    .catch((err) => {
      funcSuccess = "No";
      funcResult = {};
      funcFailReason = "Error";
      funcError = err.message;

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    });
};

export const addMainLog = (cln, pn, ctn, atitle, mainLog) => {
  // This function creates a new Maintenance Log Entry,
  // based on the Client/Project/Contract/Asset combination.
  //
  // This function does no validation of the data passed.
  //

  var logdt = mainLog.logDate;
  var logdetails = mainLog.logDetails;
  var logId = "";
  var pb = mainLog.logPerformedBy;

  var logDocName = cln + "_" + pn + "_" + ctn + "_" + atitle;

  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  var db = firebase.firestore();
  var mainlogDB = db.collection("Maintenance").doc("Logs");

  /*  Function Algorethm...

  if(contract exits in SOA)
  {
    get transactions
    get ID of first transaction => get the part1 of IT as ContractIndex
    get transactions count to generate transaction number:
        ContractIndex + '.' + transaction Number

    create transaction object and add it to contract SOA collection
  }
  else {
    we need to create new Contract SOA Collection
    get SOA => get SOA ContractCounter => create ContractIndex number
    create transaction object and add it to new contract SOA collection
  }
  */

  // Create transaction object...
  var newMainLog = {};

  return mainlogDB
    .collection(logDocName)
    .get()
    .then((snapshot) => {
      if (snapshot.docs.length > 0) {
        // there is an Log collection for this contract...
        // get the first document's ID...
        logId = snapshot.docs[0].id;

        // get the count of transactions in collection...
        var logCount = snapshot.docs.length + 1;
        // generate new transaction number...
        var newLogNumber = logId.split(".")[0] + ".MLOG" + logCount.pad(5, "0");

        newMainLog = {
          logId: newLogNumber,
          logDate: logdt,
          logDetails: logdetails,
          logPerformedBy: pb,
        };

        // add the transaction to the collection...
        return mainlogDB
          .collection(logDocName)
          .doc(newLogNumber)
          .set(newMainLog)
          .then((result) => {
            funcSuccess = "Ok";
            funcResult = newMainLog;
            funcFailReason = "";

            var funcReturn = {
              Success: funcSuccess,
              Result: funcResult,
              FailReason: funcFailReason,
              Error: funcError,
              Warning: funcWarning,
            };

            return funcReturn;
          })
          .catch((err) => {
            funcSuccess = "No";
            funcResult = {};
            funcFailReason = "Error";
            funcError = err.message;

            console.log("Process: ", err);
            var funcReturn = {
              Success: funcSuccess,
              Result: funcResult,
              FailReason: funcFailReason,
              Error: funcError,
              Warning: funcWarning,
            };

            return funcReturn;
          });
      } else {
        // There is no collection for this Log...
        // get the Assets Log parameters to generate new Log Index

        var contCounter = 0;

        return mainlogDB
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              // get the ContractCounter index...
              contCounter = snapshot.data().LogCounter;

              // Generate new transaction number...
              var newLogNum =
                "A" + (contCounter + 1).pad(5, "0") + ".MLOG00001";

              // create the transaction object...
              // Create transaction object...
              newMainLog = {
                logId: newLogNum,
                logDate: logdt,
                logDetails: logdetails,
                logPerformedBy: pb,
              };
              // add the transaction to the collection...
              return db
                .collection("Maintenance")
                .doc("Logs")
                .collection(logDocName)
                .doc(newLogNum)
                .set(newMainLog);
            } else {
              funcSuccess = "No";
              funcResult = {};
              funcFailReason =
                "Maintenance Log Parameters are not found. Action Aborted.";
              funcError = "";

              var funcReturn = {
                Success: funcSuccess,
                Result: funcResult,
                FailReason: funcFailReason,
                Error: funcError,
                Warning: funcWarning,
              };

              return funcReturn;
            }
          })
          .then((result) => {
            // adding transaction successfully...
            // increment the ContractCounter...

            return mainlogDB.update({ LogCounter: contCounter + 1 });
          })
          .then((result) => {
            funcSuccess = "Ok";
            funcResult = newMainLog;
            funcFailReason = "";

            var funcReturn = {
              Success: funcSuccess,
              Result: funcResult,
              FailReason: funcFailReason,
              Error: funcError,
              Warning: funcWarning,
            };

            return funcReturn;
          })
          .catch((err) => {
            funcSuccess = "No";
            funcResult = {};
            funcFailReason = "Error";
            funcError = err.message;

            console.log("Process: ", err);
            var funcReturn = {
              Success: funcSuccess,
              Result: funcResult,
              FailReason: funcFailReason,
              Error: funcError,
              Warning: funcWarning,
            };

            return funcReturn;
          });
      }
    })
    .catch((err) => {
      funcSuccess = "No";
      funcResult = {};
      funcFailReason = "Error";
      funcError = err.message;

      console.log("Process: ", err);
      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    });
};

export const updateMainLog = (cln, pn, ctn, atitle, mainLog) => {
  // This function updates an existing Transaction Entry in the Statement of
  // Accounts Database, based on the Client/Project/Contract combination.
  //
  // This function does no validation of the data passed.
  //

  var logdt = mainLog.logDate;
  var logdetails = mainLog.logDetails;
  var logid = mainLog.logId;
  var pb = mainLog.logPerformedBy;

  var logDocName = cln + "_" + pn + "_" + ctn + "_" + atitle;

  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  var db = firebase.firestore();
  var mainlogDB = db.collection("Maintenance").doc("Logs");

  /*  Function Algorethm...

  if(contract exits in SOA)
  {
    get transactions by transid

    create transaction object and update it in contract SOA collection
  }
  else {
    return an error...
  }
  */

  return mainlogDB
    .collection(logDocName)
    .doc(logid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        // transaction found, create the update transaction object...
        var updateMainLog = {
          logId: logid,
          logDate: logdt,
          logDetails: logdetails,
          logPerformedBy: pb,
        };

        // add the transaction to the collection...
        return mainlogDB
          .collection(logDocName)
          .doc(logid)
          .set(updateMainLog)
          .then((result) => {
            funcSuccess = "Ok";
            funcResult = "{}";
            funcFailReason = "";

            var funcReturn = {
              Success: funcSuccess,
              Result: funcResult,
              FailReason: funcFailReason,
              Error: funcError,
              Warning: funcWarning,
            };

            return funcReturn;
          })
          .catch((err) => {
            funcSuccess = "No";
            funcResult = {};
            funcFailReason = "Error";
            funcError = err.message;

            console.log("Process: ", err);
            var funcReturn = {
              Success: funcSuccess,
              Result: funcResult,
              FailReason: funcFailReason,
              Error: funcError,
              Warning: funcWarning,
            };

            return funcReturn;
          });
      } else {
        // Transaction not found, return an error...
        funcSuccess = "No";
        funcResult = {};
        funcFailReason = "Maintenance Log not found. Update aborted.";
        funcError = "";

        var funcReturn = {
          Success: funcSuccess,
          Result: funcResult,
          FailReason: funcFailReason,
          Error: funcError,
          Warning: funcWarning,
        };

        return funcReturn;
      }
    })
    .catch((err) => {
      funcSuccess = "No";
      funcResult = {};
      funcFailReason = "Error";
      funcError = err.message;

      console.log("Process: ", err);
      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    });
};

export const getMainLogDoc = (
  cltName,
  prjName,
  contName,
  atitle,
  mainLogId
) => {
  // This function retrieves the Maintenance Log based on the parameters passed
  // and the MainLog ID provided.
  //

  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  //  create the Log document name
  // (Client's Name + '_' + Project's Name + '_' + Contract's Name)
  var logDocName = cltName + "_" + prjName + "_" + contName + "_" + atitle;

  var db = firebase.firestore();
  var mainlogDB = db
    .collection("Maintenance")
    .doc("Logs")
    .collection(logDocName)
    .doc(mainLogId);

  return mainlogDB
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        let result = snapshot.data();

        funcSuccess = "Ok";
        funcResult = result;
      } else {
        funcSuccess = "No";
        funcResult = {};
        funcFailReason = "Could not find the log requested.";
      }

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    })
    .catch((err) => {
      funcSuccess = "No";
      funcResult = {};
      funcFailReason = "Error";
      funcError = err.message;

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    });
};

// --------------------------------------------------------------

export const getMeterDoc = (prjName, contName, meterNumber) => {
  // This function gets an existing meter documen under Contract
  // under project of a Client.
  //
  // A document exists if it has fields. Collections within the document
  // do not mean it exist if it has no fields.
  //

  var pn = prjName;
  var cn = contName;
  var mtrn = meterNumber;

  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  var db = firebase.firestore();
  var metersDb = db
    .collection("Projects")
    .doc(pn)
    .collection("Contracts")
    .doc(cn)
    .collection("Meters");

  // check if a document exists for the mentioned client name...
  return metersDb
    .doc(mtrn)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        // On successful writing of asset document to database...
        funcSuccess = "Ok";
        funcResult = snapshot.data();

        var funcReturn = {
          Success: funcSuccess,
          Result: funcResult,
          FailReason: funcFailReason,
          Error: funcError,
          Warning: funcWarning,
        };

        return funcReturn;
      } else {
        // The client document exists...
        // Do not overwrite... Return the results...
        funcSuccess = "No";
        funcResult = {};
        funcFailReason = "Meter does not exist.";

        var funcReturn = {
          Success: funcSuccess,
          Result: funcResult,
          FailReason: funcFailReason,
          Error: funcError,
          Warning: funcWarning,
        };

        return funcReturn;
      }
    })
    .catch((err) => {
      funcSuccess = "No";
      funcResult = {};
      funcFailReason = "Error";
      funcError = err.message;

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    });
};

export const addMeter = (prjName, contName, meter) => {
  // This function creates a new Meter Record under Contract under
  // project of a Client.
  //
  // A document exists if it has fields. Collections within the document
  // do not mean it exist if it has no fields.
  //
  // The parameter meter is an object containing the meter's details...
  //

  var pn = prjName;
  var cn = contName;
  var mtrn = meter.Number;
  var remarks = meter.Remarks;
  var location = meter.Location;
  var mtype = meter.Type;

  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  var db = firebase.firestore();
  var metersDb = db
    .collection("Projects")
    .doc(pn)
    .collection("Contracts")
    .doc(cn)
    .collection("Meters");

  var newmeter = {
    Number: mtrn,
    Location: location,
    Remarks: remarks,
    Type: mtype,
  };

  // check if a document exists for the mentioned client name...
  return metersDb
    .doc(mtrn)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        // The client document exists...
        // Do not overwrite... Return the results...
        funcSuccess = "No";
        funcResult = {};
        funcFailReason = "Meter already exists. No Overwrite.";

        var funcReturn = {
          Success: funcSuccess,
          Result: funcResult,
          FailReason: funcFailReason,
          Error: funcError,
          Warning: funcWarning,
        };

        return funcReturn;
      } else {
        // No document exists for this client... Create a new document...
        return metersDb.doc(mtrn).set(newmeter);
      }
    })
    .then((result) => {
      // On successful writing of client document to database...
      if (result) {
        if (!result.Success) return;

        if (result.Success === "No") {
          return result;
        }
      }

      funcSuccess = "Ok";
      funcResult = {};

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    })
    .catch((err) => {
      funcSuccess = "No";
      funcResult = {};
      funcFailReason = "Error";
      funcError = err.message;

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    });
};

export const updateMeter = (prjName, contName, meter) => {
  // This function updates an existing Meter Record under Contract
  // under project of a Client.
  //
  // A document exists if it has fields. Collections within the document
  // do not mean it exist if it has no fields.
  //
  // Parameter meter is an object containing the meter's details...
  //

  var pn = prjName;
  var cn = contName;
  var mtrn = meter.Number;
  var location = meter.Location;
  var remarks = meter.Remarks;

  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  var db = firebase.firestore();
  var metersDb = db
    .collection("Projects")
    .doc(pn)
    .collection("Contracts")
    .doc(cn)
    .collection("Meters");

  var updatemeter = {
    Number: mtrn,
    Location: location,
    Remarks: remarks,
  };

  // check if a document exists for the mentioned client name...
  return metersDb
    .doc(mtrn)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        return metersDb.doc(mtrn).update(updatemeter);
      } else {
        // The client document exists...
        // Do not overwrite... Return the results...
        funcSuccess = "No";
        funcResult = {};
        funcFailReason = "Meter does not exist.Update Aborted.";

        var funcReturn = {
          Success: funcSuccess,
          Result: funcResult,
          FailReason: funcFailReason,
          Error: funcError,
          Warning: funcWarning,
        };

        return funcReturn;
      }
    })
    .then((result) => {
      // On successful writing of asset document to database...
      funcSuccess = "Ok";
      funcResult = {};

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    })
    .catch((err) => {
      funcSuccess = "No";
      funcResult = "{}";
      funcFailReason = "Error";
      funcError = err.message;

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    });
};

export const getMetersList = (prjName, contName) => {
  // This function gets list of existing meters under Contract
  // under project of a Client.
  //
  // A document exists if it has fields. Collections within the document
  // do not mean it exist if it has no fields.
  //

  var pn = prjName;
  var cn = contName;

  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  var db = firebase.firestore();
  var metersDb = db
    .collection("Projects")
    .doc(pn)
    .collection("Contracts")
    .doc(cn)
    .collection("Meters");

  // check if a document exists for the mentioned client name...
  return metersDb
    .get()
    .then((snapshot) => {
      let meters = [];

      if (snapshot.docs.length > 0) {
        snapshot.forEach((docMeter) => {
          meters.push(docMeter.data());
        });

        funcSuccess = "Ok";
        funcResult = meters;
      } else {
        // The client document exists...
        // Do not overwrite... Return the results...
        funcSuccess = "No";
        funcResult = meters;
        funcFailReason = "No meters found. Returning empty list.";
      }

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    })
    .catch((err) => {
      funcSuccess = "No";
      funcResult = {};
      funcFailReason = "Error";
      funcError = err.message;

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    });
};

// --------------------------------------------------------------

export const getMeterReadingDoc = (
  cltName,
  prjName,
  contName,
  meterNumber,
  mrDate
) => {
  // This function gets an existing meter documen under Contract
  // under project of a Client.
  //
  // A document exists if it has fields. Collections within the document
  // do not mean it exist if it has no fields.
  //

  var pn = prjName;
  var cn = contName;
  var mtrn = meterNumber;

  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  var db = firebase.firestore();
  var metersDb = db
    .collection("Projects")
    .doc(pn)
    .collection("Contracts")
    .doc(cn)
    .collection("Meters")
    .doc(mtrn)
    .collection("Readings")
    .doc(mrDate);

  // check if a document exists for the mentioned meter...
  return metersDb
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        // On successful writing of asset document to database...
        funcSuccess = "Ok";
        funcResult = snapshot.data();

        var funcReturn = {
          Success: funcSuccess,
          Result: funcResult,
          FailReason: funcFailReason,
          Error: funcError,
          Warning: funcWarning,
        };

        return funcReturn;
      } else {
        funcSuccess = "No";
        funcResult = {};
        funcFailReason = "Meter Reading does not exist for the given date.";

        var funcReturn = {
          Success: funcSuccess,
          Result: funcResult,
          FailReason: funcFailReason,
          Error: funcError,
          Warning: funcWarning,
        };

        return funcReturn;
      }
    })
    .catch((err) => {
      funcSuccess = "No";
      funcResult = {};
      funcFailReason = "Error";
      funcError = err.message;

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    });
};

export const addMeterReading = (
  CltName,
  prjName,
  contName,
  meterNumber,
  meterReading
) => {
  // This function creates a new Meter Record under Contract under
  // project of a Client.
  //
  // A document exists if it has fields. Collections within the document
  // do not mean it exist if it has no fields.
  //
  // The parameter meter is an object containing the meter's details...
  //

  var pn = prjName;
  var cn = contName;
  var mtrn = meterNumber;
  var mtrrd = meterReading.readingDate;

  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  var db = firebase.firestore();
  var metersDb = db
    .collection("Projects")
    .doc(pn)
    .collection("Contracts")
    .doc(cn)
    .collection("Meters")
    .doc(mtrn)
    .collection("Readings");

  // check if a document exists for the mentioned client name...
  return metersDb
    .doc(mtrrd)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        // The meter reading document for the specified date exists...
        // Do not overwrite... Return the results...
        funcSuccess = "No";
        funcResult = {};
        funcFailReason =
          "Meter Reading for this day already exists. No Overwrite.";

        var funcReturn = {
          Success: funcSuccess,
          Result: funcResult,
          FailReason: funcFailReason,
          Error: funcError,
          Warning: funcWarning,
        };

        return funcReturn;
      } else {
        // No document exists for this client... Create a new document...
        return metersDb.doc(mtrrd).set(meterReading);
      }
    })
    .then((result) => {
      // On successful writing of client document to database...
      if (result) {
        if (!result.Success) return;

        if (result.Success === "No") {
          return result;
        }
      }

      funcSuccess = "Ok";
      funcResult = {};

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    })
    .catch((err) => {
      funcSuccess = "No";
      funcResult = {};
      funcFailReason = "Error";
      funcError = err.message;

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    });
};

export const updateMeterReading = (
  prjName,
  contName,
  meterNumber,
  meterReading
) => {
  // This function updates an existing Meter Record under Contract
  // under project of a Client.
  //
  // A document exists if it has fields. Collections within the document
  // do not mean it exist if it has no fields.
  //
  // Parameter meter is an object containing the meter's details...
  //

  var pn = prjName;
  var cn = contName;
  var mtrn = meterNumber;
  var mrdt = meterReading.readingDate;

  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  var db = firebase.firestore();
  var metersDb = db
    .collection("Projects")
    .doc(pn)
    .collection("Contracts")
    .doc(cn)
    .collection("Meters")
    .doc(mtrn)
    .collection("Readings")
    .doc(mrdt);

  // check if a document exists for the mentioned client name...
  return metersDb
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        return metersDb.update(meterReading);
      } else {
        // The client document exists...
        // Do not overwrite... Return the results...
        funcSuccess = "No";
        funcResult = {};
        funcFailReason = "Meter reading does not exist. Update Aborted.";

        var funcReturn = {
          Success: funcSuccess,
          Result: funcResult,
          FailReason: funcFailReason,
          Error: funcError,
          Warning: funcWarning,
        };

        return funcReturn;
      }
    })
    .then((result) => {
      // On successful writing of asset document to database...
      funcSuccess = "Ok";
      funcResult = {};

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    })
    .catch((err) => {
      funcSuccess = "No";
      funcResult = "{}";
      funcFailReason = "Error";
      funcError = err.message;

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    });
};

export const getMeterReadingList = (
  cltName,
  prjName,
  contName,
  meterNumber
) => {
  // This function gets list of existing meters under Contract
  // under project of a Client.
  //
  // A document exists if it has fields. Collections within the document
  // do not mean it exist if it has no fields.
  //

  var pn = prjName;
  var cn = contName;

  var funcSuccess = "";
  var funcResult = "";
  var funcError = "";
  var funcWarning = "";
  var funcFailReason = "";

  var db = firebase.firestore();
  var metersDb = db
    .collection("Projects")
    .doc(pn)
    .collection("Contracts")
    .doc(cn)
    .collection("Meters");

  // check if a document exists for the mentioned client name...
  return metersDb
    .doc(meterNumber)
    .collection("Readings")
    .get()
    .then((snapshot) => {
      let meterReadings = [];

      if (snapshot.docs.length > 0) {
        snapshot.forEach((docMeterReading) => {
          meterReadings.push(docMeterReading.data());
        });

        funcSuccess = "Ok";
        funcResult = meterReadings;
      } else {
        // The client document exists...
        // Do not overwrite... Return the results...
        funcSuccess = "No";
        funcResult = meterReadings;
        funcFailReason = "No readings found. Returning empty list.";
      }

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    })
    .catch((err) => {
      funcSuccess = "No";
      funcResult = {};
      funcFailReason = "Error";
      funcError = err.message;

      var funcReturn = {
        Success: funcSuccess,
        Result: funcResult,
        FailReason: funcFailReason,
        Error: funcError,
        Warning: funcWarning,
      };

      return funcReturn;
    });
};
