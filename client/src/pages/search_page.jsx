import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import api from "../api";
import IdeasStream from "../components/idea_card_components";
import toSlug from "../utils/to_slug.js";

class SearchPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ideas: [],
			topTags: [],
			query: new URLSearchParams(this.props.location.search).get("q") ?? ""
		};
	}

	componentDidMount = async () => {
		this.fetchIdeasByQuery();
		this.fetchRelatedTagsByQuery();
	};

	componentDidUpdate(prevProps) {
		let newQuery =
			new URLSearchParams(this.props.location.search).get("q") ?? "";
		// let oldQuery =
		// 	new URLSearchParams(prevProps.location.search).get("q") ?? "";
		if (this.state.query !== newQuery) {
			this.setState(
				{
					query: newQuery
				},
				function () {
					this.fetchRelatedTagsByQuery();
					this.fetchIdeasByQuery();
				}.bind(this)
			);
		}
	}

	fetchIdeasByQuery = async () => {
		/* If length of ID */
		if (this.state.query.length === 24 && !this.state.query.includes("-")) {
			try {
				await api.getIdeaById(this.state.query).then(ideas => {
					this.setState({
						ideas: [ideas.data.data]
					});
				});
			} catch (e) {
				this.setState({ ideas: [] });
				console.log(e);
			}
			console.log(this.state.query, this.state.query.length);
		} else {
			try {
				await api.getIdeasByText(this.state.query).then(ideas => {
					this.setState({
						ideas: ideas.data.data
					});
				});
			} catch (e) {
				this.setState({ ideas: [] });
				console.log(e);
			}
		}
	};

	fetchRelatedTagsByQuery = async () => {
		let newTags = [];
		try {
			await fetch(
				`https://api.datamuse.com/words?max=10&ml=${this.state.query}`
			)
				.then(res => res.json())
				.then(result =>
					result.forEach(tag => {
						newTags.push(tag.word);
					})
				);
			this.setState({
				topTags: newTags
			});
		} catch (e) {
			console.log(e);
		}
	};

	render() {
		return (
			<div>
				{this.state.query.length === 0 && <Redirect to="/trending" />}
				<IdeasStream
					ideas={this.state.ideas}
					pageTitle={this.state.query}
					topTags={this.state.topTags}
					history={this.props.history}
				/>
			</div>
		);
	}
}

export default SearchPage;
