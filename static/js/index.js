"use strict";

//Config
import webConfig from "Config/web.config"; //If needed for WebApp, not needed for static storage

//Styles
import css from "Styles/index.scss"

//Custom scripts
import "Scripts/helpers/classList"
import "Scripts/helpers/fetch"
import "Scripts/helpers/arrayFrom";
import "Scripts/helpers/stringIncludes";
import "Scripts/helpers/objectIncludes";
import "Scripts/helpers/requestAnimationFrame";
import "@babel/polyfill";
import ES6Promise from "es6-promise";
ES6Promise.polyfill();

//React
import React from "react";
import {render} from "react-dom"
import { BrowserRouter } from "react-router-dom"

//Fabric
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
initializeIcons();

import { loadTheme } from 'office-ui-fabric-react/lib/Styling';
loadTheme({
	palette: {
    	themePrimary: "#e80033",
    	themeSecondary: "#218bb5",
    	themeTertiary: "#EA824B",
    	themeDark: "#e80033",
    	themeDarkAlt: "#b9111a",
    	blue: "#218bb5"
  	},
  	semanticColors: {
  		linkHovered: "#b9111a",
  		primaryButtonBackgroundHovered: "#b9111a",
  		primaryButtonBackgroundPressed: "#b9111a",
      errorText: "#e80033",
      warningText: "#ff6700"
  	}
});


//Parts
import {Router} from "./router";
import {runWithMsal} from 'Components/authentication/msal/react-msal';
// import { runWithAdal } from 'react-adal';

runWithMsal(() => {
	render(<Router />, document.getElementById('root'));
}, false);