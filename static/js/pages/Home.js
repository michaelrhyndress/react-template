//React
import React, {Component, Fragment} from "react";
import axios from "axios";

import { getUser, msalFetch } from 'Components/authentication/msal/react-msal';

//Fabric
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';


//Components
export default class Home extends Component {
	constructor(props) {
	    super(props);
        //this.signedInUser = getUser()
		this.state = {
            notification: 'Hello World!'
        };
	}


    componentDidMount() {

	}
    
    _dismissNotification() {
        this.setState({
            notification: undefined
        })
    }

    render() {
    	return (
    		<section id="page-wrap" class="page">

                { this.state.notification 
                    ?
                        <MessageBar 
                            messageBarType={MessageBarType.success} 
                            dismissButtonAriaLabel="Close"
                            onDismiss={this._dismissNotification.bind(this)}>
                            {this.state.notification}
                        </MessageBar>
                    :   undefined
                }

                <div class="masthead">
    				<div class="page__inner contain">
            			<span>Welcome!</span>
            		</div>

            		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
    					<polygon points="0,100 100,0 100,100"/>
  					</svg>
            	</div>
            	<div class="page__inner contain">
            		<div>Content!</div>
                </div>
            </section>
    	);
    }
}