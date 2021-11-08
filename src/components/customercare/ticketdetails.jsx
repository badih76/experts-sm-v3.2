import React, { Component } from 'react';
import { ReplyForm } from './ticketform';
import { getUserDisplayName } from '../../appcode/custcaretickets';
import { DropDownList } from '../../common/input';

class TicketDetails extends Component {
    
    getUserName = (UID) => {
        getUserDisplayName(UID)
            .then(result => {
                if(result.Success)
                {
                    return result.Result[0];
                }
                else
                {
                    return 'N/A'
                }
            })
            .catch(error => {
                console.log(error);
                return 'N/A';
            });
    }

    render() {
        const {  AttendedBy, ClientName, ClosedBy, 
            ClosingDT, ComplCat, ContractName, 
            Details, Duration, FileAttach, OpeningDT, 
            ProjectName, ReportedBy, ReportedOn, Subject, 
            TicketStatus, tsOpeningDT, userID,
            TicketNum 
        } = this.props.ticket;

        const { replies, reply, flags, onChange } = this.props;
    
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12" style={{padding: "0", fontSize: '0.75vw'}}>
                        <table className="table table-striped table-hover table-bordered" >
                            <tbody>
                                <tr>
                                    <td style={{fontWeight: "bold", textAlign: "left"}}>Ticket#:</td>
                                    <td>{TicketNum}</td>
                                    <td style={{fontWeight: "bold", textAlign: "left"}}>Opened On:</td>
                                    <td>{OpeningDT}</td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bold", textAlign: "left"}}>Status:</td>
                                    <td>
                                        <select name='TicketStatus' id='TicketStatus' disabled={!flags.isReply}
                                                onChange={onChange} style={{fontSize: '12px'}}>
                                            <option value=""></option>
                                            <option value='Open' 
                                                    selected={TicketStatus === 'Open' ? "selected" : ""}>
                                                Open
                                            </option>
                                            <option value='In Progress' 
                                                    selected={TicketStatus === 'In Progress' ? "selected" : ""}>
                                                In Progress
                                            </option>
                                            <option value='Closed' 
                                                    selected={TicketStatus === 'Closed' ? "selected" : ""}>
                                                Closed
                                            </option>
                                        </select>

                                    </td>
                                    <td style={{fontWeight: "bold", textAlign: "left"}}>Reported By:</td>
                                    <td>
                                        {ReportedBy}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bold", textAlign: "left"}}>Client Name:</td>
                                    <td >{ClientName}</td>
                                    <td style={{fontWeight: "bold", textAlign: "left"}}>Project Name:</td>
                                    <td >{ProjectName}</td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bold", textAlign: "left"}}>Contract Name:</td>
                                    <td colSpan="3">{ContractName}</td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bold", textAlign: "left"}}>Subject Category:</td>
                                    <td colSpan="3">{ComplCat}</td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bold", textAlign: "left"}}>Subject:</td>
                                    <td colSpan="3">{Subject}</td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: "bold", textAlign: "left"}}>Details:</td>
                                    <td colSpan="3">{Details}</td>
                                </tr>
                                <tr className="info">
                                    <td colSpan="4" >Replies</td>
                                </tr>
                                {(replies) ? replies.map((r, index) => {
                                    return <tr key={index}>
                                                <td style={{fontWeight: "bold", textAlign: "left"}}>{r.replyId}</td>
                                                <td colSpan="3" style={{textAlign: "left"}}>{r.Details}</td>
                                            </tr>
                                }): ""}
                            </tbody>
                        </table>
                        <hr /> 
                        {flags.isReply ? <ReplyForm reply={reply} flags={flags} onChange={onChange} /> : ""}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TicketDetails;