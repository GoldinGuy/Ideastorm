import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";
let autocomplete = require("../assets/utils/autocomplete_words.js");

function titleCase(str) {
	str = str.toLowerCase().split(" ");
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(" ");
}

export default class UpdateIdeaPage extends Component {
	_isMounted = false;
	tagRef = React.createRef();

	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			title: "",
			description: "",
			tags: [],
			s_count: 1,
			errorMessage: false
		};
	}

	componentDidMount = async () => {
		this._isMounted = true;

		const { id } = this.state;
		const idea = await api.getIdeaById(id);

		this.setState({
			title: idea.data.data.title,
			description: idea.data.data.description,
			tags: idea.data.data.tags,
			s_count: idea.data.data.s_count
		});
	};

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleChangeInputTitle = async event => {
		const title = event.target.value;
		this.setState({ title });
	};

	handleChangeInputDescription = async event => {
		const description = event.target.validity.valid
			? event.target.value
			: this.state.description;

		this.setState({ description });
	};

	handleUpdateIdea = async () => {
		if (this.state.tags.length >= 3) {
			let newTags = [];
			for (const tag of JSON.parse(this.state.tags)) {
				newTags.push(tag.value.toLowerCase().trim().replace(" ", "-"));
			}
			const { title, description, id, s_count } = this.state;
			const payload = {
				title: titleCase(title),
				description,
				tags: newTags,
				s_count: s_count
			};

			await api.updateIdeaById(id, payload).then(res => {
				window.alert(`Idea shared successfully`);
				this.setState({
					title: "",
					description: "",
					tags: [],
					errorMessage: false
				});
			});
			// autocomplete.addWords(tags);
			this.clearAllTags();
		} else {
			this.setState({
				errorMessage: true
			});
		}
	};

	clearAllTags = () => {
		this.tagRef.current && this.tagRef.current.removeAllTags();
	};

	render() {
		const { title, description, tags } = this.state;

		const settings = {
			maxTags: 6,
			minTags: 3,
			trim: true,
			delimiters: [",", ".", "\\s+"],
			caseSensitive: false,
			accentedSearch: true,
			highlightFirst: false,
			//backspace: "edit",
			placeholder: "Add up to 6 tags",
			dropdown: {
				enabled: 0, // a;ways show suggestions dropdown
				fuzzySearch: true
			}
		};

		const tagifyProps = {
			whitelist: autocomplete.words,
			showFilteredDropdown: "a",
			loading: false
		};
		return (
			<div>
				<div
					className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 pt-2 sm:pt-10 mx-auto text-gray-900 md:grid-cols-1 md:px-12 lg:px-32 xl:px-64 mb-5"
					key="input-form"
				>
					<div>
						<div>
							<h2 className="mb-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
								What's Your Idea?
							</h2>

							<span className="text-sm font-bold text-gray-600 uppercase">
								Title
							</span>
							<input
								className="w-full p-3 mt-2 text-gray-900 bg-gray-300 rounded-lg focus:outline-none focus:shadow-outline"
								type="text"
								onChange={this.handleChangeInputTitle}
								value={title}
								placeholder="An Awesome Idea"
								maxLength="55"
							/>
						</div>

						<div className="mt-6">
							<span className="text-sm font-bold text-gray-600 uppercase">
								Details
							</span>
							<textarea
								className="w-full h-32 p-3 mt-2 text-gray-900 bg-gray-300 rounded-lg focus:outline-none focus:shadow-outline"
								onChange={this.handleChangeInputDescription}
								value={description}
								placeholder="A Descriptively Descriptive Description"
								maxLength="1000"
							/>
						</div>
						<div className="mt-6">
							<span className="text-sm font-bold text-gray-600 uppercase">
								Tag It!
							</span>

							<Tags
								className="w-full p-1 mt-2 text-gray-900 bg-gray-300 rounded-lg !focus:outline-none !focus:shadow-outline"
								value={tags}
								settings={settings}
								{...tagifyProps}
								tagifyRef={this.tagRef}
								onChange={e => (
									// eslint-disable-next-line no-sequences
									e.persist(),
									this.setState({
										tags: e.target.value
									})
								)}
							/>
						</div>
					</div>
					{this.state.errorMessage && (
						<div
							className="flex max-w-sm w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-2 mb-2"
							key="errorMessage"
						>
							<div className="flex justify-center items-center w-12 bg-red-500">
								<svg
									className="h-6 w-6 fill-current text-white"
									viewBox="0 0 40 40"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
								</svg>
							</div>

							<div className="-mx-3 py-2 px-4">
								<div className="mx-3">
									<span className="text-red-500 font-semibold">Error</span>
									<p className="text-gray-600 text-sm">
										Verify that you added at least 3 tags and filled out all
										required fields
									</p>
								</div>
							</div>
						</div>
					)}
					<div
						className="relative flex items-center  flex-col  justify-center w-full mb-5 sm:mb-0 sm:pr-10"
						key="submit"
					>
						<button
							type="button"
							className="relative "
							onClick={this.handleUpdateIdea}
						>
							<span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-black rounded  px-12" />
							<span className="relative inline-block w-full h-full  px-16  py-3 text-lg font-bold transition duration-100 bg-white border-2 border-black rounded fold-bold hover:bg-indigo-500 hover:text-white">
								UPDATE IDEA!
							</span>
						</button>
					</div>
					<div
						className="relative flex items-center  flex-col  justify-center w-full mb-5 sm:mb-0 sm:pr-10"
						key="cancel"
					>
						<Link className="relative " to="/table">
							<span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-black rounded  px-12" />
							<span className="relative inline-block w-full h-full  px-16  py-3 text-lg font-bold transition duration-100 bg-white border-2 border-black rounded fold-bold hover:bg-red-500 hover:text-white">
								CANCEL
							</span>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
