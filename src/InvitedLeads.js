import React from 'react';
import axios from 'axios';
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.min.css';
import locationPin from './locationpin.png';
import toolbox from './toolbox.svg';
import { config } from './config.js';

class InvitedLeads extends React.Component {
  constructor() {
    super();
    this.state = { leads: [] };
  }

  async componentDidMount() {
    try
    {
      const response = await axios.get(`${config.apiHostUrl}/new-leads`);
      if (response && response.data) {
        this.setState({
          leads: response.data
        });
      }
    } catch (err) {
        console.log('An error has occured.');
    }
  }

  render() {
    const { leads } = this.state;

    return (
      <div>
        {leads.map((lead, i) => (
          <div className="leadCard"  key={i}>
            <div className="cardHeader">
              <div className="avatar">
                <span className="initial">{lead.firstName.charAt(0)}</span>
              </div>
              <span className="cardHeaderInfo">
                <strong>{lead.firstName}</strong><br/>
                {moment(lead.dateCreated).format('MMMM Do @ h:mm a')}
              </span>
            </div>
            <hr></hr>            
            <img src={locationPin} className="smallIcon" />
            {lead.suburb}&emsp;
            <img src={toolbox} className="smallIcon" />
            {lead.category}&emsp;
            <strong>Job ID:</strong> {lead.jobId}
            <hr></hr>
            {lead.description}
            <hr></hr>
            <button onClick={() => this.leadClicked(lead.jobId, 'accepted')} className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Accept</button>&emsp;
            <button onClick={() => this.leadClicked(lead.jobId, 'declined')} className="btn btn-danger btn-lg active" role="button" aria-pressed="true">Decline</button>&emsp;
            ${lead.price.toFixed(2)}&emsp;
            Lead Invitation
          </div>
        ))}
      </div>
    );
  }
  async leadClicked(id, status){
    await axios.post(`${config.apiHostUrl}/${id}?status=${status}`);
  }
}

export default InvitedLeads;