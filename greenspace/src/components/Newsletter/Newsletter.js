import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup' 
import {addUser} from '../../actions/newsletterActions'
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import '../../styling/newsletter.css'

function Newsletter() {
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [interests, setInterests] = useState('')
  const [availability, setAvailability] = useState('')
  const dispatch = useDispatch()
  const allUsers = useSelector(state => state.users)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addUser(first_name, last_name, email, interests, availability))
    alert('Got it! Thanks!')
  }  
console.log(allUsers)
  
return (
    <div className='container'>
      <div className='headerContainer'>
        <h4 className="header">Looking for ways to give back?</h4>
     </div>
      <Form onSubmit={handleSubmit}>
      <InputGroup className='formContainer'>
          <Form.Label>Join our efforts to spread mental health awareness throughout Chicago! Input your information below, and we'll be in touch with upcoming events, fundraisers, and volunteer opportunities.</Form.Label>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <InputGroup className="mb-3">
          <InputGroup.Text>First and last name</InputGroup.Text>
          <Form.Control aria-label="First name" onChange={e => setFirst_name(e.target.value)}/>
          <Form.Control aria-label="Last name" onChange={e => setLast_name(e.target.value)}/>
        </InputGroup>
        <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Email
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              onChange={e => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup className='inputBoxes'>
              <InputGroup.Text>Briefly describe your volunteer interests</InputGroup.Text>
              <Form.Control as="textarea" aria-label="With textarea" onChange={e => setInterests(e.target.value)} />
              <InputGroup.Text>Briefly describe your availability</InputGroup.Text>
              <Form.Control as="textarea" aria-label="With textarea" onChange={e => setAvailability(e.target.value)}/>
          </InputGroup>
          </Form.Group>
          </InputGroup>
          <Button variant="primary" type="submit">
            Submit
          </Button>
      </Form>
    </div>
  );
}

export default Newsletter;