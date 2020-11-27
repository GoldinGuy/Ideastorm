import React, { Component } from "react";
import api from "../api";
import IdeasStream from "../components/idea_card_components";
import InfiniteScroll from "react-infinite-scroll-component";
import BeatLoader from "react-spinners/BeatLoader";

class TrendingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ideas: [],
			loadMore: true,
			page: 0,
			topTags: [
				// { _id: "tech" },
				// { _id: "foodies" },
				// { _id: "app" },
				// { _id: "tech" },
				// { _id: "website" },
				// { _id: "science-fair" },
				// { _id: "lifestyle" },
				// { _id: "fashion" }
			]
		};
	}

	componentDidMount = async () => {
		this.fetchIdeas();
		try {
			await api.getTrendingTags().then(tags => {
				this.setState({
					topTags: tags.data.data.splice(0, 8)
				});
				// console.log(this.state.topTags);
			});
		} catch (e) {
			console.log(e);
		}
	};

	fetchIdeas = async () => {
		let nextPage = this.state.page + 1;
		this.setState({ page: nextPage });
		await api
			.getTrendingIdeas(nextPage)
			.then(ideas => {
				this.setState({
					ideas: [...this.state.ideas, ...ideas.data.data],
					loadMore:
						(this.state.ideas.length % 36 === 0 ? false : true) &&
						(ideas.length < 18 ? false : true)
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	// componentDidUpdate = async () => {};

	render() {
		return (
			<InfiniteScroll
				dataLength={this.state.ideas.length}
				next={this.fetchIdeas}
				hasMore={this.state.loadMore}
				loader={
					<div className="h-full overflow-y-hidden">
						<BeatLoader
							css={`
								display: block;
								margin: 0 auto;
								border-color: red;
								height: 100%;
								text-align: center;
							`}
							size={20}
							color={"#123abc"}
							loading={true}
						/>
					</div>
					// 	<div class="flex  justify-center min-h-screen p-5 min-w-screen">
					// 	<div class="flex space-x-2 animate-pulse">
					// 		<div class="w-3 h-3 bg-gray-500 rounded-full"></div>
					// 		<div class="w-3 h-3 bg-gray-500 rounded-full"></div>
					// 		<div class="w-3 h-3 bg-gray-500 rounded-full"></div>
					// 	</div>
					// </div>
				}
				className="h-full overflow-y-hidden"
				endMessage={
					this.state.ideas.length % 18 === 0 && (
						<div className="relative h-full flex items-center flex-col justify-center w-full mt-12 sm:mb-0 sm:pr-10 overflow-y-hidden">
							<button
								type="button"
								className="relative "
								onClick={() =>
									this.setState({
										loadMore: true
									})
								}
							>
								<span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-black rounded  px-12" />
								<span className="relative inline-block w-full h-full px-12  py-3 text-md font-bold transition duration-100 bg-white border-2 border-black rounded fold-bold hover:bg-indigo-500 hover:text-white">
									SEE MORE IDEAS!
								</span>
							</button>
						</div>
					)
				}
			>
				<IdeasStream
					ideas={this.state.ideas}
					pageTitle={"Trending"}
					topTags={this.state.topTags}
					history={this.props.history}
				/>
			</InfiniteScroll>
		);
	}
}

export default TrendingPage;
