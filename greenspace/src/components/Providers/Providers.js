import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import '../../styling/providers.css'
import ProviderCards from './ProviderCards'
import ProviderBase from './ProviderBase'


function Providers() {

  const [providers, setProviders] = useState([])
  const [stateChange, setStateChange] = useState(false)
  
  const handleClick = async () => {
    await fetch('https://data.cityofchicago.org/resource/g7ng-5vwp.json')
    .then(res => res.json())
    .then(providers => {
      setProviders(providers)
      setStateChange(true)
    })

  }
  return (
    <div className='container'>
       {stateChange
        ?  <div> <ProviderBase/> <ProviderCards provider = {providers}/> </div>
        : <div> <ProviderBase/>
        <Button className="button" onClick={handleClick}>See local mental health clinics</Button> </div>
      }
   

  </div>

  );
}

export default Providers;