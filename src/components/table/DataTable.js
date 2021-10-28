import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function DataTable({ data, deletePoi, editPoi }) {
  const [mapPoi, setMapPoi] = React.useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]);
  //rows and columns
  const handleDelete = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        deletePoi(id);
      });
    },
    []
  );

  const handleEdit = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        editPoi(id);
      });
    },
    []
  );

  const handleSelect = (newSelectionModel) => {
    console.log(newSelectionModel);

    const poi = data.filter((dataItem) => {
      return newSelectionModel.includes(dataItem.id);
    });
    setMapPoi(poi);
    console.log(poi);
    setSelectionModel(newSelectionModel);
  };

  const columns = React.useMemo(
    () => [
      { field: "title", headerName: "Title", minWidth: 120 },
      { field: "latitude", headerName: "Latitude", minWidth: 130 },
      { field: "longitude", headerName: "Longitude", minWidth: 150 },
      {
        field: "description",
        headerName: "Description",
        sortable: false,
        minWidth: 160,
        valueGetter: (params) =>
          `${params.getValue(params.id, "title") || ""} ${
            params.getValue(params.id, "inputWebsite") || ""
          }`,
      },
      { field: "inputWebsite", headerName: "Website", minWidth: 130 },
      {
        field: "isActive",
        headerName: "Avtive POI",
        minWidth: 150,
      },
      {
        field: "actions",
        type: "actions",
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDelete(params.id)}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEdit(params.id)}
          />,
        ],
      },
    ],
    [handleDelete, handleEdit]
  );

  return (
    <div style={{ height: 400, width: "80%", margin: 10 }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(newSelectionModel) => {
          handleSelect(newSelectionModel);
        }}
        selectionModel={selectionModel}
      />
    </div>
  );
}
