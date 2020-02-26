import React from "react";
import {Table} from 'semantic-ui-react'

function Product(props) {
	return (
		<Table.Row>
			<Table.Cell>
				{props.product.name}
			</Table.Cell>
			<Table.Cell>
				{props.product.price}
			</Table.Cell>
			<Table.Cell>
				{props.product.department.name}
			</Table.Cell>
			<Table.Cell>
				{props.product.promotions.map(p => p.code + '\n')}
			</Table.Cell>

		</Table.Row>
	)
}

export default Product;
