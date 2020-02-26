import React from 'react'
import {Dropdown} from 'semantic-ui-react'


function DepartmentDropdown(props){
	return (
		<Dropdown placeholder='Department' search selection clearable onChange={props.handleDepartmentChangeSelection}
				  options={props.departments.map((dep) => ({key: dep.id, text: dep.name, value: dep.id}))}/>
	)
}

export default DepartmentDropdown;