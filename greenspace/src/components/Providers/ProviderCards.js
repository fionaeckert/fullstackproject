import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import '../../styling/providers.css'
import Providers from './Providers'


function ProviderCards(props) {
  return (
    <div className='cardContainer'>
      <Card style={{ width: '18rem' }} className="cards">
        <Card.Body>
          <Card.Title><a target="_blank" href="https://cookcountyhealth.org/locations/englewood-health-center/">{props.provider[0].site_name}</a></Card.Title>
          <Card.Text className='cardText'>
            Hours of operation:
            <br />
          {props.provider[0].hours_of_operation}
          <br />
          Address:
          <br />
          {props.provider[0].street_address}
          <br />
          {props.provider[0].zip}, <nbsp />
          {props.provider[0].state}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }} className="cards">
        <Card.Body>
          <Card.Title><a target="_blank" href="http://cdph.purplebinder.com/locations/city-of-chicago/greater-grand-slash-mid-south-mental-health-center">{props.provider[1].site_name}</a></Card.Title>
          <Card.Text className='cardText'>
            Hours of Operation:
            <br />
          {props.provider[1].hours_of_operation}
          <br />
          Address:
          <br />
          {props.provider[1].street_address}
          <br />
          {props.provider[1].zip}, <nbsp />
          {props.provider[1].state}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }} className="cards">
        <Card.Body>
          <Card.Title><a target="_blank" href="http://cdph.purplebinder.com/locations/city-of-chicago/greater-lawn-mental-health-center">{props.provider[2].site_name}</a></Card.Title>
          <Card.Text className='cardText'>
            Hours of Operation:
            <br />
          {props.provider[2].hours_of_operation}
          <br />
          Address:
          <br />
          {props.provider[2].street_address}
          <br />
          {props.provider[2].zip}, <nbsp />
          {props.provider[2].state}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }} className="cards">
        <Card.Body>
          <Card.Title><a target="_blank" href="https://lawndale.org/">{props.provider[3].site_name}</a></Card.Title>
          <Card.Text className='cardText'>
            Hours of Operation:
            <br />
          {props.provider[3].hours_of_operation}
          <br />
          Address:
          <br />
          {props.provider[3].street_address}
          <br />
          {props.provider[3].zip}, <nbsp />
          {props.provider[3].state}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }} className="cards">
        <Card.Body>
          <Card.Title><a target="_blank" href="http://cdph.purplebinder.com/locations/city-of-chicago/north-river-mental-health-center">{props.provider[4].site_name}</a></Card.Title>
          <Card.Text className='cardText'>
            Hours of Operation:
            <br />
          {props.provider[4].hours_of_operation}
          <br />
          Address:
          <br />
          {props.provider[4].street_address}
          <br />
          {props.provider[4].zip}, <nbsp />
          {props.provider[4].state}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ProviderCards