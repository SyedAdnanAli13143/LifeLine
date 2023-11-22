import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import { useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const libraries = ["places"];
let searchBox;

const AddHospital = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [selectedLocation, setSelectedLocation] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });

  const handleFormSubmit = (values, { resetForm }) => {
    // Include the selectedLocation data in the form submission
    values.H_Latitude = selectedLocation.lat;
    values.H_Longitude = selectedLocation.lng;
    console.log(values);

    // Reset the form after submission (optional)
    resetForm();
  };

  const formik = useFormik({
    initialValues,
    validationSchema: checkoutSchema,
    onSubmit: handleFormSubmit,
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  
  const handlePlaceSelect = (place) => {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setSelectedLocation({ lat, lng });
    const address = place.formatted_address || "";
    formik.setFieldValue("H_Latitude", lat);
    formik.setFieldValue("H_Longitude", lng);
    formik.setFieldValue("H_Address", address);
  };
  


  return (
    <Box m="20px">
      <Header title="Add Hospital" subtitle="Create a New Hospital" />

      <form onSubmit={handleSubmit}>
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
            type="text"
            label="Hospital Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.H_Name}
            name="H_Name"
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
            value={values.H_Email}
            name="H_Email"
            error={!!touched.H_Email && !!errors.H_Email}
            helperText={touched.H_Email && errors.H_Email}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Address"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.H_Address}
            name="H_Address"
            // error={!!touched.H_Address && !!errors.H_Address}
            // helperText={touched.H_Address && errors.H_Address}
            sx={{ gridColumn: "span 4" }}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Latitude"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.H_Latitude || ""}
            name="H_Latitude"
            // error={!!touched.H_Latitude && !!errors.H_Latitude}
            // helperText={touched.H_Latitude && errors.H_Latitude}
            sx={{ gridColumn: "span 2" }}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Longitude"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.H_Longitude || ""}
            name="H_Longitude"
            // error={!!touched.H_Longitude && !!errors.H_Longitude}
            // helperText={touched.H_Longitude && errors.H_Longitude}
            sx={{ gridColumn: "span 2" }}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              width: "calc(100% - 20px)",
              marginBottom: "10px",
            }}
          >
            <LoadScript
              googleMapsApiKey="AIzaSyDQlMeYeoLQT6ZEdekJhVEyNr_XXC5ovYY"
              libraries={libraries}
            >
              <StandaloneSearchBox
                onLoad={(ref) => (searchBox = ref)}
                onPlacesChanged={() => {
                  handlePlaceSelect(searchBox.getPlaces()[0]);
                }}
              >
                <input
                  type="text"
                  placeholder="Search for a location"
                  style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `100%`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    marginTop: "20px",
                  }}
                />
              </StandaloneSearchBox>
            </LoadScript>
          </div>
          <br />
          <LoadScript
            googleMapsApiKey="AIzaSyDQlMeYeoLQT6ZEdekJhVEyNr_XXC5ovYY"
            libraries={libraries}
          >
            <GoogleMap
              mapContainerStyle={{ height: "400px", width: "100%", marginTop: "60px" }}
              center={selectedLocation}
              zoom={15}
            >
              {selectedLocation && <Marker position={selectedLocation} />}
            </GoogleMap>
          </LoadScript>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            style={{ fontSize: "15px", background: "#70d8bd", color: "black" }}
          >
            Add Hospital
          </Button>
        </Box>
      </form>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  H_Name: yup.string().required("required"),
  H_Email: yup.string().email("invalid email").required("required"),
  H_Latitude: yup.string().required("required"),
  H_Longitude: yup.string().required("required"),
  H_Address: yup.string().required("required"),
});

const initialValues = {
  H_Name: "",
  H_Email: "",
  H_Latitude: "",
  H_Longitude: "",
  H_Address: "",
};

export default AddHospital;
