import { useContext, useState } from 'react';
import { Link} from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';


function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const context = useContext(myContext);
    const { loading, setLoading } = context;

     // For navigation

    const signup = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        if (email === "" || password === "") {
            return toast.error("Email and password are required");
        }

        setLoading(true);

        try {
            // Check if email already exists in Firestore
            const emailQuery = query(collection(fireDB, "users"), where("email", "==", email));
            const emailSnapshot = await getDocs(emailQuery);
            if (!emailSnapshot.empty) {
                setLoading(false);
                return toast.error("Email is already in use");
            }

            // Create the user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Add user to Firestore
            const userDoc = {
                name: name || "Anonymous", // If no name provided, set default
                uid: user.uid,
                email: user.email,
                time: Timestamp.now()
            };
            const userRef = collection(fireDB, "users");
            await addDoc(userRef, userDoc);

            toast.success("Signup successful");

          
            
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error("Email is already in use");
            } else if (error.code === 'auth/weak-password') {
                toast.error("Password is too weak");
            } else {
                toast.error("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex justify-center items-center h-screen">
            {loading && <Loader />}
            <div className="bg-gray-800 px-10 py-10 rounded-xl">
                <div>
                    <h1 className="text-center text-white text-xl mb-4 font-bold">Signup</h1>
                </div>
                <form onSubmit={signup}>
                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                            placeholder="Name"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex justify-center mb-3">
                        <button
                            type="submit"
                            className="bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg"
                        >
                            Signup
                        </button>
                    </div>
                </form>
                <div>
                    <h2 className="text-white">
                        Have an account?{" "}
                        <Link className="text-red-500 font-bold" to="/Login">
                            Login
                        </Link>
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default Signup;
