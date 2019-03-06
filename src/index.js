import React from 'react';
import { render } from 'react-dom';
//css
import './style/css/bootstrap.min.css';
import './index.css';
//js
import { sampleText } from './sampleText.js';
//marked
import marked  from 'marked';

class App extends React.Component{

	state = {
		text : sampleText
	}

	componentWillMount = () => {
		const localStorageText = localStorage.getItem('text');
		if(localStorageText){
			this.setState({text : localStorageText});
		}
	}

	componentWillUpdate = (nextProps, nextState) => {
		localStorage.setItem('text', nextState.text);
	}

	editText = (event) =>{
		this.setState({text : event.target.value})
	}

	markedText = () =>{
		const text = marked(this.state.text, {sanitize : true});
		return {__html: text}
	}

	render(){

		return(
			<div className="container">
				<div className="row">
					<div className="col-sm-6">
						<textarea 
							value={this.state.text} 
							rows="35" 
							className="form-control"
							onChange={(e) => this.editText(e)}>
						</textarea>
					</div>
					<div className="col-sm-6">
						<div>
							<div dangerouslySetInnerHTML={this.markedText()}></div>
						</div>
					</div>
				</div>
			</div>
		)
	};
}

render(
	<App />,document.querySelector('#root')
);