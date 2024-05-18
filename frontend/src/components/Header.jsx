import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useSubdomain } from "../context/SubdomainContext";

const Header = () => {
  const subdomain = useSubdomain();
  return (
    <AppBar position="static">
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
            <Button color="inherit">Cases</Button>
            <Button color="inherit">Journal</Button>
          </Grid>
          <Grid item xs />
          <Grid item>
            <Button color="inherit">Log in</Button>
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
