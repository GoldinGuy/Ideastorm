import React, { Component } from "react";
import SearchBar from "./search_bar_component";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: this.getCurrentPage(this.props.location.pathname),
			mobileExpanded: false
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			this.setState({
				currentPage: this.getCurrentPage(this.props.location.pathname),
				mobileExpanded: false
			});
		}
	}

	toggleExpanded = () => {
		if (this.state.mobileExpanded) {
			this.setState({ mobileExpanded: false });
		} else {
			this.setState({ mobileExpanded: true });
		}
	};

	getCurrentPage(path) {
		switch (path) {
			case "/trending":
				return 1;
			case "/latest":
				return 2;
			case "/explore":
				return 3;
			case "/table":
				return 4;
			default:
				return 0;
		}
	}

	render() {
		return (
			<div className="relative z-20 w-full h-24 px-8 pt-2 ">
				<div className="container flex items-center justify-between h-full max-w-6xl mx-auto">
					<Link
						to="/"
						className="relative flex items-center h-full font-black"
						key="/"
					>
						<img
							src="https://user-images.githubusercontent.com/47064842/100686922-4e0e7200-334d-11eb-975d-7ed8be0c4a3a.png"
							alt="logo"
							className="w-auto"
							style={{ height: "3.5rem" }}
						/>

						<span className="ml-3 text-2xl font-black">Ideastorm</span>
					</Link>
					<div
						id="nav"
						className={`absolute top-0 left-0  block w-full mt-20 border-b border-gray-200 sm:border-none sm:px-5 sm:block sm:relative sm:mt-0  sm:w-auto ${
							this.state.mobileExpanded ? "" : "hidden"
						}`}
					>
						<nav
							className={`flex flex-col items-center py-4 bg-white border border-gray-100 sm:flex-row sm:bg-transparent sm:border-none sm:py-0  ${
								this.state.mobileExpanded ? "flex-col-reverse" : ""
							}`}
						>
							<div className="flex flex-col items-center py-6 bg-white  sm:flex-row sm:bg-transparent sm:border-none sm:py-0">
								<Link
									to="/trending"
									key="trending"
									className=" relative px-1 mr-0 text-base font-bold sm:mr-4 lg:mr-8 mb-3 sm:mb-0"
								>
									Trending
									<span
										className={
											this.state.currentPage === 1
												? "absolute bottom-0 left-0 w-full h-1 -mb-2 bg-yellow-300 rounded-full"
												: "hidden"
										}
									/>
								</Link>

								<Link
									to="/latest"
									key="latest"
									className=" relative px-1 mb-3 mr-0 text-base font-bold sm:mb-0 sm:mr-4 lg:mr-8"
								>
									Latest
									<span
										className={
											this.state.currentPage === 2
												? "absolute bottom-0 left-0 w-full h-1 -mb-2 bg-yellow-300 rounded-full"
												: "hidden"
										}
									/>
								</Link>
								{/* <Link
									to="/explore"
									key="explore-categories"
									className=" relative px-1 mb-3 mr-0 text-base font-bold sm:mb-0 sm:mr-4 lg:mr-8"
								>
									Explore
									<span
										className={
											this.state.currentPage === 3
												? "absolute bottom-0 left-0 w-full h-1 -mb-2 bg-yellow-300 rounded-full"
												: "hidden"
										}
									/>
								</Link> */}
								<Link
									to="/table"
									key="table"
									className=" relative px-1 mr-0 text-base font-bold sm:mr-4 lg:mr-8 mb-12 sm:mb-0"
								>
									Table
									<span
										className={
											this.state.currentPage === 4
												? "absolute bottom-0 left-0 w-full h-1 -mb-2 bg-yellow-300 rounded-full"
												: "hidden"
										}
									/>
								</Link>
							</div>
							<SearchBar
								key="search"
								searchHandler={this.props.searchHandler}
								history={this.props.history}
							/>
							<Link
								to="/create"
								key="create"
								className="sm:relative mb-3 sm:mb-0 sm:ml-10 flex-none absolute"
							>
								<span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-black rounded" />
								<span className="relative inline-block w-full h-full px-3 py-1 text-base font-bold transition duration-100 bg-white border-2 border-black rounded fold-bold hover:bg-yellow-400 hover:text-gray-900">
									SHARE AN IDEA
								</span>
							</Link>
						</nav>
					</div>
					<button
						id="nav-mobile-btn"
						onClick={this.toggleExpanded}
						className="absolute top-0 right-0 z-50 block w-6 mt-8 mr-10 cursor-pointer select-none sm:hidden sm:mt-10 focus:border-0 focus:outline-none"
					>
						<span className="block w-full h-1 mt-2 duration-200 transform bg-gray-800 rounded-full sm:mt-1" />
						<span className="block w-full h-1 mt-1 duration-200 transform bg-gray-800 rounded-full" />
					</button>
				</div>
			</div>
		);
	}
}

export default withRouter(NavBar);
