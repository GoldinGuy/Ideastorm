import React, { Component } from "react";
import api from "../api";

import styled from "styled-components";

import "../style/tags.css";

const Title = styled.h1.attrs({
	className: "h1 text-center"
})`
	margin: 25px 0px;
`;

const Wrapper = styled.div.attrs({
	className: "form-group"
})`
	margin: 60px 20vw;
`;

const InputText = styled.input.attrs({
	className: "form-control"
})`
	margin: 15px 5px;
`;

const InputTextArea = styled.textarea.attrs({
	className: "form-control"
})`
	margin: 15px 5px;
`;
const Button = styled.button.attrs({
	className: `btn btn-primary`
})`
	margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
	className: `btn btn-danger`
})`
	margin: 15px 15px 15px 5px;
`;

class IdeasInsert extends Component {
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
			<Wrapper>
				<Title>What's Your Idea?</Title>

				<InputText
					type="text"
					value={name}
					placeholder="An Awesome Idea"
					onChange={this.handleChangeInputName}
				/>
				<InputTextArea
					type="text"
					value={description}
					placeholder="A descriptively descriptive description"
					onChange={this.handleChangeInputDescription}
					rows="6"
				></InputTextArea>

				<div className="input-tag">
					<ul className="input-tag__tags">
						{tags.map((tag, i) => (
							<li key={tag}>
								{tag}
								<button
									type="button"
									className="no-outline"
									onClick={() => {
										this.removeTag(i);
									}}
								>
									+
								</button>
							</li>
						))}
						<li className="input-tag__tags__input">
							<input
								type="text"
								placeholder="Tag it!"
								className="no-outline"
								onKeyDown={this.inputKeyDown}
								ref={c => {
									this.tagInput = c;
								}}
							/>
						</li>
					</ul>
				</div>

				<Button onClick={this.handleIncludeIdea}>Share Idea</Button>
				<CancelButton href={"/ideas/list"}>Cancel</CancelButton>
			</Wrapper>
		);
	}
}

export default IdeasInsert;
