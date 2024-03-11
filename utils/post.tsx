import firebase from "@/firebase";

interface comment {
  commentorsID: string;
  content: string;
  images: string[];
  files: string[];
  reports: string[];
}

type Props = {
  poster: any;
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
      const docRef = firebase.firestore().collection("profiles").doc(user.uid);
      docRef
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            console.log("User found!");
            await firebase
              .firestore()
              .collection("carsPosts")
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
              })
              .then(async (docRef) => {
                console.log("Document written with ID: ", docRef.id);
                await firebase
                  .firestore()
                  .collection("profiles")
                  .doc(user.uid)
                  .update({
                    posts: firebase.firestore.FieldValue.arrayUnion(docRef.id),
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
