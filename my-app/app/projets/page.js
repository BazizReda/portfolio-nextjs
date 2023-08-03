import React from 'react';
import './projets.css';
import saaqImage from '../../public/saaq.png';
import nextnapImage from '../../public/nextnap.png';
import Image from 'next/image';
import Link from "next/link";
import homecss from '../home/home.css'


const Projets = () => {
    return (
        <div className='home'>
         <h1 className='txt2'>Mes Projets</h1>
           <div className="project-container">
              <div>

                  <Link href="/projet1">
                    <Image className="project-image-1" src={saaqImage} alt='saaqImage'/>
                    <h2 className='txt2'>Projet 1</h2>  
                  </Link>
              </div>
            
            <div>

                <Link href="/projet2">
                  <Image className="project-image-2" src={nextnapImage} alt='nextnapImage'/>
                  <h2 className='txt2'>Projet 2</h2> 
                </Link>
            </div>

        </div>
      </div>
    );
}

export default Projets;