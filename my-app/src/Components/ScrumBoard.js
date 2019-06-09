import React from 'react';
import Board from'./Board';
class ScrumBoard extends React.Component {
	render(){
		const style = {
			'padding': '20px',
			'paddingTop': '5px',
		};
    
		return(
      <div style={ style }>
        <h1>Scrum Board Test</h1>
				<Board/>
      </div>
		);
	}
}
export default ScrumBoard ;