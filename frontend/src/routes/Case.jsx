import { fetchCaseByCaseId } from "../utils/firebase";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
    Box,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    Grid,
    Toolbar,
    Hidden,
    Avatar,
    Typography,
    Button,
    Card,
    CardContent,
} from '@mui/material';


const drawerWidth = 180;

export default function Case() {

    const { id } = useParams();
    const [caseDetails, setCaseDetails] = useState(null);

    // TODO 
    // Fetch case details using the case ID from URL params
    const fetchCaseDetails = async () => {
        try {
            console.log("id is: " + id);
            const data = await fetchCaseByCaseId(id);
            setCaseDetails(data);
        } catch (error) {
            console.error("Error fetching case data:", error);
        }
    };

    useEffect(() => {
        fetchCaseDetails();
    }, [id]);

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                {/* Side bar with section links */}
                {/* TODO Links not working */}
                <Hidden smDown>
                    <Drawer
                        variant="permanent"
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
                        }}
                    >
                        <Toolbar />
                        <Divider />
                        <List>
                            <ListItem button>
                                <ListItemText primary="Introduction" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Medical Records" />
                            </ListItem>
                            {/* Add more sidebar items as needed */}
                        </List>
                    </Drawer>
                </Hidden>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                    }}
                >
                    {/* this is for vertical spacing */}
                    <Toolbar />

                    <Grid container spacing={3}>

                        {/* User profile grid */}
                        <Grid item xs={12} sm={3}>
                            <Box display="flex" justifyContent="center">
                                {/* TODO: FIX AVATAR, needs to be bigger, and crops images to much*/}
                                <Avatar sx={{ bgcolor: 'gray', width: 150, height: 150 }}>
                                    {!caseDetails?.patient?.pictureUrl ? '?' : <img src={caseDetails.patient.pictureUrl} alt="Patient" />}
                                </Avatar>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <Typography variant="h5">{caseDetails?.patient?.name}</Typography>
                            <Typography variant="subtitle1">{caseDetails?.diagnosisName}</Typography>
                            <Typography variant="subtitle1" sx={{ color: caseDetails?.status === 'active' ? 'green' : 'red' }}>
                                {caseDetails?.status.charAt(0).toUpperCase() + caseDetails?.status.slice(1)}
                            </Typography>
                            {/* TODO: Buttons have no functionality right now */}
                            <Box mt={2} display="flex" >
                                <Button sx={{ mr: 1 }} variant="contained" color="primary">Join Case</Button>
                                <Button sx={{ mr: 1 }} variant="outlined" color="primary">Publications</Button>
                            </Box>
                        </Grid>

                        {/* Stat card */}
                        <Grid item xs={12}>
                            <Card >
                                <CardContent>
                                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                        <Box mr={6}>
                                            <Typography variant="body1" textAlign="center">
                                                <Box sx={{ width: 1 }}> <strong>Age</strong> </Box> {caseDetails?.patient?.age}
                                            </Typography>
                                        </Box>
                                        <Box mr={6}>
                                            <Typography variant="body1" textAlign="center">
                                                <Box sx={{ width: 1 }}> <strong>Gender</strong> </Box>{caseDetails?.patient?.gender}
                                            </Typography>
                                        </Box>
                                        <Box mr={6}>
                                            <Typography variant="body1" textAlign="center">
                                                <Box sx={{ width: 1 }}>  <strong>Age of Diagnosis</strong> </Box>{caseDetails?.patient?.ageOfDiagnosis}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body1" textAlign="center top">
                                            <Box sx={{ width: 1 }}>  <strong>Years in Research:</strong></Box> {caseDetails?.yearsInResearch}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Introduction */}
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6">Introduction</Typography>
                            <Typography variant="body1">
                                {caseDetails?.introduction}
                            </Typography>
                        </Grid>

                        {/* Video horizontal scroll */}
                        <Grid item xs={12} sm="auto" >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    p: 1,
                                }}
                            >
                                {caseDetails?.videoUrl && (
                                    <Box>
                                        <iframe
                                            width="100%"
                                            height="200"
                                            src={caseDetails.videoUrl}
                                            title="Video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Grid>

                    </Grid>

                </Box>
            </Box>

        </>
    );
}