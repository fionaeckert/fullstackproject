import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import Chatbot from './Chatbot'
import Providers from './Providers/Providers'
import StripeContainer from './StripeContainer'
import Newsletter from './Newsletter/Newsletter'
import '../styling/reactsite.css'


function ReactSite() {


    return(
        <div className='containerReactsite'>
            <Router>
                    <Switch>
                        <Route path='/' exact> 
                            <Chatbot/>
                        </Route>
                        <Route path='/providers' exact> 
                            <Providers/>
                        </Route>
                        <Route path='/newsletter' exact>
                            <Newsletter/>
                        </Route>
                        <Route path='/payment' exact>
                            <StripeContainer/>
                        </Route>             
                    </Switch>
            </Router>
        </div>
    )
}
export default ReactSite