import PropTypes from "prop-types";
import { getSubdomain } from "../utils/subdomain";
import SubdomainContext from "./SubdomainContext";

export const SubdomainProvider = ({ children }) => {
  const subdomain = getSubdomain();
  return (
    <SubdomainContext.Provider value={subdomain}>
      {children}
    </SubdomainContext.Provider>
  );
};

SubdomainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
