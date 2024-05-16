import { createContext, useContext } from 'react';

const SubdomainContext = createContext(null);

export const useSubdomain = () => useContext(SubdomainContext);

export default SubdomainContext;