import React, { Component } from "react";
import api from "../api";

export default class NewIdeaPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			description: "",
			tags: [],
			errorMessage: false
		};
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

	handleIncludeIdea = async () => {
		const { title, description, tags } = this.state;
		// const arrayTags = tags.split("/");
		if (tags.length >= 3) {
			const payload = { title, description, tags };

			await api.insertIdea(payload).then(res => {
				window.alert(`Idea shared successfully`);
				this.setState({
					title: "",
					description: "",
					tags: [],
					errorMessage: false
				});
			});
		} else {
			this.setState({
				errorMessage: true
			});
		}
	};

	removeTag = i => {
		const newTags = [...this.state.tags];
		newTags.splice(i, 1);
		this.setState({ tags: newTags });
	};

	inputKeyDown = e => {
		const val = e.target.value;
		if ((e.key === "Enter" || e.key === ",") && val) {
			if (
				this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())
			) {
				return;
			}
			this.setState({
				tags: [
					...this.state.tags,
					val.toLowerCase().trim().replaceAll(" ", "-")
				]
			});
			this.tagInput.value = null;
		} else if (e.key === "Backspace" && !val) {
			this.removeTag(this.state.tags.length - 1);
		}
	};

	render() {
		const { title, description, tags } = this.state;
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
							/>
						</div>
						<div className="mt-6">
							<span className="text-sm font-bold text-gray-600 uppercase">
								Tag It!
							</span>
							{/* <div className="w-full p-3 mt-2 text-gray-900 bg-gray-300 rounded-lg focus:outline-none focus:shadow-outline"> */}

							<ul className="w-full">
								<li className="inline-block w-full">
									<input
										className="w-full p-3 mt-2 text-gray-900 bg-gray-300 rounded-lg focus:outline-none focus:shadow-outline"
										type="text"
										placeholder="website. app. foodies. science-fair. tech. art-project."
										onKeyDown={this.inputKeyDown}
										ref={c => {
											this.tagInput = c;
										}}
									/>
								</li>
								{tags.map((tag, i) => (
									<div
										className="bg-indigo-100 inline-flex items-center text-sm rounded mt-2 mr-1"
										key={tag}
									>
										<span className="ml-2 mr-1 leading-relaxed truncate text-md max-w-xs">
											{"#" + tag}
										</span>
										<button
											className="w-6 h-8 inline-block align-middle text-gray-500 hover:text-gray-600 focus:outline-none"
											onClick={() => {
												this.removeTag(i);
											}}
										>
											<svg
												className="w-6 h-6 fill-current mx-auto"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
											>
												<path
													fillRule="evenodd"
													d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
												/>
											</svg>
										</button>
									</div>
								))}
							</ul>
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
						className="relative flex items-center  flex-col  justify-center w-full mb-10 sm:mb-0 sm:pr-10"
						key="submit"
					>
						<button
							type="button"
							className="relative "
							onClick={this.handleIncludeIdea}
						>
							<span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-black rounded  px-12" />
							<span className="relative inline-block w-full h-full  px-16  py-3 text-lg font-bold transition duration-100 bg-white border-2 border-black rounded fold-bold hover:bg-teal-500 hover:text-white">
								SHARE IDEA!
							</span>
						</button>
					</div>
				</div>
			</div>
		);
	}
}
