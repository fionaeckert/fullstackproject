import React from 'react'
import ChatBot from 'react-simple-chatbot';
import { BrowserRouter as Router, Switch, 
    Route, NavLink } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import '../styling/chatbot.css'

const theme = {
    background: '#f5f8fb',
  fontFamily: '',
  headerBgColor: '#eeecd3',
  headerFontColor: 's393d2d',
  headerFontSize: '15px',
  botBubbleColor: '#eeecd3',
  botFontColor: '#s393d2d',
  userBubbleColor: '#fff',
  userFontColor: '#s393d2d',
};

const steps = [
    {
        id: 'welcome-message',
        message: "Hi, thanks for visiting Greenspace 💚 My name's Greta, and I'm here to connect you with mental health resources.",
        trigger: 'name-message'
    },
    {
        id: 'name-message',
        message: "Who am I speaking with today?",
        trigger: 'welcome-user-response'
    },
    {
        id: 'welcome-user-response',
        user: true,
        validator: (value) => {
            if (isNaN(value) == false) {
            return 'Please enter your name!';
            }
            return true;
        },
        trigger: 'nice-to-meet-message'
    },
    {
        id: 'nice-to-meet-message',
        message: 'Such a gorgeous name! Nice to meet you {previousValue}.',
        trigger: 'services-message'
    },
    {
        id: 'services-message',
        message: 'Finding the appropriate services to fit your needs is incredibly difficult and super personal.',
        trigger: 'trusting-message'
    },
    {
        id: 'trusting-message',
        message: 'I appreciate you choosing Greenspace to connect you with what you need. Please select which option below best fits your needs.',
        trigger: 'options-message'
    },
    {
        id: 'options-message',
        options: [
          { value: 'providers', label: 'Chicago Providers', trigger:'providers'},
          { value: 'newsletter', label: 'Get Involved', trigger:'newsletter'},
          { value: 'resources', label: 'Mental Health Resources', trigger:'resources-message'}
        ],
    },
    {
        id: 'resources-message',
        message: 'Happy to help in any way I can. Could you tell me which of the following best represents your needs?',
        trigger: 'needs-message'
    },
    {
        id: 'needs-message',
        options: [
          { value: 'in-person-providers', label: 'Need an in-person counselor', trigger:'in-person-providers'},
          { value: 'talk-on-phone', label: 'Need to talk to someone', trigger:'talk-on-phone'},
          { value: 'emergency-room', label: 'Need the closest ER', trigger:'emergency-room'},
          { value: 'er-alternative', label: 'Need ER alternative', trigger:'er-alternative'}

        ],
    },
    {
        id: 'in-person-providers',
        message: 'Sure thing. Illinois Mental Health Collaborative can certainly help. They focus on ensuring mental healthcare is accessible for all.',
        trigger: 'IL-mental-health-collaborative'
    },
    {
        id: 'IL-mental-health-collaborative',
        message: 'Call the following number for a mental health provider referral: 866-359-7953',
    },
    {
        id: 'talk-on-phone',
        message: 'Definitely understand. There are a number of great options within the Chicago area.',
        trigger: 'phone-helplines'
    },
    {
        id: 'phone-helplines',
        message: 'NAMI Chicago: 312-563-0445, Community Counseling Centers of Chicago: 773-769-0205, Trilogy Mental Health Center: 800-322-8400, Lake County Mental Health Services: 847-377-8088',
    },
    {
        id: 'emergency-room',
        message: 'Absolutely. A number of local ERs offer crisis intake lines.',
        trigger: 'er-lines'
    },
    {
        id: 'er-lines',
        message: 'St. Joseph Hospital: 773-665-3000, Northwestern Memorial Hospital: 312-926-8100, Rush University Medical Center: 312-942-2400',
    },
    {
        id: 'er-alternative',
        message: 'Totally understand. Let me pull some options up for you.',
        trigger: 'er-alt-lines'
    },
    {
        id: 'er-alt-lines',
        message: 'Turning Point Living Room: 847-933-9202, Josselyn Center Living Room: 847-441-5600, Welcoming Center Lutheran Social Services: 773-561-5809',
    },
    {
        id:'providers',
        component: (
            <div>Please navigate to the following link:
                <br />
                <Router>
                    <Switch>
                        <NavLink to='/providers' target="_blank">Chicago-Area Providers</NavLink>
                    </Switch>
                </Router>
            </div>
        )
    },
    {
        id:'newsletter',
        component: (
            <div>Please navigate to the following link:
                <br />
                <Router>
                    <Switch>
                        <NavLink to='/newsletter' target="_blank">Sign up for our newsletter!</NavLink>
                    </Switch>
                </Router>
            </div>
        )
    }
]

function Chatbot() {
  return (
    <div className="containerChatbot">
        <ThemeProvider theme={theme}>
        <ChatBot steps={steps}/>
        </ThemeProvider>
    </div>
  )
}

export default Chatbot