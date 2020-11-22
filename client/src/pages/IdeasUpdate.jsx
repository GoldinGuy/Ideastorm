import React, { Component } from "react";
import api from "../api";

import styled from "styled-components";

const Title = styled.h1.attrs({
	className: "h1"
})``;

const Wrapper = styled.div.attrs({
	className: "form-group"
})`
	margin: 0 30px;
`;

const Label = styled.label`
	margin: 5px;
`;

const InputText = styled.input.attrs({
	className: "form-control"
})`
	margin: 5px;
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

class IdeasUpdate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.id,
			name: "",
			rating: "",
			time: ""
		};
	}

	handleChangeInputName = async event => {
		const name = event.target.value;
		this.setState({ name });
	};

	handleChangeInputRating = async event => {
		const rating = event.target.validity.valid
			? event.target.value
			: this.state.rating;

		this.setState({ rating });
	};

	handleChangeInputTime = async event => {
		const time = event.target.value;
		this.setState({ time });
	};

	handleUpdateIdea = async () => {
		const { id, name, rating, time } = this.state;
		const arrayTime = time.split("/");
		const payload = { name, rating, time: arrayTime };

		await api.updateIdeaById(id, payload).then(res => {
			window.alert(`Idea updated successfully`);
			this.setState({
				name: "",
				rating: "",
				time: ""
			});
		});
	};

	componentDidMount = async () => {
		const { id } = this.state;
		const idea = await api.getIdeaById(id);

		this.setState({
			name: idea.data.data.name,
			rating: idea.data.data.rating,
			time: idea.data.data.time.join("/")
		});
	};

	render() {
		const { name, rating, time } = this.state;
		return (
			<Wrapper>
				<Title>Edit your Idea</Title>

				<Label>Name: </Label>
				<InputText
					type="text"
					value={name}
					onChange={this.handleChangeInputName}
				/>

				<Label>Rating: </Label>
				<InputText
					type="number"
					step="0.1"
					lang="en-US"
					min="0"
					max="10"
					pattern="[0-9]+([,\.][0-9]+)?"
					value={rating}
					onChange={this.handleChangeInputRating}
				/>

				<Label>Time: </Label>
				<InputText
					type="text"
					value={time}
					onChange={this.handleChangeInputTime}
				/>

				<Button onClick={this.handleUpdateIdea}>Update Idea</Button>
				<CancelButton href={"/ideas/list"}>Cancel</CancelButton>
			</Wrapper>
		);
	}
}

export default IdeasUpdate;
