import React, {useState, useEffect} from "react";
import {Pagination, Container, Grid, Input} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Products from './products';
import DepartmentDropdown from './departments_dropdown'
import PromotionsDropdown from "./promotionss_dropdown";

function SearchableProducts() {
	const [products, setProducts] = useState([]);
	const [departments, setDepartments] = useState([]);
	const [promotions, setPromotions] = useState([]);
	const [pages, setPages] = useState(1);
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState({
		promotion: '',
		department: '',
		product_text: ''
	});

	useEffect(() => {
		update_products(filters, '1')
		fetch('http://localhost:3000/v1/departments').then(res =>
			res.json()).then(loadDepartments)
		fetch('http://localhost:3000/v1/promotions').then(res =>
			res.json()).then(loadPromotions)
	}, [])

	function loadProducts(res) {
		setPage(res.page)
		setPages(res.pages)
		setProducts(res.products)
	}

	function loadDepartments(res) {
		setDepartments(res)
	}

	function loadPromotions(res) {
		setPromotions(res)
	}

	function handleDepartmentChangeSelection(e, data) {
		filters.department = data.value
		update_products(filters, '1')
	}

	function handlePromotionsChangeSelection(e, data) {
		filters.promotion = data.value
		update_products(filters, '1')
	}

	function handleProductTextSearch(e, data) {
		filters.product_text = data.value
		update_products(filters, '1')
	}

	function update_products(new_filters, page) {
		setFilters(new_filters)
		fetch('http://localhost:3000/v1/products/search_products?page=1&department_id=' + new_filters.department +
			'&promotion_id=' + new_filters.promotion + '&product_text=' + new_filters.product_text + '&page=' + page).then(res =>
			res.json()).then(loadProducts)
	}

	function handlePage(e, {activePage}) {
		let pageString = activePage.toString()
		update_products(filters, pageString)
	}

	return (
		<Container>
			<Grid>
				<Grid.Row>
					<Grid.Column width={9}>
						<Input fluid onChange={handleProductTextSearch} placeholder='Search...'/>
					</Grid.Column>
					<Grid.Column>
						<DepartmentDropdown handleDepartmentChangeSelection={handleDepartmentChangeSelection}
											departments={departments}/>
					</Grid.Column>
					<Grid.Column>
						<PromotionsDropdown handlePromotionsChangeSelection={handlePromotionsChangeSelection}
											promotions={promotions}/>
					</Grid.Column>
				</Grid.Row>
			</Grid>

			<Products products={products || []}/>

			<Pagination onPageChange={handlePage} class={'fluid'} size='mini' siblingRange="6"
						defaultActivePage={page}
						totalPages={pages}/>
		</Container>
	)
}

export default SearchableProducts;
