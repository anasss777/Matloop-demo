import firebase from "@/firebase";

type Props = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: number;
  country: string;
  password: string;
  confirmPassword: string;
};

export const delayAction = async (
  action: () => void,
  delayMilliseconds: number
) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      action();
      resolve();
    }, delayMilliseconds);
  });
};

export const handleSignUp = async ({
  firstName,
  lastName,
  username,
  email,
  phoneNumber,
  country,
  password,
  confirmPassword,
}: Props) => {
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Here you might want to create a Firestore document with the user information
    // For example:
    await firebase
      .firestore()
      .collection("profiles")
      .doc(user?.uid)
      .set({
        userId: user?.uid,
        name: `${firstName} ${lastName}`,
        username,
        email,
        phoneNumber,
        country,
      });

    console.log("Account created successfully.");
    return user;
  } catch (error: any) {
    console.log("Error creating account: " + error.message);
  }
};

export const handleSignUpWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const db: firebase.firestore.Firestore = firebase.firestore();

  try {
    const result: firebase.auth.UserCredential = await firebase
      .auth()
      .signInWithPopup(provider);
    // The signed-in user info
    const user: firebase.User | null = result.user;

    if (user) {
      // Add a new document in collection "profiles" with ID = user.uid
      await db.collection("profiles").doc(user.uid).set(
        {
          userId: user?.uid,
          name: user.displayName,
          email: user.email,
        },
        { merge: true }
      );
      return user;
    }
  } catch (error: any) {
    // Handle Errors here
    const errorCode: string = error.code;
    const errorMessage: string = error.message;
    console.log(errorCode, errorMessage);
  }
};

export const handleSignIn = async (email: string, password: string) => {
  const db: firebase.firestore.Firestore = firebase.firestore();

  try {
    const userCredential: firebase.auth.UserCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    // The signed-in user info
    const user: firebase.User | null = userCredential.user;

    if (user) {
      // Get user document from Firestore
      const docRef: firebase.firestore.DocumentReference = db
        .collection("profiles")
        .doc(user.uid);
      const doc: firebase.firestore.DocumentSnapshot = await docRef.get();
      if (doc.exists) {
        return user;
      } else {
        console.log("No such document!");
      }
    }
  } catch (error: any) {
    // Handle Errors here
    const errorCode: string = error.code;
    const errorMessage: string = error.message;
    console.log(errorCode, errorMessage);
    return null;
  }
};

export const handleSignInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const db: firebase.firestore.Firestore = firebase.firestore();

  try {
    const result: firebase.auth.UserCredential = await firebase
      .auth()
      .signInWithPopup(provider);
    // The signed-in user info
    const user: firebase.User | null = result.user;

    if (user) {
      // Get user document from Firestore
      const docRef: firebase.firestore.DocumentReference = db
        .collection("profiles")
        .doc(user.uid);
      const doc: firebase.firestore.DocumentSnapshot = await docRef.get();
      if (doc.exists) {
        return user;
      } else {
        console.log("No such document! \n Creating one...");
        await db.collection("profiles").doc(user.uid).set(
          {
            name: user.displayName,
            email: user.email,
          },
          { merge: true }
        );

        location.reload();
      }
    }
  } catch (error: any) {
    // Handle Errors here
    const errorCode: string = error.code;
    const errorMessage: string = error.message;
    console.log(errorCode, errorMessage);
    return null;
  }
};

export const handleSignOut = async () => {
  try {
    await firebase.auth().signOut();
    console.log("User signed out.");
    return true;
  } catch (error) {
    console.error("Error signing out: ", error);
    return false;
  }
};
