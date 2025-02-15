import { FaSearch, FaShoppingBag, FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType {
    user: User | null;
}

const Header = ({ user }: PropsType) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        navigate("/");
    }

    const logoutHandler = async () => {
        try {
            await signOut(auth);
            toast.success("Sign Out Successfully");
            setIsOpen(false);
        } catch (error) {
            toast.error("Sign Out Failed");
        }
    };

    return (
        <nav className="header">
            <div className="site-name"
            onClick={handleMouseEnter}
            >

            </div>
            <Link onClick={() => setIsOpen(false)} to={"/"}>
                HOME
            </Link>
            <Link onClick={() => setIsOpen(false)} to={"/search"}>
                <FaSearch className="icon" /> {/* Use className to apply size */}
            </Link>
            <Link onClick={() => setIsOpen(false)} to={"/cart"}>
                <FaShoppingBag className="icon" /> {}
            </Link>

            {user?._id ? (
                <>
                    <button onClick={() => setIsOpen((prev) => !prev)}>
                        <FaUser className="icon" /> {/* Use className to apply size */}
                    </button>
                    <dialog open={isOpen}>
                        <div>
                            {user.role === "admin" && (
                                <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">Admin</Link>
                            )}
                            <Link onClick={() => setIsOpen(false)} to="/orders">Orders</Link>
                            <button onClick={logoutHandler}>
                                <FaSignOutAlt className="icon" /> {/* Use className to apply size */}
                            </button>
                        </div>
                    </dialog>
                </>
            ) : (
                <Link to={"/login"}>
                    <FaSignInAlt className="icon" /> {/* Use className to apply size */}
                </Link>
            )}
        </nav>
    );
};

export default Header;
