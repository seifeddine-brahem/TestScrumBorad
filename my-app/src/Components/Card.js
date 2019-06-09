import React from 'react';
class Card extends React.Component {
	render() {
		const cardStyle = {
			'backgroundColor': '#f9f7f7',
			'paddingLeft': '0px',
			'paddingTop': '5px',
			'paddingBottom': '5px',
			'marginLeft': '0px',
			'marginRight': '5px',
			'marginBottom': '5px',
		};

		return (
			<div
				style={cardStyle}
				draggable={true}
				onDragEnd={(e) => {this.props.onDragEnd(e, this.props.project);}}
			>
				<div><h4>{this.props.project.name}</h4></div>
			</div>
		);
	}
}
export default Card ;