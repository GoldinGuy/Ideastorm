import React, { Component } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import api from "../api";

class UpdateIdea extends Component {
	updateUser = event => {
		event.preventDefault();
		if (
			prompt(`Update the idea ${this.props.id}. Enter Admin Password:`, "") ===
			process.env.REACT_APP_ADMIN_PW
		) {
			window.location.href = `/update/${this.props.id}`;
		}
	};

	render() {
		return (
			<div
				style={{ color: "#ef9b0f", cursor: "pointer" }}
				onClick={this.updateUser}
			>
				Update
			</div>
		);
	}
}

class DeleteIdea extends Component {
	deleteUser = event => {
		event.preventDefault();
		if (
			prompt(
				`Delete the idea ${this.props.id} permanently. Enter Admin Password:`,
				""
			) === process.env.REACT_APP_ADMIN_PW
		) {
			api.deleteIdeaById(this.props.id);
			window.location.reload();
		}
	};

	render() {
		return (
			<div
				style={{ color: "#ff0000", cursor: "pointer" }}
				onClick={this.deleteUser}
			>
				Delete
			</div>
		);
	}
}

class IdeasTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ideas: [],
			columns: [],
			isLoading: false,
			isAdmin:
				(new URLSearchParams(this.props.location.search).get("user") ?? "") ===
				process.env.REACT_APP_ADMIN_USER
		};
	}

	componentDidMount = async () => {
		this.setState({ isLoading: true });

		await api.getAllIdeas().then(ideas => {
			this.setState({
				ideas: ideas.data.data.reverse(),
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
				style: { whiteSpace: "unset" },
				show: this.state.isAdmin
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
				Header: "StormCount",
				accessor: "s_count",
				filterable: true,
				style: { whiteSpace: "unset" },
				width: 100
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
				width: 90,
				show: this.state.isAdmin
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
				width: 90,
				show: this.state.isAdmin
			}
		];

		let showTable = true;
		if (!ideas.length) {
			showTable = false;
		}

		return (
			<div style={{ padding: "0 10px 10px 10px" }}>
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
			</div>
		);
	}
}

export default IdeasTable;
