import React, { Component } from "react";
import api from "../api";
import IdeasStream from "../components/idea_card_components";

class TrendingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ideas: [],
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
		try {
			await api.getTrendingIdeas().then(ideas => {
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
					topTags: tags.data.data.splice(0, 7)
				});
			});
		} catch (e) {
			console.log(e);
		}
	};

	// componentDidUpdate = async () => {};

	render() {
		return (
			<IdeasStream
				ideas={this.state.ideas}
				pageTitle={"Trending"}
				topTags={this.state.topTags}
				history={this.props.history}
			/>
		);
	}
}

export default TrendingPage;
