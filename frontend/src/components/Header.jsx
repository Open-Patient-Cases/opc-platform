import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useSubdomain } from "../context/SubdomainContext";

import { useNavigate } from 'react-router-dom';
import { Circle } from "@mui/icons-material";

const Header = () => {
  const { subdomainData, user, userData } = useSubdomain();
  const complete = (userData.institution ? userData.institution.length : false > 0 && userData.position ? userData.position.length > 0 : false)

  const navigate = useNavigate()
  return (
    <AppBar position="static">
      <Helmet>
        <title>
          {subdomainData ? `${subdomainData.name}` : "Research to the People"}
        </title>
      </Helmet>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <Box display="flex" alignItems="center" onClick={() => navigate("/")}>
              <img
                src={subdomainData.logo}
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
            {
              user ?
              (!complete ? <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                badgeContent={
                  <Circle sx={{ color: "red" }} />
                }
              >
                <Avatar src={user.photoURL} onClick={() => navigate("/profile")} /> 
              </Badge> : <Avatar src={user.photoURL} onClick={() => navigate("/profile")} />)
              :
              <Button color="inherit" onClick={() => navigate("/signup")}>Sign Up</Button>
            }
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
