import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useSubdomain } from "../context/SubdomainContext";

import { useNavigate } from 'react-router-dom';

const Header = () => {
  const subdomain = useSubdomain();
  const navigate = useNavigate()
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Helmet>
        <title>
          {subdomain ? `${subdomain.name}` : "Research to the People"}
        </title>
      </Helmet>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <Box display="flex" alignItems="center">
              <img
                src={subdomain.logo}
                alt="Logo"
                style={{ height: 40, marginRight: 16 }}
              />
            </Box>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={() => navigate("/cases")}>Cases</Button>
            <Button color="inherit">Journal</Button>
          </Grid>
          <Grid item xs />
          <Grid item>
            <Button color="inherit" onClick={() => navigate("/signup")}>Sign up</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  subdomain: PropTypes.string,
};

export default Header;
