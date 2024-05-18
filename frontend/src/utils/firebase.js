import { collection, query, where, getDocs, getDoc, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

export const saveUserProfile = async (profileData) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User is not authenticated');
  }

  const userRef = doc(db, 'users', user.uid);
  try {
    await setDoc(userRef, profileData, { merge: true });
    console.log('Profile data successfully saved');
  } catch (error) {
    console.error('Error saving profile data:', error);
    throw new Error('Error saving profile data');
  }
};

export async function fetchUserDoc(uid) {
  try {
    const userDocRef = doc(db, 'users', uid);
    const querySnapshot = await getDoc(userDocRef);

    if (querySnapshot.exists()) {
      return querySnapshot.data();
    } else {
      console.log('No matching documents.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function fetchInstitutionBySubdomain(subdomain) {
  const institutionsRef = collection(db, 'institutions');
  const q = query(institutionsRef, where('urls', 'array-contains', subdomain));

  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const institutions = [];
      querySnapshot.forEach((doc) => {
        institutions.push({ id: doc.id, ...doc.data() });
      });
      return institutions[0]; // Assuming you want the first match
    } else {
      console.log('No matching documents.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}