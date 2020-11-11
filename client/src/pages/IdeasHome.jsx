import React, { Component } from "react";

import api from "../api";

class IdeasAccordian extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ideas: [],
			columns: [],
			isLoading: false
		};
	}

	componentDidMount = async () => {
		this.setState({ isLoading: true });

		await api.getAllIdeas().then(ideas => {
			this.setState({
				ideas: ideas.data.data,
				isLoading: false
			});
		});
	};

	render() {
		const { ideas, isLoading } = this.state;

		// const columns = [
		// 	{
		// 		Header: "ID",
		// 		accessor: "_id",
		// 		filterable: true
		// 	},
		// 	{
		// 		Header: "Name",
		// 		accessor: "name",
		// 		filterable: true
		// 	},
		// 	{
		// 		Header: "Description",
		// 		accessor: "description",
		// 		filterable: true
		// 	},
		// 	{
		// 		Header: "Tags",
		// 		accessor: "tags",
		// 		filterable: true,
		// 		Cell: props => <span>{props.value.join(" / ")}</span>
		// 	}
		// ];

		let showTable = true;
		if (!ideas.length) {
			showTable = false;
		}

		return (
			<Wrapper>
				{showTable && (
					<Accordion defaultActiveKey="0">
						{ideas.map((idea, index) => (
							<Card>
								<Accordion.Toggle as={Card.Header} eventKey={index.toString()}>
									<h5 className="font-weight-sb">{idea.name}</h5>
									<h5>
										{idea.tags.map((tag, index) => (
											<Badge
												pill
												variant="secondary"
												className="mr-1 font-weight-sb"
											>
												{tag}
											</Badge>
										))}
									</h5>
								</Accordion.Toggle>
								<Accordion.Collapse eventKey={index.toString()}>
									<Card.Body>{idea.description}</Card.Body>
								</Accordion.Collapse>
							</Card>
						))}
					</Accordion>
				)}
			</Wrapper>
		);
	}
}

export default IdeasAccordian;
