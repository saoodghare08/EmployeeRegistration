import React from 'react'
import DataTable from 'react-data-table-component'


// A super simple expandable component.
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;


const columns = [
    {
        name: 'Index',
        selector: row => row.id,
        sortable: true,
    },
	{
		name: 'Title',
		selector: row => row.title,
        sortable: true,
	},
	{
		name: 'Year',
		selector: row => row.year,
        sortable: true,
	},
];

const data = [
  	{
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
	},
  	{
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
	},
  	{
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
	},
  	{
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
	},
  	{
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
	},
  	{
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
	},
  	{
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
	},
]


const DataTableExample = () => {
  return (
    <DataTable
			columns={columns}
			data={data}
            pagination
            fixedHeader
            highlightOnHover
            striped
            pointerOnHover
            selectableRows
            expandableRows
            fixedHeaderScrollHeight='300px'
			expandableRowsComponent={ExpandedComponent}
		/>
  )
}

export default DataTableExample