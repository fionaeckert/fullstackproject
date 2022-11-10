import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import '../../styling/providers.css'
import ProviderCards from './ProviderCards'
import Providers from './Providers'

function ProviderBase() {
  return (
    <div className='headerContainer'>
        <h4 className="header">Find local clinics that meet your needs, without sacrificing your comfort.</h4>
    </div>
  )
}

export default ProviderBase