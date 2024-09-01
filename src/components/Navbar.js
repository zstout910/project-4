import {Link} from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { BsInfoCircleFill } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";



const Navbar = ({show}) => {
    return (
        <div className={show ? 'sidenav active' : 'sidenav'}>
            <ul>
                <li>
                    <Link to="/"><FaHome />Home</Link>
                </li>
                <li>
                    <Link to="/questions"><FaQuestion />FAQ</Link>
                </li>
                <li>
                    <Link to="/money"><FaChartBar />Top 10</Link>
                </li>
                <li>
                    <Link to="/about"><BsInfoCircleFill />About</Link>
                </li>
                <li>
                    <Link to="/profile"><IoMdPerson />Profile</Link>
                </li>
                
            </ul>

        </div>
    )
}

export default Navbar