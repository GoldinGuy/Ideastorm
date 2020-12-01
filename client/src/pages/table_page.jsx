import React, { Component } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import api from "../api";

import styled from "styled-components";

const Wrapper = styled.div`
	padding: 0 10px 10px 10px;
`;

const Update = styled.div`
	color: #ef9b0f;
	cursor: pointer;
`;

const Delete = styled.div`
	color: #ff0000;
	cursor: pointer;
`;

class UpdateIdea extends Component {
	updateUser = event => {
		event.preventDefault();

		window.location.href = `/update/${this.props.id}`;
	};

	render() {
		return <Update onClick={this.updateUser}>Update</Update>;
	}
}

class DeleteIdea extends Component {
	deleteUser = event => {
		event.preventDefault();
		if (
			prompt(
				`Delete the idea ${this.props.id} permanently. Enter Admin Password:`,
				""
			) === "INSERT PW HERE"
		) {
			api.deleteIdeaById(this.props.id);
			window.location.reload();
		}
		// if (
		// 	window.confirm(
		// 		`Do you want to delete the idea ${this.props.id} permanently?`
		// 	)
		// ) {
		// 	api.deleteIdeaById(this.props.id);
		// 	window.location.reload();
		// }
	};

	render() {
		return <Delete onClick={this.deleteUser}>Delete</Delete>;
	}
}

class IdeasTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ideas: [],
			columns: [],
			isLoading: false
		};
	}

	componentDidMount = async () => {
		this.setState({ isLoading: true });

		await api.getAllIdeas().then(ideas => {
			this.setState({
				ideas: ideas.data.data,
				isLoading: false
			});
		});
	};

	render() {
		const { ideas, isLoading } = this.state;

		const columns = [
			{
				Header: "ID",
				accessor: "_id",
				filterable: true,
				style: { whiteSpace: "unset" }
			},
			{
				Header: "Title",
				accessor: "title",
				filterable: true,
				style: { whiteSpace: "unset" }
			},
			{
				Header: "Description",
				accessor: "description",
				filterable: true,
				style: { whiteSpace: "unset" },
				width: 500
			},

			{
				Header: "Tags",
				accessor: "tags",
				filterable: true,
				Cell: props => <span>{props.value.join(", ")}</span>,
				style: { whiteSpace: "unset" }
			},
			{
				Header: "",
				accessor: "",
				Cell: function (props) {
					return (
						<span>
							<UpdateIdea id={props.original._id} />
						</span>
					);
				},
				width: 90
			},
			{
				Header: "",
				accessor: "",
				Cell: function (props) {
					return (
						<span>
							<DeleteIdea id={props.original._id} />
						</span>
					);
				},
				width: 90
			}
			// {
			// 	Header: "",
			// 	accessor: "",
			// 	Cell: function (props) {
			// 		return (
			// 			<span>
			// 				<UpdateIdea id={props.original._id} />
			// 			</span>
			// 		);
			// 	}
			// }
		];

		let showTable = true;
		if (!ideas.length) {
			showTable = false;
		}

		return (
			<Wrapper>
				{showTable && (
					<ReactTable
						data={ideas}
						columns={columns}
						loading={isLoading}
						defaultPageSize={20}
						showPageSizeOptions={true}
						minRows={0}
						collapseOnDataChange={false}
						className="-striped -highlight"
						collapseOnSortingChange={false}
						collapseOnPageChange={false}
						defaultFilterMethod={(filter, row, column) => {
							const id = filter.pivotId || filter.id;
							return row[id] !== undefined
								? String(row[id])
										.toLowerCase()
										.includes(filter.value.toLowerCase())
								: true;
						}}
					/>
				)}
			</Wrapper>
		);
	}
}

export default IdeasTable;
