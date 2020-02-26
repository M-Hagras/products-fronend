import React from "react";
import {Table} from 'semantic-ui-react'

class Product extends React.Component {
	render() {
		return (
			<Table.Row>
				<Table.Cell>
					{this.props.product.name}
				</Table.Cell>
				<Table.Cell>
					{this.props.product.price}
				</Table.Cell>
				<Table.Cell>
					{this.props.product.department.name}
				</Table.Cell>
				<Table.Cell>
					{this.props.product.promotions.map(p => p.code + '\n')}
				</Table.Cell>

			</Table.Row>
		)
	}
}

export default Product;
