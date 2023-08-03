import Link from "next/link";
import Headercss from './Header.css'; 
const Header = () => {
    return (
       <header className="header">

            <Link className="navbar__link" href='/'>Home</Link>
            <Link className="navbar__link" href='/contact'>Contact</Link>
            <Link className="navbar__link" href='/projets'>Projets</Link>
            <Link className="navbar__link" href='/temoignage-list'>Temoignage</Link>

       </header>
    );
}

export default Header;
/*
<header className="header">
<nav className="navbar">
  
 {/*<Link className="navbar__link" to="/">Accueil</Link>
  <a href="/" className="navbar__link">Accueil</a>
  <Link className="navbar__link" href="/Projets">Projets</Link>
  <Link className="navbar__link" href="/Contact">Contact</Link>
  <Link className="navbar__link" href="/Temoignages">Temoignages</Link>

</nav>
</header>
*/