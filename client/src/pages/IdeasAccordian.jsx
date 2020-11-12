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

	generateIdeaCards(ideas) {
		for (var i = 0; i < ideas.length - 1; i += 3) {
			var idea_cards;
			for (var j = i; j < 3; j++) {
				if (j < ideas.length - 1) {
					idea_cards = [idea_cards, this.generateIdeaCard(ideas[j])];
				}
			}
			return (
				<div className="flex flex-col w-full mb-8 sm:flex-row">
					{idea_cards}
				</div>
			);
		}
	}

	generateIdeaCard(idea) {
		return (
			<div className="w-full mb-10 sm:mb-0 sm:w-1/2">
				<div className="relative ml-0 mr-0 sm:mr-10">
					<span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg" />
					<div className="relative p-5 bg-white border-2 border-indigo-500 rounded-lg">
						<div className="flex items-center -mt-1">
							<h3 className="my-2  text-lg font-bold text-gray-800">
								{idea.name}
							</h3>
						</div>
						<p className="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">
							SHARED 5 Days ago
						</p>
						<p className="mb-2 text-gray-600">{idea.description}</p>
					</div>
				</div>
			</div>
		);
	}

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
			<div className="container relative flex flex-col justify-between h-full max-w-6xl px-8 mx-auto xl:px-0">
				<h2 className="relative flex items-center self-start inline-block w-auto mb-20 text-4xl font-black">
					<span className="absolute inline-block w-full h-4 mt-3 -ml-2 bg-yellow-400" />
					<span className="relative">Trending</span>
				</h2>
				<div className="flex w-full h-full">
					<div className="w-full">{this.generateIdeaCards(ideas)}</div>
				</div>
			</div>

			/*	 <Wrapper>
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
				)} //{" "}
			{/* </Wrapper> */
		);
	}
}

export default IdeasAccordian;
