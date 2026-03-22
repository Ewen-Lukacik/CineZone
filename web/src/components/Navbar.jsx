import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar(){
    const { user, logout } = useAuth();

    return(
        <header>
            <nav>
                {/* ptet remplacer par un logo si j'en fais un */}
                <Link to="/">Cinezone</Link>

                <div>
                    {user ? 
                    (
                        <>
                        <span>Hello {user.name}</span>
                        <button onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </div>
            </nav>
        </header>
    );
}