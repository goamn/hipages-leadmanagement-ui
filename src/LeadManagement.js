import React from 'react';
import logo from './tradielogo.png';
import './LeadManagement.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import InvitedLeads from './InvitedLeads.js';
import AcceptedLeads from './AcceptedLeads.js';
import axios from 'axios';
import { config } from './config.js';

class LeadManagement extends React.Component {

  async componentDidMount() {
    try
    {
      const response = await axios.post(`${config.apiHostUrl}/test-data`);
    } catch (err) {
        console.log('An error has occured.');
    }
  }

  render() {
    return (
      <div className="LeadManagement">
        <header className="LeadManagement-header">
          <img src={logo} className="LeadManagement-logo" alt="logo" />
          <h1>
            Lead Management
          </h1>
        </header>

        <Tabs>
          <TabList>
            <Tab>Invited</Tab>
            <Tab>Accepted</Tab>
          </TabList>

          <TabPanel>
            <InvitedLeads/>
          </TabPanel>
          <TabPanel>
            <AcceptedLeads/>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default LeadManagement;
