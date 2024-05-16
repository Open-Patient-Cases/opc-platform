import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const MainContent = () => (
  <Container style={{ textAlign: "center", marginTop: "2rem" }}>
    <Typography variant="h3" gutterBottom>
      Open Patient-Partnered Research
    </Typography>
    <Typography variant="h5" gutterBottom>
      For Oncology and Rare Disease.
    </Typography>
    <Button variant="contained" color="primary" style={{ marginTop: "1rem" }}>
      See Patient Cases
    </Button>
  </Container>
);

export default MainContent;
