import React, { Component } from "react";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en";

function dateFromObjectId(objectId) {
	return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
}

const IdeaCard = ({ idea }) => {
	console.log(idea);
	if (!idea) {
		return null;
	}
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
						<ReactTimeAgo date={dateFromObjectId(idea._id)} />
					</p>
					<p className="mb-2 text-gray-600">{idea.description}</p>
					<h5 className="flex-wrap flex">
						{idea.tags.map((tag, index) => (
							<span className="px-1 mb-1 mr-1 text-gray-900 bg-gray-300 text-sm border border-gray-500 rounded-lg">
								{"#" + tag}
							</span>
						))}
					</h5>
				</div>
			</div>
		</div>
	);
};

const Cards = ({ ideas }) => {
	// const { ideas } = this.props.ideas;
	console.log(ideas);
	if (!ideas) {
		return null;
	}
	var cards;
	for (var i = 0; i < ideas.length; i += 3) {
		let idea_cards;
		for (var j = i; j < i + 3; j++) {
			if (j < ideas.length) {
				idea_cards = [idea_cards, <IdeaCard idea={ideas[j]} />];
			}
		}
		cards = [
			cards,
			<div
				className="flex flex-col w-full xl:mb-8 lg:mb-8 md:mb-8 sm:mb-0 sm:flex-row"
				key={i}
			>
				{idea_cards}
			</div>
		];
	}

	return cards;
};

// class Cards extends Component {
// 	// constructor(props) {
// 	// 	super(props);
// 	// 	this.state = {
// 	// 		ideas: this.props.ideas
// 	// 	};
// 	// }

// 	// componentWillReceiveProps(props) {
// 	// 	this.setState({ ideas: props.data });
// 	// }

// 	// state = {
// 	// 	ideas: this.props.ideas
// 	// };

// 	// componentDidUpdate(prevProps) {
// 	// 	if (prevProps.ideas !== this.props.ideas) {
// 	// 		this.setState({ ideas: this.props.ideas });
// 	// 	}
// 	// }

// 	dateFromObjectId = function (objectId) {
// 		return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
// 	};

// 	generateIdeaCard(idea) {
// 		TimeAgo.addLocale(en);

// 		let rColor;
// 		switch (Math.floor(Math.random() * 5) + 1) {
// 			case 1:
// 				rColor = "indigo-500";
// 				break;
// 			case 2:
// 				rColor = "purple-500";
// 				break;
// 			case 3:
// 				rColor = "blue-400";
// 				break;
// 			case 4:
// 				rColor = "teal-500";
// 				break;
// 			case 5:
// 				rColor = "indigo-500";
// 				break;
// 			default:
// 				rColor = "yellow-400";
// 		}
// 		return (
// 			<div className="w-full mb-10 sm:mb-0 sm:w-1/2">
// 				<div className="relative ml-0 mr-0 sm:mr-10">
// 					<span
// 						className={`absolute top-0 left-0 w-full h-full mt-1 ml-1 rounded-lg bg-${rColor}`}
// 					/>
// 					<div
// 						className={`relative p-5 bg-white border-2 rounded-lg border-${rColor}`}
// 					>
// 						<div className="flex items-center -mt-1">
// 							<h3 className="my-2 text-lg font-bold text-gray-800">
// 								{idea.name}
// 							</h3>
// 						</div>
// 						<p
// 							className={`mt-1 mb-1 text-xs font-medium uppercase text-${rColor}`}
// 						>
// 							<ReactTimeAgo date={this.dateFromObjectId(idea._id)} />
// 						</p>
// 						<p className="mb-2 text-gray-600">{idea.description}</p>
// 						<h5 className="flex-wrap flex">
// 							{idea.tags.map((tag, index) => (
// 								<span className="px-1 mb-1 mr-1 text-gray-900 bg-gray-300 text-sm border border-gray-500 rounded-lg">
// 									{"#" + tag}
// 								</span>
// 							))}
// 						</h5>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}

// 	render() {
// 		const { ideas } = this.props.ideas;
// 		console.log(ideas);
// 		if (!ideas) {
// 			return null;
// 		}
// 		var cards;
// 		for (var i = 0; i < ideas.length; i += 3) {
// 			let idea_cards;
// 			for (var j = i; j < i + 3; j++) {
// 				if (j < ideas.length) {
// 					idea_cards = [idea_cards, this.generateIdeaCard(ideas[j])];
// 				}
// 			}
// 			cards = [
// 				cards,
// 				<div
// 					className="flex flex-col w-full xl:mb-8 lg:mb-8 md:mb-8 sm:mb-0 sm:flex-row"
// 					key={i}
// 				>
// 					{idea_cards}
// 				</div>
// 			];
// 		}

// 		return cards;
// 	}
// }

export default Cards;
