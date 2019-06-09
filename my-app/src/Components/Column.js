import React from 'react';
import Card from './Card';
class Column extends React.Component {
	generateCards() {
		return this.props.projects.slice(0).map((project) => {
			return (
				<Card
					project={project}
					key={project.name}
					onDragEnd={this.props.onDragEnd}
				/>
			);
		});
	}
	render() {
		const columnStyle = {
			'display': 'inline-block',
			'verticalAlign': 'top',
			'marginRight': '5px',
			'marginBottom': '5px',
			'paddingLeft': '5px',
			'paddingTop': '0px',
			'width': '24%',
			'textAlign': 'center',
			'backgroundColor': '#000',
		};
		const ColumnTitle ={
			'color':'#fff',
		}
		return  (
      <div
				style={columnStyle}
				onDragEnter={(e) => {this.props.onDragEnter(e, this.props.state);}}
			>
				<h3 style={ColumnTitle}> {this.props.name} </h3>
				{this.generateCards()}
				<br/>
      </div>);
	}
}
export default Column ;