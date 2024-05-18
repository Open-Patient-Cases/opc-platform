import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SubdomainContext from "./SubdomainContext";

import { fetchInstitutionBySubdomain } from '../utils/firebase';

import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export const SubdomainProvider = ({ children }) => {
  const [subdomainData, setSubdomainData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        // User is signed in, update state or fetch additional user data if needed
      } else {
        // User is signed out, handle state change if needed
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (window.location.hostname) {
        try {
          const data = await fetchInstitutionBySubdomain(window.location.hostname);
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SubdomainContext.Provider value={{ subdomainData, user }}>
      {children}
    </SubdomainContext.Provider>
  );
};

SubdomainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
