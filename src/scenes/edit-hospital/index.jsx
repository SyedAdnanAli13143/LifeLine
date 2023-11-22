import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";

const EditHospital = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } = useParams();
  const [hospitalData, setHospitalData] = useState(null);

  useEffect(() => {
    // Fetch hospital details based on the ID and set the data
    const fetchHospitalData = async () => {
      try {
        const response = await fetch(`http://localhost:5206/api/Hospital_Cr/${id}`);
        if (response.ok) {
          const data = await response.json();
          setHospitalData(data);
        } else {
          // Handle error
          console.error("Failed to fetch hospital data");
        }
      } catch (error) {
        console.error("Error during data fetch:", error);
      }
    };

    fetchHospitalData();
  }, [id]);

  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch(`http://localhost:5206/api/Hospital_Cr/${values.hId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          H_Name: values.hName,
          H_Email: values.hEmail,
          H_Latitude: values.hlLatitude,
          H_Longitude: values.hlLongitude,
          H_Address: values.hAddress,
        }),
      });

      if (response.ok) {
        // Hospital data updated successfully
        // You can add any additional logic or notifications here

        // Redirect to the hospitals page
        window.location.href = '/hospitals';
      } else {
        // Handle error
        console.error('Failed to update hospital data');
      }
    } catch (error) {
      console.error('Error during hospital data update:', error);
    }
  };

  if (!hospitalData) {
    // You can display a loading indicator here
    return <div>Loading...</div>;
  }

  return (
    <Box m="20px">
      <Header title="Edit Hospital" subtitle="Edit an existing hospital" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={hospitalData}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleFormSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Hospital ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.hId}
                name="H_ID"
                error={touched.H_ID && !!errors.H_ID}
                helperText={touched.H_ID && errors.H_ID}
                sx={{ gridColumn: 'span 2' }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Hospital Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.hName}
                name="hName"
                error={!!touched.H_Name && !!errors.H_Name}
                helperText={touched.H_Name && errors.H_Name}
                sx={{ gridColumn: "span 2" }}
              />
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.hEmail}
                name="hEmail"
                error={!!touched.H_Email && !!errors.H_Email}
                helperText={touched.H_Email && errors.H_Email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Latitude"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.hlLatitude}
                name="hlLatitude"
                error={!!touched.H_Latitude && !!errors.H_Latitude}
                helperText={touched.H_Latitude && errors.H_Latitude}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Longitude"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.hlLongitude}
                name="hlLongitude"
                error={!!touched.H_Longitude && !!errors.H_Longitude}
                helperText={touched.H_Longitude && errors.H_Longitude}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.hAddress}
                name="hAddress"
                error={!!touched.H_Address && !!errors.H_Address}
                helperText={touched.H_Address && errors.H_Address}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" style={{fontSize: "15px", background:"#70d8bd", color: "black", marginRight:'15px'}}>
                Update Hospital
              </Button>
              <Button type="submit" color="secondary" variant="contained" style={{fontSize: "15px", background:"#FF1D18", color: "white"}}>
                Delete Hospital
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  H_ID: yup.number(),
  H_Name: yup.string().required("required"),
  H_Email: yup.string().email("invalid email").required("required"),
  H_Latitude: yup.string().required("required"),
  H_Longitude: yup.string().required("required"),
  H_Address: yup.string().required("required"),
});

export default EditHospital;
