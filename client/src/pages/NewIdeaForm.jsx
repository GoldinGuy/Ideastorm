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
			this.setState({ tags: [...this.state.tags, val] });
			this.tagInput.value = null;
		} else if (e.key === "Backspace" && !val) {
			this.removeTag(this.state.tags.length - 1);
		}
	};

	render() {
		const { name, description, tags } = this.state;
		return (
			<div className="mt-24 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full">
					<div>
						{/* <img
						className="mx-auto h-12 w-auto"
						src="https://tailwindui.com/img/logos/v1/workflow-mark-on-white.svg"
						alt="Workflow"
					/> */}
						<h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
							What's Your Idea?
						</h2>
					</div>
					<form className="mt-8" action="#" method="POST">
						<input type="hidden" name="remember" defaultValue="true" />
						<div className="rounded-md shadow-sm">
							<div>
								<input
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
									onChange={this.handleChangeInputName}
									type="text"
									value={name}
									placeholder="An Awesome Idea"
								/>
							</div>
							<div className="-mt-px">
								<textarea
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
									type="text"
									value={description}
									placeholder="A descriptively descriptive description"
									onChange={this.handleChangeInputDescription}
									rows="7"
								/>
							</div>
							<div className="-mt-px">
								<div
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
									style={{ alignItems: "stretch" }}
								>
									<ul className="">
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
													className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 "
												>
													{tag}
												</li>
											</button>
										))}
										<li className="inline-block">
											<input
												type="text"
												placeholder="Tag it!"
												style={{ alignSelf: "stretch" }}
												className="no-outline"
												onKeyDown={this.inputKeyDown}
												ref={c => {
													this.tagInput = c;
												}}
											/>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="mt-6">
							<button
								type="button"
								onClick={this.handleIncludeIdea}
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
							>
								Share Idea!
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
