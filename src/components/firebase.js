import {initializeApp} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBXdfmRUM56vir3pD9VQLYvIR36OKukyMI",
    authDomain: "web-programming-itmo.firebaseapp.com",
    projectId: "web-programming-itmo",
    storageBucket: "web-programming-itmo.appspot.com",
    messagingSenderId: "74373191250",
    appId: "1:74373191250:web:144194481dd7352015718b",
    measurementId: "G-XJ4R16YM2F"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';

export const firestore = getFirestore(app);

// componentDidMount() {
//     this.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
//         'size': 'invisible',
//         'callback': (response) => {
//         }
//     }, auth);
// }