import firebase from "@/firebase";
import { Profile } from "@/types/profile";

interface comment {
  commentorsID: string;
  content: string;
  images: string[];
  files: string[];
  reports: string[];
}

type Props = {
  poster: Profile;
  postTitle: string;
  carBrand: string;
  carType: string[];
  minPrice: string;
  maxPrice: string;
  minYear: string;
  maxYear: string;
  maxDistance: string;
  gearType: string[];
  selectedCountry: string;
  city: string;
  fuelType: string[];
  description: string;
};

export const addCarPost = ({
  poster,
  postTitle,
  carBrand,
  carType,
  minPrice,
  maxPrice,
  minYear,
  maxYear,
  maxDistance,
  gearType,
  selectedCountry,
  city,
  fuelType,
  description,
}: Props) => {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const docRefProfiles = firebase
        .firestore()
        .collection("profiles")
        .doc(user.uid);
      docRefProfiles
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            console.log("User found!");
            await firebase
              .firestore()
              .collection("posts")
              .add({
                poster,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                postTitle,
                carBrand,
                carType,
                priceRange: [Number(minPrice), Number(maxPrice)],
                yearRange: [
                  Number(minYear) || undefined,
                  Number(maxYear) || undefined,
                ],
                maxDistance,
                gearType,
                region: `${selectedCountry}, ${city}`,
                fuelType,
                description,
                reports: [],
                isPromoted: false,
                comments: [],
                category: "cars",
              })
              .then(async (docRefPost) => {
                console.log("Document written with ID: ", docRefPost.id);
                await firebase
                  .firestore()
                  .collection("profiles")
                  .doc(docRefProfiles.id)
                  .update({
                    posts: firebase.firestore.FieldValue.arrayUnion(
                      docRefPost.id
                    ),
                  });
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  });

  // Cleanup subscription on unmount
  return () => unsubscribe();
};

export const deleteAllPosts = () => {
  const db = firebase.firestore();
  const collectionRef = db.collection("carsPosts");

  collectionRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      doc.ref
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    });
  });
};
export const deleteAllProfiles = () => {
  const db = firebase.firestore();
  const collectionRef = db.collection("profiles");

  collectionRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      doc.ref
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    });
  });
};
