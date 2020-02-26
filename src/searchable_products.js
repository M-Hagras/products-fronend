import React from "react";
import {Pagination, Container, Grid, Input} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Products from './products';
import DepartmentDropdown from './departments_dropdown'
import PromotionsDropdown from "./promotionss_dropdown";

class SearchableProducts extends React.Component {
	state = {
		products: [],
		pages: 1,
		page: 1,
		departments: [],
		promotions: [],
		filters: {
			promotion: '',
			department: '',
			product_text: ''
		}
	}

	componentDidMount() {
		this.update_products(this.state.filters, '1')
		fetch('http://localhost:3000/v1/departments').then(res =>
			res.json()).then(this.loadDepartments)
		fetch('http://localhost:3000/v1/promotions').then(res =>
			res.json()).then(this.loadPromotions)
	}

	loadProducts = (res) => {
		this.setState({...this.state, products: res.products, pages: res.pages, page: res.page})
	}

	loadDepartments = (res) => {
		this.setState({...this.state, departments: res})
	}

	loadPromotions = (res) => {
		this.setState({...this.state, promotions: res})
	}

	handleDepartmentChangeSelection = (e, data) => {
		let new_filters = this.state.filters
		new_filters.department = data.value
		this.update_products(new_filters, '1')
	}

	handlePromotionsChangeSelection = (e, data) => {
		let new_filters = this.state.filters
		new_filters.promotion = data.value
		this.update_products(new_filters, '1')
	}

	handleProductTextSearch = (e, data) => {
		let new_filters = this.state.filters
		new_filters.product_text = data.value
		this.update_products(new_filters, '1')
	}

	update_products = (new_filters, page) => {
		this.setState({...this.state, filters: new_filters})
		fetch('http://localhost:3000/v1/products/search?page=1&department_id=' + new_filters.department +
			'&promotion_id=' + new_filters.promotion + '&product_text=' + new_filters.product_text + '&page=' + page).then(res =>
			res.json()).then(this.loadProducts)
	}

	handlePage =
		(e, {activePage}) => {
		let pageString = activePage.toString()
		this.update_products(this.state.filters, pageString)
	}

	render() {
		return (
			<Container>
				<Grid>
					<Grid.Row>
						<Grid.Column width={9}>
							<Input fluid onChange={this.handleProductTextSearch} placeholder='Search...'/>
						</Grid.Column>
						<Grid.Column>
							<DepartmentDropdown handleDepartmentChangeSelection={this.handleDepartmentChangeSelection}
												departments={this.state.departments}/>
						</Grid.Column>
						<Grid.Column>
							<PromotionsDropdown handlePromotionsChangeSelection={this.handlePromotionsChangeSelection}
												promotions={this.state.promotions}/>
						</Grid.Column>
					</Grid.Row>
				</Grid>

				<Products products={this.state.products || []}/>

				<Pagination onPageChange={this.handlePage} size='mini' siblingRange="6"
							defaultActivePage={this.state.page}
							totalPages={this.state.pages}/>
			</Container>
		)
	}
}

export default SearchableProducts;
