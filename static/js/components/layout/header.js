//React
import React, {Component, Fragment} from "react";
import { Link } from 'react-router-dom'

import axios from "axios";
import { slide as Menu } from 'react-burger-menu' //options: scaleDown, scale, and more

//Fabric
import {Persona, PersonaSize, PersonaPresence} from 'office-ui-fabric-react/lib/Persona';
import { getTheme } from 'office-ui-fabric-react/lib/Styling';

//Images
import Logo from "Images/Dow_Chemical_Logo.svg"

//Components
import { getUser, logout } from 'Components/authentication/msal/react-msal';

const theme = getTheme();

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			userData: {},
			userImage: undefined,
			title: props.title || "B2B Portal"
		}
	}

	componentWillMount() {
		let loggedInUserData = getUser();
		
		if (loggedInUserData) {
			this.setState({
				loggedIn: true,
				userData: loggedInUserData
			});
		}
	}

	render() {
		const { userData, loggedIn, title, userImage, menuOpen } = this.state;

		var persona = {
			showUnknownPersonaCoin: !loggedIn,
			size: PersonaSize.size40,
			hidePersonaDetails: false,
			showInitialsUntilImageLoads: true,
			text: undefined,
			secondaryText: undefined,
			imageUrl: userImage
		};

		if (loggedIn && userData) {
			if (userData.name) {
				persona.text = userData.name;
			} 
			if (userData.displayableId) {
				persona.secondaryText = userData.displayableId;
			}
		}

		return (
			<header>
				<div class="header__wrapper">
					<a href="/" className="logo">
						<img alt="The Dow Chemical Company" src={Logo} />
					</a>
					<div class="header__wrapper__inner">
						<span class='title'>{title}</span>
						<Persona {...persona} />
					</div>
				</div>

				<div class="menu__wrapper menu__wrapper--right">
					<Menu isOpen={false} right={true} pageWrapId={ "page-wrap" } outerContainerId={ "root" } >
						<h3 class="bm-item" style={{display: 'block', outline: 'none', textAlign: 'center'}}>
							<img alt="The Dow Chemical Company" src={Logo} style={{height: '1.5em'}} />
						</h3>
						<Link to="/" className="menu-item">Home</Link>
						<Link to="/404" className="menu-item">Whoops!</Link>
						<a className="menu-item" onClick={() => logout()}>Logout</a>
					</Menu>
				</div>
			</header>
    	);
  	}
}