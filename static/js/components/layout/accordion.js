//React
import React, {Component, Fragment} from "react";

//Components
export default class Accordion extends Component {
	constructor(props) {
		super(props)
		this.state = {
      		active: this.props.active || false
    	};
	};
	
	_onClick(event) {
		this.setState({
			active: !this.state.active
		})
	};

    render() {
    	const { active } = this.state;

    	return (
    		<Fragment>
    			<button onClick={this._onClick.bind(this)} class={"accordion" + `${(active ? ' active' : '')}`}>{this.props.title}</button>
    			{active 
    				? <div class="accordion__panel show">{this.props.children}</div>
    				: undefined
    			}
    		</Fragment>
    	);
    }
}