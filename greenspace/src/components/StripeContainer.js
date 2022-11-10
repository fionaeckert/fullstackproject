import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import React from 'react'
import PaymentForm from './PaymentForm'


const PUBLIC_KEY = "pk_test_51M0qYQJoP5RCEL5mbKg6tyn81xbETLaXuHTcHCbPEdSbtuHq9HiTRRiiH8Cr2Ml16vZ99DyQMeBHs8tkQyhtsGwg00b0LZqSLB"
const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
        <PaymentForm/>
    </Elements>
  )
}
