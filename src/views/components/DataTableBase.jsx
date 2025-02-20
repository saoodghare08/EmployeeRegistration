import React from 'react';
import DataTable from 'react-data-table-component';
import ExpandedComponent from './ExpandedComponent'; // Import ExpandedComponent here

function DataTableBase(props) {
  return (



    <DataTable
      pagination
      fixedHeader
      fixedHeaderScrollHeight="500px"
      highlightOnHover
      striped
      pointerOnHover
      expandableRows
      expandableRowExpanded={(row) => row.defaultExpanded}
      expandableRowsComponent={ExpandedComponent}
      {...props}
    />
    
  );
}

export default DataTableBase;
