import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getSubdomain } from "../utils/subdomain";
import SubdomainContext from "./SubdomainContext";

import { fetchInstitutionBySubdomain } from '../utils/firebase';

export const SubdomainProvider = ({ children }) => {
  const [subdomainData, setSubdomainData] = useState(null);
  const subdomain = getSubdomain();

  console.log(subdomain);

  useEffect(() => {
    const fetchData = async () => {
      if (subdomain) {
        const data = await fetchInstitutionBySubdomain(subdomain);
        setSubdomainData(data);
      }
    };
    fetchData();
  }, [subdomain]);

  return (
    <SubdomainContext.Provider value={subdomainData}>
      {children}
    </SubdomainContext.Provider>
  );
};

SubdomainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
