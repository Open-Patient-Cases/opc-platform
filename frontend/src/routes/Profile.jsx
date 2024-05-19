import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  IconButton,
  Paper,
  Avatar,
  Alert,
} from "@mui/material";
import { Delete, Notifications } from "@mui/icons-material";
import { Formik, FieldArray, Form } from "formik";
import * as Yup from "yup";
import {
  saveUserProfile,
  addApplication,
  listenToApplicationData,
} from "../utils/firebase"; // Import the utility function
import { useSubdomain } from "../context/SubdomainContext";

const validationSchema = Yup.object().shape({
  institution: Yup.string().required("Institution/Organization is required"),
  position: Yup.string().required("Position is required"),
  linkedin: Yup.string().url("Invalid URL"),
  degrees: Yup.array()
    .of(
      Yup.object().shape({
        university: Yup.string(),
        specialty: Yup.string(),
      })
    )
    .min(1, "At least one degree is required"),
  professionalEmail: Yup.string()
    .email("Invalid email")
    .required("Professional email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
});

export default function Profile() {
  const [initialValues, setInitialValues] = useState({
    institution: "",
    position: "",
    linkedin: "",
    degrees: [{ university: "", specialty: ""}],
    professionalEmail: "",
    phoneNumber: "",
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await saveUserProfile(values);
      console.log("Profile data successfully saved");
    } catch (error) {
      console.error("Error saving profile data:", error);
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const { userData, user, subdomainData } = useSubdomain();
  useEffect(() => {
    if (userData) {
      setInitialValues(userData);
    }
  }, [userData]);

  const complete = userData.institution
    ? userData.institution.length
    : false > 0 && userData.position
    ? userData.position.length > 0
    : false;

  function apply() {
    addApplication(user.uid, subdomainData.id);
  }
  const [applicationData, setApplicationData] = useState(null);
  useEffect(() => {
    if (user) {
      const unsubscribe = listenToApplicationData(
        subdomainData.id,
        user.uid,
        setApplicationData
      ); // Replace 'institutionId' with the actual institution ID
      return () => unsubscribe(); // Cleanup subscription on unmount
    }
  }, [subdomainData, user]);

  const applyComponent = !complete ? (
    <Box p={2}>
      <Alert icon={<Notifications fontSize="inherit" />} severity="warning">
        Your profile is incomplete. Please fill in the required fields to apply.
      </Alert>
    </Box>
  ) : (
    <Box p={2}>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        onClick={() => apply()}
      >
        Apply
      </Button>
    </Box>
  );

  return (
    <Container component="main" maxWidth="sm">
      {!applicationData && applyComponent}
      {applicationData && applicationData.status == "pending" && (
        <Box p={2}>
          <Alert icon={<Notifications fontSize="inherit" />} severity="info">
            Waiting for approval
          </Alert>
        </Box>
      )}
      <Box p={2} display="flex" justifyContent="center" alignItems="center">
        <Paper>
          <Box p={2} textAlign="center">
            <Avatar
              alt={user.displayName}
              src={user.photoURL}
              sx={{ width: 100, height: 100, margin: "0 auto" }}
            />
            <Typography variant="h4" gutterBottom>
              {user.displayName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {user.email}
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography component="h1" variant="h5" gutterBottom>
          Professional
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="institution"
                label="Institution/Organization"
                name="institution"
                autoComplete="institution"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.institution}
                error={touched.institution && Boolean(errors.institution)}
                helperText={touched.institution && errors.institution}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="position"
                label="Position"
                name="position"
                autoComplete="position"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.position}
                error={touched.position && Boolean(errors.position)}
                helperText={touched.position && errors.position}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="linkedin"
                label="LinkedIn (Optional)"
                name="linkedin"
                autoComplete="linkedin"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.linkedin}
                error={touched.linkedin && Boolean(errors.linkedin)}
                helperText={touched.linkedin && errors.linkedin}
              />

              <Typography
                component="h1"
                variant="h5"
                gutterBottom
                sx={{ mt: 4 }}
              >
                Education
              </Typography>
              <FieldArray name="degrees">
                {({ push, remove }) => (
                  <>
                    {values.degrees.map((degree, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item xs>
                            <Typography variant="h6" gutterBottom>
                              Degree {index + 1}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <IconButton onClick={() => remove(index)}>
                              <Delete />
                            </IconButton>
                          </Grid>
                        </Grid>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id={`degrees.${index}.university`}
                          label="University"
                          name={`degrees[${index}].university`}
                          autoComplete="university"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={degree.university}
                          error={
                            touched.degrees?.[index]?.university &&
                            Boolean(errors.degrees?.[index]?.university)
                          }
                          helperText={
                            touched.degrees?.[index]?.university &&
                            errors.degrees?.[index]?.university
                          }
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id={`degrees.${index}.specialty`}
                          label="Specialty"
                          name={`degrees[${index}].specialty`}
                          autoComplete="specialty"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={degree.specialty}
                          error={
                            touched.degrees?.[index]?.specialty &&
                            Boolean(errors.degrees?.[index]?.specialty)
                          }
                          helperText={
                            touched.degrees?.[index]?.specialty &&
                            errors.degrees?.[index]?.specialty
                          }
                        />
                      </Box>
                    ))}
                    <Button
                      type="button"
                      fullWidth
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        push({
                          university: "",
                          specialty: "",
                        })
                      }
                      sx={{ mb: 2 }}
                    >
                      Add one more degree
                    </Button>
                  </>
                )}
              </FieldArray>

              <Typography
                component="h1"
                variant="h5"
                gutterBottom
                sx={{ mt: 4 }}
              >
                Contact
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="professionalEmail"
                label="Professional Email"
                name="professionalEmail"
                autoComplete="professionalEmail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.professionalEmail}
                error={
                  touched.professionalEmail && Boolean(errors.professionalEmail)
                }
                helperText={
                  touched.professionalEmail && errors.professionalEmail
                }
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />

              {errors.submit && (
                <Typography
                  color="error"
                  variant="body2"
                  align="center"
                  sx={{ mt: 2 }}
                >
                  {errors.submit}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                disabled={isSubmitting}
              >
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
