import React, { Component } from "react";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

import en from "javascript-time-ago/locale/en";

function dateFromObjectId(objectId) {
	return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
}

const IdeaCard = ({ idea }) => {
	// console.log(idea);
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
					<div className="flex items-center -mt-1 justify-between">
						<h3 className="my-2 text-lg font-bold text-gray-800 inline">
							{idea.name}
						</h3>
						<div>
							<span
								className={`mt-1 mb-1 text-xs font-medium inline uppercase text-${rColor}`}
							>
								{/* TODO: real upvote system */}
								{Math.floor(Math.random(0, 10) * 10)}
							</span>{" "}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 320 512"
								className="w-5 h-5  text-gray-600 fill-current inline"
							>
								<path d="M295.973 160H180.572L215.19 30.184C219.25 14.956 207.756 0 192 0H56C43.971 0 33.8 8.905 32.211 20.828l-31.996 240C-1.704 275.217 9.504 288 24.004 288h118.701L96.646 482.466C93.05 497.649 104.659 512 119.992 512c8.35 0 16.376-4.374 20.778-11.978l175.973-303.997c9.244-15.967-2.288-36.025-20.77-36.025z" />
							</svg>
						</div>
					</div>
					<span
						className={`mt-1 mb-1 text-xs font-medium  uppercase text-${rColor}`}
					>
						<ReactTimeAgo date={dateFromObjectId(idea._id)} />
					</span>
					{/* share svg */}
					{/* <span className="inline">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
								className="w-5 h-5  text-gray-600 fill-current inline mr-2"
							>
								<path
									d="M503.691 189.836L327.687 37.851C312.281 24.546 288 35.347 288 56.015v80.053C127.371 137.907 0 170.1 0 322.326c0 61.441 39.581 122.309 83.333 154.132 13.653 9.931 33.111-2.533 28.077-18.631C66.066 312.814 132.917 274.316 288 272.085V360c0 20.7 24.3 31.453 39.687 18.164l176.004-152c11.071-9.562 11.086-26.753 0-36.328z"
									// fill="#1A1A1A"
								/>
							</svg>
						</span> */}

					<p className="mb-2 text-gray-600">{idea.description}</p>

					<h5 className="flex-wrap flex">
						{idea.tags.map((tag, index) => (
							// inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 mt-4
							<span className="px-1 mb-1 mr-1 text-gray-900 bg-gray-300 text-sm border border-gray-400 rounded-lg">
								{"#" + tag}
							</span>
						))}
						{/* {idea.tags.map((tag, index) => (
							<div className="text-sm px-3 bg-gray-200 text-gray-800 rounded-full m-1">
								{"#" + tag}
							</div>
						))} */}
					</h5>
				</div>
			</div>
		</div>
	);
};

const Cards = ({ ideas }) => {
	// console.log(ideas);
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

export default Cards;
