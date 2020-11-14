import React, { Component } from "react";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en";
import api from "../api";

class IdeasStream extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ideas: [],
			isLoading: false
		};
	}

	componentDidMount = async () => {
		this.setState({ isLoading: true });

		// await api.getAllIdeas().then(ideas => {
		// 	this.setState({
		// 		ideas: ideas.data.data,
		// 		isLoading: false
		// 	});
		// });
		await api.getIdeasByTag(["todd-chavez"]).then(ideas => {
			this.setState({
				ideas: ideas.data.data,
				isLoading: false
			});
		});
	};

	dateFromObjectId = function (objectId) {
		return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
	};

	generateIdeaCards(ideas) {
		var cards;
		for (var i = 0; i < ideas.length; i += 3) {
			let idea_cards;
			for (var j = i; j < i + 3; j++) {
				if (j < ideas.length) {
					idea_cards = [idea_cards, this.generateIdeaCard(ideas[j])];
				}
			}
			cards = [
				cards,
				<div className="flex flex-col w-full xl:mb-8 lg:mb-8 md:mb-8 sm:mb-0 sm:flex-row">
					{idea_cards}
				</div>
			];
		}

		return cards;
	}

	generateIdeaCard(idea) {
		TimeAgo.addLocale(en);

		let rColor;
		switch (Math.floor(Math.random() * 5) + 1) {
			case 1:
				rColor = "indigo-500";
				break;
			case 2:
				rColor = "purple-500";
				break;
			case 3:
				rColor = "blue-400";
				break;
			case 4:
				rColor = "teal-500";
				break;
			case 5:
				rColor = "indigo-500";
				break;
			default:
				rColor = "yellow-400";
		}
		return (
			<div className="w-full mb-10 sm:mb-0 sm:w-1/2">
				<div className="relative ml-0 mr-0 sm:mr-10">
					<span
						className={`absolute top-0 left-0 w-full h-full mt-1 ml-1 rounded-lg bg-${rColor}`}
					/>
					<div
						className={`relative p-5 bg-white border-2 rounded-lg border-${rColor}`}
					>
						<div className="flex items-center -mt-1">
							<h3 className="my-2 text-lg font-bold text-gray-800">
								{idea.name}
							</h3>
						</div>
						<p
							className={`mt-1 mb-1 text-xs font-medium uppercase text-${rColor}`}
						>
							<ReactTimeAgo date={this.dateFromObjectId(idea._id)} />
						</p>
						<p className="mb-2 text-gray-600">{idea.description}</p>
						<h5 class="flex-wrap flex">
							{idea.tags.map((tag, index) => (
								<span class="px-1 mb-1 mr-1 text-gray-900 bg-gray-300 text-sm border border-gray-500 rounded-lg">
									{"#" + tag}
								</span>
							))}
						</h5>
					</div>
				</div>
			</div>
		);
	}

	render() {
		const { ideas, isLoading } = this.state;

		let showIdeas = true;
		if (!ideas.length) {
			showIdeas = false;
		}

		return (
			<div>
				{showIdeas && (
					<div className="container relative flex flex-col justify-between h-full max-w-6xl px-8 mx-auto xl:px-0">
						<h2 className="relative flex items-center self-start inline-block w-auto mb-10 mt-5 text-4xl font-black">
							<span className="absolute inline-block w-full h-4 mt-3 -ml-2 bg-yellow-400" />
							<span className="relative">Trending</span>
						</h2>
						<div className="flex w-full h-full">
							<div className="w-full">{this.generateIdeaCards(ideas)}</div>
						</div>
					</div>
				)}
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

export default IdeasStream;
