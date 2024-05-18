import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getSubdomain } from "../utils/subdomain";
import SubdomainContext from "./SubdomainContext";

import { fetchInstitutionBySubdomain } from '../utils/firebase';

export const SubdomainProvider = ({ children }) => {
  const [subdomainData, setSubdomainData] = useState(null);
  const [loading, setLoading] = useState(true);
  const subdomain = getSubdomain();

  useEffect(() => {
    const fetchData = async () => {
      const subdomain = getSubdomain();
      if (subdomain) {
        try {
          const data = await fetchInstitutionBySubdomain(subdomain);
          setSubdomainData(data);
        } catch (error) {
          console.error("Error fetching subdomain data:", error);
        } finally {
          setLoading(false); // Set loading to false after data is fetched
        }
      } else {
        setLoading(false); // Set loading to false if no subdomain
      }
    };
    fetchData();
  }, [subdomain]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SubdomainContext.Provider value={subdomainData}>
      {children}
    </SubdomainContext.Provider>
  );
};

SubdomainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
