import { Link } from "react-router-dom";
import { GithubFilled } from "@ant-design/icons";

import "./Footer.scss";

const Footer = () => {
    return <footer className='footer'>
        <nav>
            <ul>
                <li><Link>Home</Link></li>
                <li><Link>Privacy Policy</Link></li>
                <li><Link>Terms of Service</Link></li>
                <li><Link>About</Link></li>
                <li><Link>Support</Link></li>
                <li><a target="_blank" href="https://github.com/MrCamoga/frontend-redsocial"><GithubFilled /> Github</a></li>
            </ul>
        </nav>
    </footer>
};

export default Footer;