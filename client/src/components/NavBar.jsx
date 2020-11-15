/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: this.getCurrentPage(this.props.location.pathname)
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			this.setState({
				currentPage: this.getCurrentPage(this.props.location.pathname)
			});
		}
	}

	getCurrentPage(path) {
		switch (path) {
			case "/ideas":
				return 1;
			case "/ideas/explore":
				return 2;
			case "/ideas/table":
				return 3;
			default:
				return 0;
		}
	}

	render() {
		return (
			<div className="relative z-20 w-full h-24 px-8 pt-2 bg-white">
				<div className="container flex items-center justify-between h-full max-w-6xl mx-auto">
					<a
						href="#_"
						className="relative flex items-center inline-block h-5 h-full font-black"
					>
						<svg
							className="w-auto h-8 mt-1"
							viewBox="0 0 215 151"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
						>
							<defs>
								<linearGradient
									x1="56.965%"
									y1="53.262%"
									x2="7.891%"
									y2="29.24%"
									id="b"
								>
									<stop stopColor="#FFCD26" offset="0%" />
									<stop stopColor="#FFDF95" offset="100%" />
								</linearGradient>
								<path
									d="M95.655.001c-24.386 0-43.538 13.864-52.36 34.66-5.144 12.126-3.711 24.522.084 29.027 2.435-5.804 11.57-15.424 29.476-15.424h79.952c29.783 0 54.375-30.377 61.963-48.263H95.655zM67.693 65.916C23.419 65.916.085 105.344 0 137.666v.345c.011 4.322.439 8.517 1.291 12.466 2.433-5.804 19.956-36.297 47.062-36.297h23.225c29.783 0 54.375-30.378 61.963-48.264H67.693z"
									id="a"
								/>
							</defs>
							<g fill="none" fillRule="evenodd">
								<mask id="c" fill="#fff">
									<use xlinkHref="#a" />
								</mask>
								<path
									d="M95.655.001c-24.386 0-43.538 13.864-52.36 34.66-5.144 12.126-3.711 24.522.084 29.027 2.435-5.804 11.57-15.424 29.476-15.424h79.952c29.783 0 54.375-30.377 61.963-48.263H95.655zM67.693 65.916C23.419 65.916.085 105.344 0 137.666v.345c.011 4.322.439 8.517 1.291 12.466 2.433-5.804 19.956-36.297 47.062-36.297h23.225c29.783 0 54.375-30.378 61.963-48.264H67.693z"
									fill="url(#b)"
									mask="url(#c)"
								/>
							</g>
						</svg>
						<span className="ml-3 text-2xl font-black">Brainstorm</span>
					</a>
					<div
						id="nav"
						className="absolute top-0 left-0 hidden block w-full mt-20 border-b border-gray-200 sm:border-none sm:px-5 sm:block sm:relative sm:mt-0 sm:px-0 sm:w-auto"
					>
						<nav className="flex flex-col items-center py-3 bg-white border border-gray-100 sm:flex-row sm:bg-transparent sm:border-none sm:py-0">
							<Link
								to="/ideas"
								className="relative px-1 mb-1 mb-5 mr-0 text-base font-bold sm:mb-0 sm:mr-4 lg:mr-8"
								// onClick={() => pageHandler(1)}
							>
								Home
								<span
									className={
										this.state.currentPage === 1
											? "absolute bottom-0 left-0 w-full h-1 -mb-2 bg-yellow-300 rounded-fullabsolute bottom-0 left-0 w-full h-1 -mb-2 bg-yellow-300 rounded-full"
											: "hidden"
									}
								/>
							</Link>
							<Link
								// onClick={() => pageHandler(2)}
								to="/ideas/explore"
								className=" relative px-1 mb-1 mb-5 mr-0 text-base font-bold sm:mb-0 sm:mr-4 lg:mr-8"
							>
								Explore Ideas
								<span
									className={
										this.state.currentPage === 2
											? "absolute bottom-0 left-0 w-full h-1 -mb-2 bg-yellow-300 rounded-fullabsolute bottom-0 left-0 w-full h-1 -mb-2 bg-yellow-300 rounded-full"
											: "hidden"
									}
								/>
							</Link>
							<Link
								// onClick={() => pageHandler(3)}
								to="/ideas/table"
								className="relative px-1 mb-1 mb-5 mr-0 text-base font-bold sm:mb-0 sm:mr-4 lg:mr-8"
							>
								Browse Table
								<span
									className={
										this.state.currentPage === 3
											? "absolute bottom-0 left-0 w-full h-1 -mb-2 bg-yellow-300 rounded-fullabsolute bottom-0 left-0 w-full h-1 -mb-2 bg-yellow-300 rounded-full"
											: "hidden"
									}
								/>
							</Link>

							<SearchBar searchHandler={this.props.searchHandler} />
							<Link
								to="/ideas/create"
								className="relative mb-5 sm:mb-0 ml-10"
								// onClick={() => pageHandler(5)}
							>
								<span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-black rounded" />
								<span className="relative inline-block w-full h-full px-3 py-1 text-base font-bold transition duration-100 bg-white border-2 border-black rounded fold-bold hover:bg-yellow-400 hover:text-gray-900">
									SHARE AN IDEA
								</span>
							</Link>
						</nav>
					</div>
					<div
						id="nav-mobile-btn"
						className="absolute top-0 right-0 z-50 block w-6 mt-8 mr-10 cursor-pointer select-none sm:hidden sm:mt-10"
					>
						<span className="block w-full h-1 mt-2 duration-200 transform bg-gray-800 rounded-full sm:mt-1" />
						<span className="block w-full h-1 mt-1 duration-200 transform bg-gray-800 rounded-full" />
					</div>
				</div>
			</div>

			// <nav className="bg-gray-800">
			// 	<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
			// 		<div className="relative flex items-center justify-between h-16">
			// 			<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
			// 				{/* Mobile menu button*/}
			// 				<button
			// 					className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
			// 					aria-label="Main menu"
			// 					aria-expanded="false"
			// 				>
			// 					<svg
			// 						className="block h-6 w-6"
			// 						xmlns="http://www.w3.org/2000/svg"
			// 						fill="none"
			// 						viewBox="0 0 24 24"
			// 						stroke="currentColor"
			// 					>
			// 						<path
			// 							strokeLinecap="round"
			// 							strokeLinejoin="round"
			// 							strokeWidth={2}
			// 							d="M4 6h16M4 12h16M4 18h16"
			// 						/>
			// 					</svg>

			// 					<svg
			// 						className="hidden h-6 w-6"
			// 						xmlns="http://www.w3.org/2000/svg"
			// 						fill="none"
			// 						viewBox="0 0 24 24"
			// 						stroke="currentColor"
			// 					>
			// 						<path
			// 							strokeLinecap="round"
			// 							strokeLinejoin="round"
			// 							strokeWidth={2}
			// 							d="M6 18L18 6M6 6l12 12"
			// 						/>
			// 					</svg>
			// 				</button>
			// 			</div>
			// 			<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
			// 				<div className="flex-shrink-0">
			// 					<Link
			// 						to="/"
			// 						className="ml-20 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out-link hover:no-underline"
			// 					>
			// 						BrainStorm
			// 					</Link>
			// 					{/* <img
			// 						className="block lg:hidden h-8 w-auto"
			// 						src="https://tailwindui.com/img/logos/v1/workflow-mark-on-dark.svg"
			// 						alt="Workflow logo"
			// 					/>
			// 					<img
			// 						className="hidden lg:block h-8 w-auto"
			// 						src="https://tailwindui.com/img/logos/v1/workflow-logo-on-dark.svg"
			// 						alt="Workflow logo"
			// 					/> */}
			// 				</div>
			// 				<div className="hidden sm:block sm:ml-6">
			// 					<div className="flex">
			// 						<Link
			// 							to="/ideas/list"
			// 							className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out-link hover:no-underline"
			// 						>
			// 							Explore Ideas
			// 						</Link>

			// 						<Link
			// 							to="/ideas/table"
			// 							className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out-link hover:no-underline"
			// 						>
			// 							Table
			// 						</Link>
			// 					</div>
			// 				</div>
			// 			</div>
			// 			<div className="hidden sm:block sm:ml-6">
			// 				<Link
			// 					to="/ideas/create"
			// 					className=" text-white font-semibold  py-2 px-4 border rounded mr-8 hover:no-underline  hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
			// 				>
			// 					Share an Idea
			// 				</Link>
			// 			</div>
			// 			<div className="relative mx-auto text-gray-600 hidden sm:block ">
			// 				<span className="absolute left-0 inset-y-0 flex items-center pl-3 ">
			// 					<svg
			// 						className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
			// 						fill="currentColor"
			// 						viewBox="0 0 20 20"
			// 					>
			// 						<path
			// 							fillRule="evenodd"
			// 							d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
			// 							clipRule="evenodd"
			// 						/>
			// 					</svg>
			// 				</span>
			// 				<input
			// 					className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none mr-20"
			// 					type="search"
			// 					name="search"
			// 					placeholder="Search"
			// 				/>
			// 				<button
			// 					type="submit"
			// 					className="absolute right-0 top-0 mt-5 mr-4"
			// 				></button>
			// 			</div>

			// 			{/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
			// 				<button
			// 					className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
			// 					aria-label="Notifications"
			// 				>
			// 					<svg
			// 						className="h-6 w-6"
			// 						xmlns="http://www.w3.org/2000/svg"
			// 						fill="none"
			// 						viewBox="0 0 24 24"
			// 						stroke="currentColor"
			// 					>
			// 						<path
			// 							strokeLinecap="round"
			// 							strokeLinejoin="round"
			// 							strokeWidth={2}
			// 							d="M5 5a5 5 0 0 1 10 0v2A5 5 0 0 1 5 7V5zM0 16.68A19.9 19.9 0 0 1 10 14c3.64 0 7.06.97 10 2.68V20H0v-3.32z"
			// 						/>
			// 					</svg>
			// 				</button>
			// 			</div> */}
			// 		</div>
			// 	</div>

			// 	<div className="hidden sm:hidden">
			// 		<div className="px-2 pt-2 pb-3">
			// 			<a
			// 				href="#"
			// 				className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
			// 			>
			// 				Dashboard
			// 			</a>
			// 			<a
			// 				href="#"
			// 				className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
			// 			>
			// 				Team
			// 			</a>
			// 			<a
			// 				href="#"
			// 				className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
			// 			>
			// 				Projects
			// 			</a>
			// 			<a
			// 				href="#"
			// 				className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
			// 			>
			// 				Calendar
			// 			</a>
			// 		</div>
			// 	</div>
			// </nav>
		);
	}
}

export default withRouter(NavBar);
