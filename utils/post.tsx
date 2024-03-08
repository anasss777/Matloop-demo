import firebase from "@/firebase";

interface comment {
  commentorsID: string;
  content: string;
  images: string[];
  files: string[];
  reports: string[];
}

type Props = {
  poster: string;
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

export const addCarPost = async ({
  poster,
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
  await firebase
    .firestore()
    .collection("carsPosts")
    .add({
      poster,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      carBrand,
      carType,
      priceRange: [Number(minPrice), Number(maxPrice)],
      yearRange: [Number(minYear) || undefined, Number(maxYear) || undefined],
      maxDistance,
      gearType,
      region: `${selectedCountry}, ${city}`,
      fuelType,
      description,
      reports: [],
      isPromoted: false,
      comments: [],
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};
