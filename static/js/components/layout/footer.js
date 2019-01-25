//React
import React, {Component} from 'react';

export default class Footer extends Component {
	constructor(props) {
		super(props);
		this._year = new Date().getFullYear();
	}
	render() {
		return (
			<footer class="footer">
	            
				<div class="contain">
					<div class="footer__legal">
		                <ul class="footer__legal__links">
		                       <li><a href="https://www.dow.com/en-us" title="Dow Global" target="_blank" rel="noopener noreferrer">Dow Global</a></li>
		                       <li><a href="https://myaccount.dow.com/irj/portal/dow" title="MyAccount @ Dow" target="_blank" rel="noopener noreferrer">MyAccount @ Dow</a></li>
		                       <li><a href="https://legal.dow.com/en-us/privacy-statement" title="Privacy Statement" target="_blank" rel="noopener noreferrer">Privacy Statement</a></li>
		                       <li><a href="https://legal.dow.com/en-us/terms-of-use" title="Terms of Use" target="_blank" rel="noopener noreferrer">Terms of Use</a></li>
		                       <li><a href="https://legal.dow.com/en-us/accessibility-statement" title="Accessibility Statement" target="_blank" rel="noopener noreferrer">Accessibility Statement</a></li>
		                       <li><a href="https://legal.dow.com/en-us/california-transparency-act-disclosure" title="California Transparency Act" target="_blank" rel="noopener noreferrer">California Transparency Act</a></li>
		                </ul>
		                <div class="footer__legal__copyright">
							<p>Copyright © The Dow Chemical Company (1995-{this._year}). All Rights Reserved.</p>
							<p>®™ Trademark of The Dow Chemical Company ("Dow") or an affiliated company of Dow</p>
						</div>
		            </div>
				</div>
			</footer>
    	);
  	}
}