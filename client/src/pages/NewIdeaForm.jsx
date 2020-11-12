import React, { Component } from "react";
import api from "../api";

export default class NewIdeaForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			description: "",
			tags: []
		};
	}

	handleChangeInputName = async event => {
		const name = event.target.value;
		this.setState({ name });
	};

	handleChangeInputDescription = async event => {
		const description = event.target.validity.valid
			? event.target.value
			: this.state.description;

		this.setState({ description });
	};

	handleIncludeIdea = async () => {
		const { name, description, tags } = this.state;
		// const arrayTags = tags.split("/");
		const payload = { name, description, tags };

		await api.insertIdea(payload).then(res => {
			window.alert(`Idea shared successfully`);
			this.setState({
				name: "",
				description: "",
				tags: []
			});
		});
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
			this.setState({ tags: [...this.state.tags, val.replaceAll(" ", "-")] });
			this.tagInput.value = null;
		} else if (e.key === "Backspace" && !val) {
			this.removeTag(this.state.tags.length - 1);
		}
	};

	render() {
		const { name, description, tags } = this.state;
		return (
			<div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 pt-12 mx-auto text-gray-900  md:grid-cols-1 md:px-12 lg:px-32 xl:px-64">
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
							onChange={this.handleChangeInputName}
							value={name}
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
							placeholder="A Descriptively Descriptive Description. Supports Markdown"
						/>
					</div>
					<div className="mt-6">
						<span className="text-sm font-bold text-gray-600 uppercase">
							Tag It!
						</span>
						{/* <div className="w-full p-3 mt-2 text-gray-900 bg-gray-300 rounded-lg focus:outline-none focus:shadow-outline"> */}

						<ul className="w-full">
							{tags.map((tag, i) => (
								<button
									type="button"
									className="no-outline"
									onClick={() => {
										this.removeTag(i);
									}}
								>
									<li
										key={tag}
										className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 mt-4"
									>
										{"#" + tag}
									</li>
								</button>
							))}
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
						</ul>
					</div>
				</div>
				<div className="relative flex items-center  flex-col  justify-center w-full mb-10 sm:mb-0 sm:pr-10">
					<button
						type="button"
						className="relative "
						onClick={this.handleIncludeIdea}
					>
						<span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-black rounded  px-12" />
						<span className="relative inline-block w-full h-full  px-16  py-3 text-lg font-bold transition duration-100 bg-white border-2 border-black rounded fold-bold hover:bg-yellow-500 hover:text-white">
							SHARE IDEA!
						</span>
					</button>
				</div>
			</div>
		);
	}
}
