import React from "react";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import LinesEllipsis from "react-lines-ellipsis";
import { useCookies } from "react-cookie";
import en from "javascript-time-ago/locale/en";
import apis from "../api";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Linkify from "react-linkify";
import GitalkComponent from "gitalk/dist/gitalk-component";
import "gitalk/dist/gitalk.css";

function dateFromObjectId(objectId) {
	return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
}

const IdeaCard = ({ idea }) => {
	const [modalOpen, setModal] = React.useState(false);
	const [s_count, setStormCount] = React.useState(idea.s_count);
	const [cookies, setCookie] = useCookies(["s_counted"], "", {
		expires: Date(8640000000000000)
	});
	const [s_counted, setStormCounted] = React.useState(
		cookies.s_counted?.split("|").includes(idea._id) ?? false
	);
	const handleStormClick = async () => {
		var s_arr = cookies.s_counted?.split("|") ?? [];
		if (!s_counted) {
			await apis
				.updateStormcountById(idea._id, { s_count: s_count + 1 })
				.then(res => {
					setStormCount(s_count + 1);
				});
			setStormCounted(true);
			s_arr.push(idea._id);
		} else {
			await apis
				.updateStormcountById(idea._id, { s_count: s_count - 1 })
				.then(res => {
					setStormCount(s_count - 1);
				});
			setStormCounted(false);
			s_arr.splice(s_arr.indexOf(idea._id), 1);
		}
		setCookie(
			"s_counted",
			s_arr.join("|"),
			{ path: "/" },
			{ expires: Date(8640000000000000) }
		);
		// console.log(cookies.s_counted);
	};

	if (!idea) {
		return null;
	}
	TimeAgo.addLocale(en);

	let rColor;
	switch (Math.floor(Math.random() * 4) + 1) {
		case 1:
			rColor = "indigo-400";
			break;
		case 2:
			rColor = "indigo-500";
			break;
		case 3:
			rColor = "indigo-600";
			break;
		case 4:
			rColor = "indigo-300";
			break;
		case 5:
			rColor = "indigo-700";
			break;
		default:
			rColor = "indigo-500";
	}
	return (
		<>
			<div
				className="md:w-1/3 mb-10 sm:mb-0 sm:w-1/2"
				key={idea.title}
				onClick={() => setModal(true)}
			>
				<div className="relative ml-0 mr-0 sm:mr-10">
					<span
						className={`absolute top-0 left-0 w-full h-full mt-1 ml-1 rounded-lg bg-${rColor}`}
					/>
					<div
						className={`relative p-5 bg-white border-2 rounded-lg border-${rColor}`}
					>
						<div className="flex items-center -mt-1 justify-between">
							<h3 className="my-2 text-lg font-bold text-gray-800 inline flex-initial">
								{idea.title}
							</h3>
							<div className="inline-block flex-none self-start mt-2">
								<span
									className={`mt-1 mb-1 ml-1 text-xs font-medium inline uppercase text-${rColor}`}
								>
									{s_count}
								</span>{" "}
								<button
									onClick={handleStormClick}
									className="focus:border-0 focus:outline-none"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 320 512"
										className={`w-5 h-5 fill-current inline text-${
											s_counted ? "yellow-500" : "indigo-600"
										}`}
									>
										<path d="M295.973 160H180.572L215.19 30.184C219.25 14.956 207.756 0 192 0H56C43.971 0 33.8 8.905 32.211 20.828l-31.996 240C-1.704 275.217 9.504 288 24.004 288h118.701L96.646 482.466C93.05 497.649 104.659 512 119.992 512c8.35 0 16.376-4.374 20.778-11.978l175.973-303.997c9.244-15.967-2.288-36.025-20.77-36.025z" />
									</svg>
								</button>
							</div>
						</div>

						<span
							className={`mt-1 mb-1 text-xs font-medium  uppercase text-${rColor}`}
						>
							<ReactTimeAgo date={dateFromObjectId(idea._id)} />
						</span>
						<Linkify>
							<LinesEllipsis
								text={idea.description}
								maxLine="8"
								ellipsis="..."
								trimRight
								basedOn="letters"
								className="mb-2 text-gray-600 whitespace-normal break-words "
							/>
						</Linkify>
						<h5 className="flex-wrap flex">
							{idea.tags.map((tag, index) => (
								<span
									className="px-1 mb-1 mr-1 text-gray-900 bg-gray-300 text-sm border border-gray-400 rounded-lg"
									key={"tag-" + tag}
								>
									{"#" + tag}
								</span>
							))}
						</h5>
					</div>
				</div>
			</div>
			{/* modal */}
			<Modal
				open={modalOpen}
				onClose={() => setModal(false)}
				showCloseIcon={false}
				styles={{
					modal: { borderRadius: "0.5rem", overflow: "hidden", padding: 0 }
				}}
				classNames={{
					overlay: `bg-opacity-75 bg-${rColor}`,
					modal: "customModal"
				}}
			>
				<div className="relative ml-0 mr-0">
					<div className={`relative p-5 bg-white rounded-lg `}>
						{" "}
						<div className="flex items-center -mt-1 justify-between">
							<h3 className="my-2 text-lg font-bold text-gray-800 inline flex-initial">
								{idea.title}
							</h3>
							<div className="inline-block flex-none self-start mt-2">
								{/* <ShareBtn
									url={"https://ideastorm.app/explore/" + idea.id}
									text={"Check out this cool idea: " + idea.title}
									className="ib"
									displayText="Share"
								/> */}
								{/* share svg */}
								{/* <span className="inline mr-1">
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
								<span
									className={`mt-1 mb-1 ml-1 text-xs font-medium inline uppercase text-${rColor}`}
								>
									{s_count}
								</span>{" "}
								<button
									onClick={handleStormClick}
									className="focus:border-0 focus:outline-none"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 320 512"
										className={`w-5 h-5 fill-current inline text-${
											s_counted ? "yellow-500" : "indigo-600"
										}`}
									>
										<path d="M295.973 160H180.572L215.19 30.184C219.25 14.956 207.756 0 192 0H56C43.971 0 33.8 8.905 32.211 20.828l-31.996 240C-1.704 275.217 9.504 288 24.004 288h118.701L96.646 482.466C93.05 497.649 104.659 512 119.992 512c8.35 0 16.376-4.374 20.778-11.978l175.973-303.997c9.244-15.967-2.288-36.025-20.77-36.025z" />
									</svg>
								</button>
							</div>
						</div>
						<span
							className={`mt-1 mb-5 text-xs font-medium  uppercase text-${rColor}`}
						>
							<ReactTimeAgo date={dateFromObjectId(idea._id)} />
						</span>
						<Linkify>
							<div className="mb-5 mt-3 text-gray-600 ">{idea.description}</div>
						</Linkify>
						<h5 className="flex-wrap flex">
							{idea.tags.map((tag, index) => (
								<span
									className="px-1 mb-1 mr-1 text-gray-900 bg-gray-300 text-sm border border-gray-400 rounded-lg"
									key={"tag-" + tag}
								>
									{"#" + tag}
								</span>
							))}
						</h5>
					</div>
				</div>
				<div className="ml-3 mr-3 mb-2">
					{modalOpen && (
						<GitalkComponent
							options={{
								clientID: process.env.REACT_APP_GIT_OAUTH,
								clientSecret: process.env.REACT_APP_GIT_CLIENT_SECRET,
								repo: "IdeastormComments",
								owner: "GoldinGuy",
								admin: "GoldinGuy",
								id: idea._id.toString().substring(0, 50),
								labels: idea.tags,
								title: idea.title,

								body: idea.description
							}}
						/>
					)}
				</div>
			</Modal>
		</>
	);
};

const Cards = ({ ideas }) => {
	if (!ideas || ideas.length < 1) {
		return null;
	}
	var cards;
	for (var i = 0; i < ideas.length; i += 3) {
		let idea_cards;
		for (var j = i; j < i + 3; j++) {
			if (j < ideas.length) {
				idea_cards = [
					idea_cards,
					<IdeaCard idea={ideas[j]} key={`card-${i + j}`} />
				];
			}
		}
		cards = [
			cards,
			<div
				className="flex flex-col w-full xl:mb-8 lg:mb-8 md:mb-8 sm:mb-0 sm:flex-row"
				key={"row-" + i}
			>
				{idea_cards}
			</div>
		];
	}

	return cards;
};

const IdeasStream = ({ ideas, pageTitle, topTags, history }) => {
	// console.log(ideas);
	return (
		<div className="container relative flex flex-col justify-between h-full max-w-6xl px-8 mx-auto xl:px-0">
			<div className="relative flex items-center self-start w-auto mb-1 mt-2   font-black">
				<h2
					className="relative flex items-center self-start w-auto  text-4xl font-black mr-4"
					key="header"
				>
					<span className="absolute inline-block w-full h-4 mt-3 -ml-2 bg-yellow-400" />
					<span className="relative">{pageTitle}</span>
				</h2>
			</div>
			{/* TAGS */}
			<div
				className="relative flex items-center mb-8 mt-4 text-4xl max-w-none overflow-x-scroll sm:overflow-x-hidden"
				key="tags"
			>
				{topTags.map((tag, index) => (
					<button
						key={tag}
						className="px-1 mb-1 mr-2 flex-none text-gray-900 bg-gray-300 font-black text-sm border border-gray-400 rounded-lg focus:border-0 focus:outline-none"
						onClick={() =>
							history.push({
								pathname: "/search",
								search: "?q=" + tag
							})
						}
					>
						{"#" + tag}
					</button>
				))}
			</div>
			{ideas && ideas.length > 0 && (
				<div className="flex w-full h-full" key="idea-cards">
					<div className="w-full">
						<Cards ideas={ideas} />
					</div>
				</div>
			)}
			{pageTitle !== "Trending" && pageTitle !== "Latest" && ideas.length < 1 && (
				<div className="flex w-full h-full" key="404">
					<div className="w-full h-full  text-center mt-20 font-bold">
						<span className="bold h-full text-purple-500 text-xl">
							404: Looks like nobody else has thought of anything yet...
						</span>
						<div className="relative flex items-center h-full flex-col justify-center w-full mt-12 sm:mb-0 sm:pr-10">
							<button
								type="button"
								className="relative "
								onClick={() =>
									history.push({
										pathname: "/create"
									})
								}
							>
								<span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-black rounded  px-12" />
								<span className="relative inline-block w-full h-full px-12  py-3 text-md font-bold transition duration-100 bg-white border-2 border-black rounded fold-bold hover:bg-indigo-500 hover:text-white">
									BE THE FIRST!
								</span>
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default IdeasStream;

export { IdeaCard, Cards };
