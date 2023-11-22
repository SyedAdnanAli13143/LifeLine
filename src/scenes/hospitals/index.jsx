import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Hospitals = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5206/api/Hospital_Cr');
        if (response.ok) {
          const data = await response.json();
          setHospitals(data);
        } else {
          console.error('Failed to fetch data from the API');
        }
      } catch (error) {
        console.error('Error during data fetching:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const columns = [
    { field: "hId", headerName: "ID" },
    { field: "hName", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "hAddress", headerName: "Address", type: "string", headerAlign: "left", align: "left" },
    { field: "hEmail", headerName: "Email", flex: 1 },
    { field: "hlLatitude", headerName: "Latitude", flex: 1 },
    { field: "hlLongitude", headerName: "Longitude", flex: 1 },
    {
      field: "Edit",
      headerName: "",
      flex: 1,
      renderCell: ({ row: { hId } }) => (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          borderRadius="4px"
        >
          <Link to={`/edit-hospital/${hId}`}>
            <Button
              variant="contained"
              color="primary"
              style={{ background: "#70d8bd", color: "black" }}
            >
              Edit
            </Button>
          </Link>
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            
          </Typography>
        </Box>
      ),
    },
  ];
  const getRowId = (row) => row.hId;

  return (
    <Box m="20px">
      <Box style={{ display: 'flex' }}>
        <Header title="HOSPITALS" subtitle="List of Hospitals Registered" />
        <Link to="/add-hospital" style={{ marginLeft: 'auto' }}>
          <Button variant="contained" color="primary" style={{ fontSize: "15px", background: "#70d8bd", color: "black" }}>
            Add a hospital
          </Button>
        </Link>
      </Box>
      <Box
        m="0px 0 0 0"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={hospitals}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={getRowId}
        />
      </Box>
    </Box>
  );
};

export default Hospitals;
