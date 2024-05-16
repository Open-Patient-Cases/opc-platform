import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useSubdomain } from "../context/SubdomainContext";

const Header = () => {
  const subdomain = useSubdomain();
  return (
    <AppBar position="static">
      <Toolbar>
        <Helmet>
          <title>
            {subdomain
              ? `${subdomain} - Research to the People`
              : "Research to the People"}
          </title>
        </Helmet>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {subdomain} Research to the People
        </Typography>
        <Button color="inherit">Cases</Button>
        <Button color="inherit">Journal</Button>
        <Button color="inherit">Give</Button>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  subdomain: PropTypes.string,
};

export default Header;
