import React, { Component } from "react";
import api from "../api";
import Cards from "../components/ideaCards";

class IdeasStream extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ideas: [],
			trendingTags: [
				"tech",
				"foodies",
				"app",
				"website",
				"science-fair",
				"lifestyle",
				"fashion"
			],
			currentTerm:
				new URLSearchParams(this.props.location.search).get("s") ?? ""
		};
		console.log(this.state.currentTerm);
	}

	componentDidMount = async () => {
		this.fetchIdeas();
		try {
			await api.renameField("title");
		} catch (e) {
			console.log(e);
		}
	};

	componentDidUpdate() {
		let query = new URLSearchParams(this.props.location.search).get("s") ?? "";
		if (this.state.currentTerm !== query) {
			this.setState(
				{
					currentTerm: query
				},
				function () {
					this.fetchIdeas();
				}.bind(this)
			);
		}
	}

	fetchIdeas = async () => {
		if (this.state.currentTerm.length > 0) {
			try {
				await api.getIdeasByText(this.state.currentTerm).then(ideas => {
					this.setState({
						ideas: ideas.data.data
					});
				});
			} catch (e) {
				this.setState({ ideas: [] });
				console.log(e);
			}
		} else {
			try {
				await api.getLatestIdeas().then(ideas => {
					this.setState({
						ideas: ideas.data.data
					});
				});
			} catch (e) {
				console.log(e);
			}
			try {
				await api.getTrendingTags().then(tags => {
					this.setState({
						trendingTags: tags.data.data
					});
				});
			} catch (e) {
				console.log(e);
			}
		}
		console.log(this.state.ideas);
	};

	render() {
		var pageTitle =
			this.state.currentTerm.length > 0 ? this.state.currentTerm : "Trending";
		let showIdeas = true;
		if (!this.state.ideas.length) {
			showIdeas = false;
		}
		return (
			<div className="container relative flex flex-col justify-between h-full max-w-6xl px-8 mx-auto xl:px-0">
				<h2 className="relative flex items-center self-start inline-block w-auto mb-2 mt-5 text-4xl font-black">
					<span className="absolute inline-block w-full h-4 mt-3 -ml-2 bg-yellow-400" />
					<span className="relative">{pageTitle}</span>
				</h2>
				{/* TODO: implement trending tags */}
				<div className="relative flex items-center mb-6 mt-4 text-4xl  overflow-x-scroll sm:overflow-x-hidden">
					{this.state.trendingTags.map((tag, index) => (
						<button
							id={tag._id}
							className="px-1 mb-1 mr-2 text-gray-900 bg-gray-300 font-black text-sm border border-gray-400 rounded-lg focus:border-0 focus:outline-none"
							onClick={() =>
								this.props.history.push({
									pathname: "/explore",
									search: "?s=" + tag._id
								})
							}
						>
							{"#" + tag._id}
						</button>
					))}
				</div>
				{showIdeas && (
					<div className="flex w-full h-full">
						<div className="w-full">
							<Cards ideas={this.state.ideas} />
						</div>
					</div>
				)}
				{!showIdeas && (
					<div className="flex w-full h-full">
						<div className="w-full text-center">No results Found</div>
					</div>
				)}
			</div>
		);
	}
}

export default IdeasStream;

// const IdeasStream = ({ searchTerm }) => {
// 	const [ideas, setIdeas] = React.useState({});
// 	var [displayIdeas, setLoading] = React.useState(true);

// 	const fetchIdeas = async () => {
// 		if (searchTerm.length === 0) {
// 			await api.getLatestIdeas().then(ideas => {
// 				setIdeas(ideas.data.data);
// 				setLoading(false);
// 			});
// 		} else {
// 			await api.getIdeasByTag([searchTerm]).then(ideas => {
// 				setIdeas(ideas.data.data);
// 				setLoading(false);
// 			});
// 		}
// 	};

// 	var pageTitle = searchTerm.length > 0 ? searchTerm : "Trending";
// 	if (!ideas.length) {
// 		setLoading(false);
// 	}

// 	return (
// 		<div>
// 			{displayIdeas && (
// 				<div className="container relative flex flex-col justify-between h-full max-w-6xl px-8 mx-auto xl:px-0">
// 					<h2 className="relative flex items-center self-start inline-block w-auto mb-10 mt-5 text-4xl font-black">
// 						<span className="absolute inline-block w-full h-4 mt-3 -ml-2 bg-yellow-400" />
// 						<span className="relative">{pageTitle}</span>
// 					</h2>
// 					<div className="flex w-full h-full">
// 						<div className="w-full">
// 							<Cards ideas={ideas} />
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// };
