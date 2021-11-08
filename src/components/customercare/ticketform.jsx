import React, { Component } from 'react';
import Input, { DropDownList, TextArea } from '../../common/input';

class TicketForm extends Component {
    state = {
        status: [
            {Name: "Open"},
            {Name: "In Progress"},
            {Name: "Closed"}
        ]

    }


    render() {
        const {  AttendedBy, ClientName, ClosedBy, 
                ClosingDT, ComplCat, ContractName, 
                Details, Duration, FileAttach, OpeningDT, 
                ProjectName, ReportedBy, ReportedOn, Subject, 
                TicketStatus, tsOpeningDT, TicketNum 
            } = this.props.ticket;

        const { clientsList, projectsList, 
                contractsList, compleCatList, 
                flags, openedBy } = this.props;

      return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12" style={{padding: "0"}}>
                    <div className="col-md-4">
                        <Input name="TicketNumber" 
                            label="Ticket Number" 
                            value={TicketNum}
                            flgDisabled={true}
                        />
                    </div>
                    <div className="col-md-4">
                        <Input name="OpeningDT" 
                            label="Opening Date" 
                            value={OpeningDT}
                            flgDisabled={true}
                        />
                    </div>
                    <div className="col-md-4">
                        <DropDownList name="TicketStatus" 
                            label="Ticket Status" 
                            values={this.state.status}
                            defValue={TicketStatus}
                            flgDisabled={!flags.isAdd && !flags.isEdit}
                        />
                    </div>
                </div>
                <div className="col-md-12">
                    <DropDownList name="ClientName"
                        label="Client Name"
                        flgDisabled={false}
                        values={clientsList}
                        onChange={this.props.onClientChange}
                        defValue={ClientName}
                        flgDisabled={!flags.isAdd && !flags.isEdit}
                    />
                </div>
                <div className="col-md-12">
                    <DropDownList name="ProjectName"
                        label="Project Name"
                        flgDisabled={false}
                        values={projectsList}
                        onChange={this.props.onProjectChange}
                        defValue={ProjectName}
                        flgDisabled={!flags.isAdd && !flags.isEdit}
                    />
                </div>
                <div className="col-md-12">
                    <DropDownList name="ContractName"
                        label="Contract Name"
                        flgDisabled={false}
                        values={contractsList}
                        onChange={this.props.onChange}
                        defValue={ContractName}
                        flgDisabled={!flags.isAdd && !flags.isEdit}
                    />
                </div>
                <div className="col-md-12">
                    <DropDownList 
                        name="ComplCat"
                        label="Subject Category"
                        flgDisabled={false}
                        defValue={ComplCat}
                        values={compleCatList}
                        onChange={this.props.onChange}
                        flgDisabled={!flags.isAdd && !flags.isEdit}
                    />
                </div>
                <div className="col-md-12">
                    <Input name="Subject" label="Subject"
                        value={Subject} 
                        onChange={this.props.onChange}
                        flgDisabled={!flags.isAdd && !flags.isEdit} />
                </div>
                <div className="col-md-12">
                    <TextArea name="Details" label="Details" rows="5"
                        value={Details} 
                        onChange={this.props.onChange}
                        flgDisabled={!flags.isAdd && !flags.isEdit} />
                </div>
                <div className="col-md-12">
                    <Input name="userName" label="Opened By" rows="5"
                        value={openedBy} 
                        flgDisabled={true} />
                </div>
            </div>
        </React.Fragment>
      );
   }
}

export const ReplyForm = (props) => {
    const { Details, FileAttachement, RepliedBy, tsReplyDT } = props.reply;
    const { onChange } = props;

    return (
        <React.Fragment>
            <div className="row" style={{paddingLeft: "0.75vw", paddingRight: "0.75vw"}}>
                <div className="col-md-12">
                    <Input name="tsReplyDT" 
                        label="Reply Timestamp"
                        value={tsReplyDT}
                        flgDisabled={true}
                    />
                    <Input name="RepliedBy" 
                        label="Replied By"
                        value={RepliedBy}
                        flgDisabled={true}
                    />
                    <TextArea name="Details" 
                        label="Reply Details"
                        value={Details}
                        flgDisabled={false}
                        onChange={onChange}
                        rows="5"
                    />
                </div>
            </div>
        </React.Fragment>
    );
}

export default TicketForm;