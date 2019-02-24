import React from 'react';
import { render } from 'react-dom';
//CSS
import './style/css/bootstrap.min.css';
import './index.css';

import { sampleText } from './sampleText';
import marked from 'marked';

class App extends React.Component{

	state = {
		text: sampleText
	};

	componentWillMount(){
		const localStorageText = localStorage.getItem('text');
		if(localStorageText){
			this.setState({text:localStorageText});
		}
	}

	componentWillUpdate(nextprops, nextState){
		localStorage.setItem('text', nextState.text);
	}

	editText = function(event){
		const text = event.target.value;
		this.setState({text});
	}

	renderText = function(text){
		const renderText = marked(text, {sanitize : true});
		return {__html: renderText};
	}

	render(){
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-6">
						<textarea rows="35" className="form-control" value={this.state.text} onChange={(e) => this.editText(e)}>
						
						</textarea>
					</div>
					<div className="col-sm-6">
						<div dangerouslySetInnerHTML={this.renderText(this.state.text)}/>
					</div>
				</div>
			</div>
		)
	}
}

render(
	<App />,
	document.getElementById('root')
);

