import { getDatabase, ref, get } from "firebase/database";

export async function fetchData(subdomain, path) {
  const db = getDatabase();
  const dataRef = ref(db, `customers/${subdomain}/${path}`);
  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available at this path for this subdomain.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}