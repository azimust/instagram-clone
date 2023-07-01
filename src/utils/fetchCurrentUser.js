import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

const useFetchCurrentUser = () => {

    const fetchUser = async () => {
        if(!auth?.currentUser?.email) return
        const currentUserRef = doc(db, 'users', auth.currentUser.email);
        const currentUserSnap = await getDoc(currentUserRef)

        if (currentUserSnap.exists()) {
            return currentUserSnap.data()
        } else {
            return null
        }
    }
    return { fetchUser }
}

export default useFetchCurrentUser