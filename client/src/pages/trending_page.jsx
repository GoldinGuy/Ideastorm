import React, { Component } from "react";
import api from "../api";
import IdeasStream from "../components/idea_card_components";
import InfiniteScroll from "react-infinite-scroll-component";

class TrendingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ideas: [],
			loadMore: true,
			topTags: [
				{ _id: "tech" },
				{ _id: "foodies" },
				{ _id: "app" },
				{ _id: "tech" },
				{ _id: "website" },
				{ _id: "science-fair" },
				{ _id: "lifestyle" },
				{ _id: "fashion" }
			]
		};
	}

	componentDidMount = async () => {
		this.fetchIdeas();
		try {
			await api.getTrendingTags().then(tags => {
				this.setState({
					topTags: tags.data.data.splice(0, 7)
				});
			});
		} catch (e) {
			console.log(e);
		}
	};

	fetchIdeas = async () => {
		console.log("fetching");
		await api
			.getTrendingIdeas(this.state.page)
			.then(ideas => {
				this.setState({
					ideas: [...this.state.ideas, ...ideas.data.data],
					loadMore: this.state.ideas.length % 36 === 0 ? false : true
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	// componentDidUpdate = async () => {};

	render() {
		console.log(this.state.ideas.length);
		return (
			<InfiniteScroll
				dataLength={this.state.ideas.length}
				next={this.fetchIdeas}
				hasMore={this.state.loadMore}
				loader={<h4>Loading...</h4>}
				className="h-full overflow-y-hidden"
				endMessage={
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
								See More Ideas!
							</span>
						</button>
					</div>
				}
			>
				<IdeasStream
					ideas={this.state.ideas}
					pageTitle={"Trending"}
					topTags={this.state.topTags}
					history={this.props.history}
				/>
				{/* {!this.state.loadMore && (
					<div className="relative flex items-center flex-col justify-center w-full mt-12 sm:mb-0 sm:pr-10">
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
								Load more
							</span>
						</button>
					</div>
				)} */}
			</InfiniteScroll>
		);
	}
}

export default TrendingPage;
