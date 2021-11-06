import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
import EditIcon from "@mui/icons-material/Edit";
import QrCodeIcon from "@mui/icons-material/QrCode";

export default function DataTable({ data, changePoiActivity, editPoi, showQr, setMapPoi }) {
  const [selectionModel, setSelectionModel] = React.useState([]);
  console.log(data);
  //rows and columns
  const handleActivate = React.useCallback(
    (id, isActive) => () => {
      setTimeout(() => {
        changePoiActivity(id, isActive);
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

  const handleQr = React.useCallback(
    (inputWebsite) => () => {
      setTimeout(() => {
        showQr(inputWebsite);
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
        width: 120,
        getActions: (params) => [
          params.row.isActive ? (
            <GridActionsCellItem
              icon={<BlockIcon />}
              label="Activate"
              onClick={handleActivate(params.id, params.row.isActive)}
            />
          ) : (
            <GridActionsCellItem
              icon={<CheckIcon />}
              label="Activate"
              onClick={handleActivate(params.id)}
            />
          ),
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEdit(params.id)} />,
          <GridActionsCellItem
            icon={<QrCodeIcon />}
            label="Qr"
            onClick={handleQr(params.row.inputWebsite)}
          />,
        ],
      },
    ],
    [handleActivate, handleEdit, handleQr]
  );

  return (
    <div style={{ height: 500, width: "80%", backgroundColor: "white" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
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
