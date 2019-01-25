//React
import React, {Component} from "react";

//Components
export default class GenericNotFound extends Component {
	constructor(props) {
	    super(props);
	}

    render() {
    	return (
    		<section id="page-wrap" class="page">
                <div class="masthead">
    				<div class="page__inner contain">
            			<h2>404 - Not Found</h2>
            		</div>

            		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
    					<polygon points="0,100 100,0 100,100"/>
  					</svg>
            	</div>
            	<div class="page__inner contain">
            		
	            </div>
            </section>
    	);
    }
}