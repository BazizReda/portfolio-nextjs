import React from 'react';
import footercss from './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Link from "next/link";
const Footer = () => {
    return (
        <footer>
        
      <FontAwesomeIcon className='lien' icon={faGithub} /> {' '}
       {/* <a href="https://github.com/BazizReda/">GitHub</a> |{' '}*/}
        <Link href="https://github.com/BazizReda/">GitHub</Link>
        {'  '}
        <FontAwesomeIcon className='lien' icon={faLinkedin} /> {' '}
       {/*<a href="https://www.linkedin.com/in/redha-baziz-a38450159/">LinkedIn</a>*/} 
        <Link href="https://www.linkedin.com/in/redha-baziz-a38450159/">LinkedIn</Link>

            
      </footer>
    );
}

export default Footer;
/*
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <p className="social-links">
        <span className="icon">
          <FontAwesomeIcon className='lien' icon={faGithub} /> {' '}
          <Link href="https://github.com/BazizReda/">GitHub</Link>
        </span>
        <span className="icon">
          <FontAwesomeIcon className='lien' icon={faLinkedin} /> {' '}
          <Link href="https://www.linkedin.com/in/redha-baziz-a38450159/">LinkedIn</Link>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
*/