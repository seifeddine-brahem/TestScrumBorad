import React from 'react';
import Column from './Column';
import axios from 'axios';
class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = ({
			isLoading: true,
			projects: [],
			data: [],
			intervalIsSet: false,
			draggedOverCol: 0,
		});
		this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
		this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
		this.columns = [
			{name: 'Story', state: 1},
			{name: 'Not Started', state: 2},
			{name: 'In Progress', state: 3},
			{name: 'Done', state: 4},
		];
	}
	getDataFromDb = () => {
		const req = new Request('http://localhost:3080/cards', {
			method: 'GET',
			cache: 'default'
		  });
		  fetch(req).then(response =>{
			return response.json();
		  }).then(data =>{
		//	console.log(data); //REF 1;
			this.setState({
			  projects: data
			});
		  }).catch(err => {
			console.log("ERROR: " + err);
		  })
		  
	  };

	  updateDB = (id, state) => {
		//	let objIdToUpdate = null;
			parseInt(id);

		
			axios.post('http://localhost:3080/updatecards', {
				id: id,
				state: state,
			}).then(res=>console.log("id: "+id+" state : "+state )).catch(err => {
				console.log("ERROR: " + err);
				});
	  };

	componentDidMount() {
		//this.setState({ projects: projectList, isLoading: false });
		
		if (!this.state.intervalIsSet) {
			this.getDataFromDb();
			let interval = setInterval(this.getDataFromDb, 1000);
			this.setState({ intervalIsSet: interval, isLoading: false });
		}
	}

	componentWillUnmount() {
		if (this.state.intervalIsSet) {
		clearInterval(this.state.intervalIsSet);
		this.setState({ intervalIsSet: null });
		}
	}



	//this is called when a card is dragged over a column (called by column)
	handleOnDragEnter(e, stageValue) {
		console.log(stageValue);
		this.setState({ draggedOverCol: stageValue });
	}

	//this is called when a  card dropped over a column (called by card)
	handleOnDragEnd(e, project) {
		console.log(project);
		project.state = this.state.draggedOverCol;
		this.updateDB(project.id,this.state.draggedOverCol);
		const updatedProjects = this.state.projects.slice(0);
		updatedProjects.find((projectObject) => {return projectObject.name === project.name;}).stage = this.state.draggedOverCol;
		this.setState({ projects: updatedProjects });
	}

	render() {
		if (this.state.isLoading) {
			return (<h3>Loading...</h3>);
		}

		return  (	
			<div>
						{this.columns.map((column) => {
							return (
								<Column
									name={ column.name }
									state={ column.state }
									projects={ this.state.projects.filter((project) => {return parseInt(project.state, 10) === column.state;}) }
									onDragEnter={ this.handleOnDragEnter }
									onDragEnd={ this.handleOnDragEnd }
									key={ column.state }
								/>
							);
						})}
			</div>
		);
	}
}
export default Board ;