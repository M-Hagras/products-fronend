import React from "react";
import {Table} from 'semantic-ui-react'
import Product from './product';

function Products(props) {
	return (
		<Table celled>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Name</Table.HeaderCell>
					<Table.HeaderCell>Price</Table.HeaderCell>
					<Table.HeaderCell>Department</Table.HeaderCell>
					<Table.HeaderCell>Promotions</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{props.products.map((product) => <Product key={product.id} product={product}/>)}
			</Table.Body>
		</Table>
	)
}

export default Products;
