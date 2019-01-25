//React 
import React, {Component, Fragment} from 'react';
import {
  BrowserRouter,
  NavLink,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

//Pages
import Home from 'Pages/Home';
import GenericNotFound from 'Pages/404';

//Components
import Header from "Components/layout/header"
import Footer from "Components/layout/footer"

export class Router extends Component {
	render() {
		return (
			<BrowserRouter forceRefresh={false}>
				<Fragment>
					<Header />
        			<div class="page">
        				<Switch>
							<Route exact path="/" component={Home} />
							<Route component={GenericNotFound} />
						</Switch>
					</div>
					<Footer />
	        	</Fragment>
      		</BrowserRouter>
    	);
  	}
}