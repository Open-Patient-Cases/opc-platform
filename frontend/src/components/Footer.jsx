import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Footer = () => (
  <Container
    style={{ textAlign: "center", marginTop: "2rem", padding: "1rem 0" }}
  >
    <Typography variant="body2" color="textSecondary">
      &copy; 2024 Research to the People
    </Typography>
  </Container>
);

export default Footer;
