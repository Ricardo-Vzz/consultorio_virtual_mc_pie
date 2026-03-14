import Navbar from "../components/nav_bar.jsx";
import NavbarAdmin from '../components/nav_bar_admin.jsx';
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import {Outlet} from "react-router-dom"
import { useAuth } from "../components/auth_context.jsx";

function MainLayaut() {
    const { user } = useAuth();
    return (
        <div>
            {user ? <NavbarAdmin /> : <Navbar />}
            <Header />
            <main>
                <Outlet/>
            </main>
            <Footer />
        </div>
    );
}
export default MainLayaut;