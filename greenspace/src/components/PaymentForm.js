import React, {useState} from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from "axios"
import "../styling/paymentform.css"

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#s393d2d",
			color: "#s393d2d",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "20px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#s393d2d" },
			"::placeholder": { color: "#s393d2d" },
		},
		invalid: {
			iconColor: "#s393d2d",
			color: "#s393d2d"
		}
	}
}

export default function PaymentForm() {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

    if(!error){
        try{
            const {id} = paymentMethod
            const response = await axios.post("http://localhost3001/payment", {
                amount: 1000,
                id
            })
            if(response.data.success){
                console.log("Successful payment")
                setSuccess(true)
            }
        }
        catch(error){
            console.log("Error", error)
            
        }
    }
        else{
            console.log(error.message)
    }
}
  return (
    <>
    <div id="entireFormContainer">
    <div id="headerContainer">
        <h4 id="header">Thank you for considering a $10 donation to Greenspace.</h4>
        <p id="text">All proceeds this month will support <a target="_blank" href="http://www.nostigmas.org/">No Stigmas</a>, an organization devoted to shifting the societal perspctive on mental health.</p>
        
    </div>
    {!success?
    <div id="paymentFormContainer">
        <form onSubmit={handleSubmit}>
            <fieldset className="Form">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button id="button">Donate</button>
        </form>
    </div>
    :
    <div>
        <h2>Thanks for your donation!</h2>
    </div>
}
</div>

    </>
  )
}
