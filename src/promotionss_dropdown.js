import React from 'react'
import {Dropdown} from 'semantic-ui-react'

function PromotionsDropdown(props) {
	return (
		<Dropdown placeholder='Promotion' search selection clearable onChange={props.handlePromotionsChangeSelection}
				  options={props.promotions.map((promo) => ({key: promo.id, text: promo.code, value: promo.id}))}/>
	)
}

export default PromotionsDropdown;