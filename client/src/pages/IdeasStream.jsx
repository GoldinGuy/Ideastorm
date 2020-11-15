import React, { Component } from "react";
import api from "../api";

import Cards from "../components/ideaCards";

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
		this.fetchIdeas();
	};

	componentDidUpdate(prevProps) {
		if (prevProps.searchTerm !== this.props.searchTerm) {
			this.setState({ isLoading: true });
			this.fetchIdeas();
		}
	}

	fetchIdeas = async () => {
		if (this.props.searchTerm.length === 0) {
			await api.getLatestIdeas().then(ideas => {
				this.setState({
					ideas: ideas.data.data,
					isLoading: false
				});
			});
		} else {
			await api.getIdeasByTag([this.props.searchTerm]).then(ideas => {
				this.setState({
					ideas: ideas.data.data,
					isLoading: false
				});
			});
		}
	};

	render() {
		const { ideas } = this.state;
		var pageTitle =
			this.props.searchTerm.length > 0 ? this.props.searchTerm : "Trending";
		let showIdeas = true;
		if (!ideas.length) {
			showIdeas = false;
		}
		// console.log(ideas);
		// console.log(this.props.searchTerm);

		return (
			<div>
				{showIdeas && (
					<div className="container relative flex flex-col justify-between h-full max-w-6xl px-8 mx-auto xl:px-0">
						<h2 className="relative flex items-center self-start inline-block w-auto mb-10 mt-5 text-4xl font-black">
							<span className="absolute inline-block w-full h-4 mt-3 -ml-2 bg-yellow-400" />
							<span className="relative">{pageTitle}</span>
						</h2>
						<div className="flex w-full h-full">
							<div className="w-full">
								<Cards ideas={this.state.ideas} />
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default IdeasStream;

// const IdeasStream = ({ searchTerm }) => {
// 	const [ideas, setIdeas] = React.useState({});
// 	var [isLoading, setLoading] = React.useState(true);

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
// 			{isLoading && (
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
