import React from 'react';
import axios from 'axios';
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.min.css';
import locationPin from './locationpin.png';
import toolbox from './toolbox.svg';
import phoneIcon from './phoneicon.png';
import emailIcon from './emailicon.png';
import { config } from './config.js';

class AcceptedLeads extends React.Component {
  constructor() {
    super();
    this.state = { leads: [] };
  }

  async componentDidMount() {
    try
    {
      const response = await axios.get(`${config.apiHostUrl}/accepted-leads`);
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
                <span className="initial">{lead.fullName.charAt(0)}</span>
              </div>
              <span className="cardHeaderInfo">
                <strong>{lead.fullName}</strong><br/>
                {moment(lead.dateCreated).format('MMMM Do @ h:mm a')}
              </span>
            </div>
            <hr></hr>            
            <img src={locationPin} className="smallIcon" />
            {lead.suburb}&emsp;
            <img src={toolbox} className="smallIcon" />
            {lead.category}&emsp;
            <strong>Job ID:</strong> {lead.jobId}&emsp;
            ${lead.price.toFixed(2)} Lead Invitation
            <hr></hr>
            <img src={phoneIcon} className="smallIcon" />
            {lead.phone}&emsp;
            <img src={emailIcon} className="smallIcon" />
            {lead.email}<br/>
            {lead.description}
            <hr></hr>
          </div>
        ))}
      </div>
    );
  }
  async leadClicked(id, status){
    let formData = new FormData();
    formData.append('status', status);
    await axios.post(`${config.apiHostUrl}/${id}?status=${status}`);
  }
}

export default AcceptedLeads;