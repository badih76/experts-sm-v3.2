import React, { Component } from 'react';
import ToolsBar from '../../common/toolsbar';
import { TitlePageHeader } from '../titleheader/titleheader';
import _ from 'lodash';

import { getAttachmentsList, uploadAttachment, deleteAttachment } from '../../appcode/crmuploadattachments';

import processing from '../../images/processing.gif';
import AttachList from './attachlist';
import AttachForm from './attachform';

class CRMUploadAttach extends Component {
    state = {
        uprofile: {},
        attachment: {
            TitleText: "",
            FileName: "",
            FileSize: "",
            UploadDate: new Date().toString(),
            DownloadURL: ""
        },
        attachments: [],
        buttonsOptions: {
            addButton: {
                showAdd: true,
                onAdd: () => this.handleAdd()
            },
            saveButton: {
                showSave: false,
                onSave: () => this.handleSubmit()
            },
            cancelButton: {
                showCancel: false,
                onCancel: () => this.handleCancel()
            },
            searchButton: {
                showSearch: false,
                onSearch: null
            },
            deleteButton: {
                showDelete: false,
                onDelete: () => this.handleDelete()
            }

        },
        flags: {
            isAdd: false,
            isReply: false,
            isEdit: false
        },
        showButtons: true,
        file: null
    }

    handleDelete = () => {
        let attachment = {...this.state.attachment};

        deleteAttachment(attachment)
            .then(result => {
                // remove the attachment from the attachments list...
                let attachments = [...this.state.attachments];
                console.log(attachments);

                attachments.splice(attachments.findIndex(e => {
                    return attachment.FileName === e.FileName;
                }), 1);

                // clear attachment fields... 
                attachment = {
                    TitleText: "",
                    FileName: "",
                    FileSize: "",
                    UploadDate: new Date().toString(),
                    DownloadURL: "",
                }

                this.setState({ attachment, attachments });
            })
            .catch(err => {
                console.log("Error: ", err.message);
                alert("Error occured while deleting the attachment.\nPlease, inform the system administrator!");
            })
    }

    handleAdd = () => {

        let flags = {...this.state.flags};
        flags.isAdd = true;
        flags.isEdit = false;
        flags.isReply = false;

        let attachment = {
            FileName: "",
            FileSize: "",
            DownloadURL: "",
            UploadDate: "",
            TitleText: ""
        }

        let buttonsOptions = {...this.state.buttonsOptions};
        buttonsOptions.addButton.showAdd = false;
        buttonsOptions.saveButton.showSave = true;
        buttonsOptions.cancelButton.showCancel = true;

        this.setState({ attachment, flags, buttonsOptions });
    }

    handleSubmit = () => {
        this.setState({ showButtons: false });

        let flags = {...this.state.flags};
        let attachment = {...this.state.attachment};

        // if isAdd === true
        if(flags.isAdd)
        {
            uploadAttachment(attachment, this.state.file)
                .then(result => {
                    attachment = {...result.Result}; 
                    
                    console.log(result);
                    let attachments = [...this.state.attachments];
                    attachments.push(attachment);   

                    flags.isAdd = false;
                    flags.isReply = false;
                    flags.isEdit = false;
    
                    let buttonsOptions = {...this.state.buttonsOptions};
                    buttonsOptions.addButton.showAdd = true;
                    buttonsOptions.saveButton.showSave = false;
                    buttonsOptions.cancelButton.showCancel = false;
    
                    this.setState({ attachment, attachments, flags, 
                                    buttonsOptions, showButtons: true });
                })
                .catch(error => {
                    console.log(error);

                    attachment = {
                        TitleText: "",
                        FileName: "",
                        FileSize: "",
                        UploadDate: new Date().toString(),
                        DownloadURL: ""
                    }

                    flags.isAdd = false;
                    flags.isReply = false;
                    flags.isEdit = false;
    
                    let buttonsOptions = {...this.state.buttonsOptions};
                    buttonsOptions.addButton.showAdd = true;
                    buttonsOptions.saveButton.showSave = false;
                    buttonsOptions.cancelButton.showCancel = false;
    
                    this.setState({ attachment, flags, buttonsOptions, 
                                    showButtons: true });

                });
        }
        // else if(flags.isReply)        
        // {
        //     // add the reply to the replies list... 
        //     let replies = [...this.state.replies];
        //     let replyId = (new Date()).getDate().pad(2, '0') + '.' 
        //                 + ((new Date()).getMonth()+1).pad(2, '0') + '.'
        //                 + (new Date()).getFullYear().toString() + ' '
        //                 + (new Date()).getHours().toString() + ':'
        //                 + (new Date()).getMinutes().toString() + ':'
        //                 + (new Date()).getSeconds().toString();     
            
        //     let reply = {...this.state.reply, replyId };
            
        //     postTicketReplySupport(this.state.ticket.TicketNum, reply, ticket.TicketStatus)
        //         .then(result => {
        //             // update the concerned ticket status...
        //             let tickets = [...this.state.tickets];
        //             let tn = 0;
                    
        //             console.log(tickets);

        //             tickets.map(t => {
        //                 if(t.TicketNum === this.state.ticket.TicketNum)
        //                 {
        //                     tickets[tn].TicketStatus = ticket.TicketStatus;
        //                 }
        //                 ++tn;
        //             });

        //             console.log('Tickets: ', tickets);

        //             this.setState({ tickets }); 

        //             replies.push(reply)

        //             replies = replies.sort(function compare(a, b) {
        //                 let arrA = a.replyId.split(' ');
        //                 let arrB = b.replyId.split(' ');
    
        //                 let arrAD = arrA[0].split('.');
        //                 let arrAT = arrA[1].split(':');
    
        //                 let arrBD = arrB[0].split('.');
        //                 let arrBT = arrB[1].split(':');
    
        //                 var dateA = new Date(parseInt(arrAD[2]), parseInt(arrAD[1]), parseInt(arrAD[0]), 
        //                                      parseInt(arrAT[2]), parseInt(arrAT[1]), parseInt(arrAT[0]));
        //                 var dateB = new Date(parseInt(arrBD[2]), parseInt(arrBD[1]), parseInt(arrBD[0]), 
        //                                      parseInt(arrBT[2]), parseInt(arrBT[1]), parseInt(arrBT[0]));
                            
        //                 return dateA - dateB;    
        //               });
    
        //             // set the flags and buttons options... 
        //             flags.isAdd = false;
        //             flags.isReply = false;
        //             flags.isEdit = false;
    
        //             let buttonsOptions = {...this.state.buttonsOptions};
        //             buttonsOptions.addButton.showAdd = true;
        //             buttonsOptions.replyButton.showReply = true;
        //             buttonsOptions.saveButton.showSave = false;
        //             buttonsOptions.cancelButton.showCancel = false;
    
        //             this.setState({ ticket, flags, buttonsOptions, 
        //                             showButtons: true, replies, reply });


        //         })
        //         .catch(error => {
        //             console.log(error);

        //             let reply = {
        //                 Details: '',
        //                 RepliedBy: '',
        //                 tsReplyDT: '',
        //                 FileAttachement: 'X'
        //             }
                    
        //             // set the flags and buttons options... 
        //             flags.isAdd = false;
        //             flags.isReply = false;
        //             flags.isEdit = false;
    
        //             let buttonsOptions = {...this.state.buttonsOptions};
        //             buttonsOptions.addButton.showAdd = true;
        //             buttonsOptions.replyButton.showReply = true;
        //             buttonsOptions.saveButton.showSave = false;
        //             buttonsOptions.cancelButton.showCancel = false;
    
        //             this.setState({ ticket, flags, buttonsOptions, 
        //                             showButtons: true, replies: [], reply });

        //         });

        // }
        // else                // isEdit === true
        // {

        // }
        
        // this.setState({ showButtons: false });

    }

    handleCancel = () => {
        // let flags = {...this.state.flags};
        // let buttonsOptions = {...this.state.buttonsOptions};

        // if(flags.isAdd) 
        // {
        //     let ticket = {
        //         TicketNum: ''
        //     }

        //     flags.isAdd = false;
        //     flags.isEdit = false;
        //     flags.isReply = false;

        //     buttonsOptions.addButton.showAdd = true;
        //     buttonsOptions.replyButton.showReply = false;
        //     buttonsOptions.saveButton.showSave = false;
        //     buttonsOptions.cancelButton.showCancel = false;

        //     this.setState({ ticket, flags, buttonsOptions });

        // }
        // else if(flags.isReply)
        // {
        //     this.showProcess();

        //     let index = this.state.selectedTicketIndex;
        //     let replies = [];
        //     let reply = {
        //         Details: '',
        //         FileAttachement: 'X',
        //         RepliedBy: '',
        //         tsReplyDT: new Date()
        //     };

        //     let ticket = {
        //         AttendedBy: '',
        //         ClientName: '',
        //         ClosedBy: '',
        //         ClosingDT: '',
        //         ComplCat: '',
        //         ContractName: '',
        //         Details: '',
        //         Duration: 0,
        //         FileAttach: "",
        //         OpeningDT: "",
        //         ProjectName: '',
        //         ReportedBy: '',
        //         ReportedOn: '',
        //         Subject: '',
        //         TicketStatus: '',
        //         tsOpeningDT: '',
        //         userID: '',
        //         TicketNum: '',
        //         Replies: []
        //     }
        
        //     this.setState({ ticket, reply });

        //     let tickets = [...this.state.tickets];
        //     let projectsList = [];
        //     let contractsList = [];

        //     ticket = {...tickets[index]};
        //     flags.isAdd = false;
        //     flags.isEdit = false;
        //     flags.isReply = false;

        //     buttonsOptions.addButton.showAdd = true;
        //     buttonsOptions.replyButton.showReply = true;
        //     buttonsOptions.saveButton.showSave = false;
        //     buttonsOptions.cancelButton.showCancel = false;

        //     this.setState({ flags, buttonsOptions });

        //     getTicketReplies(ticket.TicketNum)
        //         .then(result => {
        //             replies = [...result.Result];

        //             return getProjectsOfClient(ticket.ClientName);
        //         })
        //         .then(result => {

        //             result.Result.map(r => {
        //                 projectsList.push({Name: r.name});
        //             })
                    
        //             return getContractsForProject(ticket.ProjectName)
        //         })
        //         .then(result => {

        //             result.Result.map(r => {
        //                 contractsList.push({Name: r.name});
        //             });
                    

        //             this.setState({ projectsList, contractsList, 
        //                             ticket, replies,
        //                             selectedTicketIndex: index });
        //             this.hideProcess();
        //         })
        //         .catch(error => {
        //             console.log(error);
        //             this.setState({ projectsList, contractsList });
        //             this.hideProcess();
        //         });    
        // }
        // else
        // {

        // }
    }

    handleOnFileSelect = (event) => {
        let { value } = event.currentTarget;
        
        let attachment = {...this.state.attachment};
        let file = event.currentTarget.files[0];

        attachment.FileName = value.name;
        attachment.FileName = file.name;
        attachment.FileSize = file.size;

        this.setState({ attachment, file });
    }

    handleOnTitleChange = (event) => {
        let { value } = event.currentTarget;

        let attachment = {...this.state.attachment}
        attachment.TitleText = value;

        this.setState({ attachment });
    }

    handleAttachmentRowClick = (index) => {
        // this.showProcess();

        let attachment = {
            TitleText: "",
            FileName: "",
            FileSize: "",
            UploadDate: new Date().toString(),
            DownloadURL: ""
        }
    
        let attachments = [...this.state.attachments];
        let buttonsOptions = {...this.state.buttonsOptions};

        attachment = {...attachments[index]};
        buttonsOptions.deleteButton.showDelete = true;

        this.setState({ attachment });
    } 

    componentDidMount = () => {
        this.showProcess();

        let attachments = [];

        getAttachmentsList()
            .then(result => {
                attachments = result.Result;
                
                console.log(result.Result);
                this.setState({ attachments });
                this.hideProcess();
            })
            .catch(error => {
                console.log(error);
                this.hideProcess();
            })
            
    }

    handleOnChange = (event) => {
        const { name, value } = event.currentTarget;

        let ticket = {...this.state.ticket};
        ticket[name] = value;

        this.setState({ ticket });
    }

    constructor(props) {
        super(props);

        const token = sessionStorage['token'];
        const uprofile = JSON.parse(sessionStorage.getItem('uprofile'));
    
        if(!token || !this.props.menuVisible)
        {
            props.history.push('/');
            return ;
        }
        else
        {
            this.state.uprofile = uprofile;
        }
    }

    render() {
        return (
            <React.Fragment>
                <TitlePageHeader title="Client Protal - Upload Attachments" bgColor="white" color="gray" />
                <div className="row" style={{paddingLeft: "25px", paddingRight: "25px"}}>
                    <div className="col-md-5" style={columnStyle}>
                        <AttachList 
                            attachments={this.state.attachments} 
                            onAttachClick={this.handleAttachmentRowClick} />
                    </div>
                    <div className="col-md-4" style={columnStyle}>
                        <div className={"row" + ((this.state.showButtons) ? "" : " hidden")} 
                             style={{paddingLeft: "15px", paddingRight: "15px", marginBottom: "15px"}}>
                            <ToolsBar buttonsOptions={this.state.buttonsOptions} />
                        </div>
                        <div className={"row" + ((!this.state.showButtons) ? "" : " hidden")} 
                             style={{paddingLeft: "15px", paddingRight: "15px", marginBottom: "15px"}}>
                            <img src={processing} 
                                width="40vw" 
                                alt="processing" 
                                style={{marginTop: "2vh"}} />
                        </div>
                        <div className="row" style={{padding: "0", overflow: "auto", height: "58vh"}}>
                            <div className="col-md-12">
                                { 
                                    <AttachForm
                                        attachment={this.state.attachment}
                                        flags={this.state.flags} 
                                        onFileSelect={this.handleOnFileSelect}
                                        onTitleChange={this.handleOnTitleChange}
                                        onChange={null} />
                                 
                                }
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-md-3" style={columnStyle}>
                        <img src={this.state.attachment.DownloadURL} width="90%" />
                    </div>
                </div>
            </React.Fragment>
        );
    }

    // ((this.state.ticket.TicketNum) ? 
    //                                     <TicketDetails ticket={this.state.ticket} 
    //                                         replies={this.state.replies} 
    //                                         reply={this.state.reply} 
    //                                         flags={this.state.flags}
    //                                         onChange={this.handleOnReplyChange} />
    //                                     : "")

    showProcess = () => {
        this.setState({ showButtons: false });
    }

    hideProcess = () => {
        this.setState({ showButtons: true });
    }
}

export default CRMUploadAttach;

const columnStyle = {
    border: "solid",
    borderWidth: "1px",
    borderColor: "lightgray",
    borderRadius: "25px",
    height: "68vh",
    overflow: 'auto'
}

Number.prototype.pad = function (size, c) {
    var s = String(this);
    while (s.length < (size || 2)) { s = c + s; }
    return s;
}

String.prototype.formatDate = function (format, separator) {
    let sDt = this;
    let aDt = (sDt.split('-').length > 1) ? sDt.split('-') : sDt.split('/');
    let fOpt = (sDt.split('-').length > 1) ? 1 : 2;
    let f = format.split(separator);

    let nDD=(fOpt === 1) ? (aDt[2].split(' '))[0] : aDt[1], 
        nMM=(fOpt === 1) ? aDt[1] : aDt[0], 
        nYYYY=(fOpt === 1) ? aDt[0] : (aDt[2].split(' '))[0],
        nDt = "";

    switch(f[0])
    {
        case 'dd':
            nDt = nDD + separator;
            break;

        case 'MM':
            nDt = nMM + separator;
            break;

        case 'mm':
            nDt = nMM + separator;
            break;

        case 'yyyy':
            nDt = nYYYY + separator;
            break;

    }

    switch(f[1])
    {
        case 'dd':
            nDt += nDD + separator;
            break;

        case 'MM':
            nDt += nMM + separator;
            break;

        case 'mm':
            nDt += nMM + separator;
            break;

        case 'yyyy':
            nDt += nYYYY + separator;
            break;

    }

    switch(f[2])
    {
        case 'dd':
            nDt += nDD;
            break;

        case 'MM':
            nDt += nMM;
            break;

        case 'mm':
            nDt += nMM;
            break;

        case 'yyyy':
            nDt += nYYYY;
            break;

    }
      
    return nDt;
}
