import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
import EditIcon from "@mui/icons-material/Edit";
import QrCodeIcon from "@mui/icons-material/QrCode";

export default function DataTable({
  data,
  changePoiActivity,
  editPoi,
  showQr,
  setMapPoi,
  fullFunctions,
}) {
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
      { field: "title", headerName: "Title", flex: 0.15, minWidth: 100 },
      { field: "latitude", headerName: "Latitude", flex: 0.1, minWidth: 100 },
      { field: "longitude", headerName: "Longitude", flex: 0.1, minWidth: 100 },
      {
        field: "description",
        headerName: "Description",
        sortable: false,
        flex: 0.2,
        minWidth: 100,
      },
      { field: "inputWebsite", headerName: "Website", flex: 0.2, minWidth: 100 },
      {
        field: "isActive",
        headerName: "Avtive POI",
        flex: 0.1,
        minWidth: 50,
      },
      {
        field: "actions",
        type: "actions",
        flex: 0.1,
        minWidth: 100,
        getActions: (params) => [
          fullFunctions ? (
            <div>
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                onClick={handleEdit(params.id)}
              />
              {params.row.isActive ? (
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
              )}
            </div>
          ) : (
            <div></div>
          ),
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
    <div style={{ height: 350, width: "80%", backgroundColor: "white" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
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
