import Navbar from "../components/nav_bar.jsx";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import {Outlet} from "react-router-dom"

function MainLayaut() {
    return (
        <div>
            <Navbar />
            <Header />
            <main>
                <Outlet/>
            </main>
            <Footer />
        </div>
    );
}
export default MainLayaut;