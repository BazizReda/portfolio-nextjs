import React from 'react'
//import Projectcss from './Project.css'
//import Homecss from '../../Home.css'
import './projet2.css'

import nextnapImage from '../../public/nextnap.png';
import Image from 'next/image';


const Projet2 = () => {
  return (


<div className="project-container1">
  <div className="project-details">
    <h1 className='txt2'>Next Nap</h1>
    <p className='para'>
      Description du projet : Nous avons mis en place une plateforme innovante pour faciliter la recherche de
      logements.
      <br />
      Grâce à notre système de recherche avancé, les utilisateurs peuvent facilement trouver des propriétés qui
      répondent à leurs critères de recherche, comme l'emplacement, les caractéristiques de la propriété et le
      budget.
      <br />
      Nous avons également inclus des fonctionnalités telles que la possibilité de planifier des visites virtuelles,
      de demander des renseignements supplémentaires et de soumettre des offres en ligne.
    </p>
    <div className="technologies-container">
      <h3>Technologies utilisées :</h3>
      <ul>
        <li>VueJs</li>
        <li>JavaScript</li>
        <li>HTML</li>
        <li>CSS</li>
      </ul>
    </div>
  </div>
  <div className="project-image-container1">
    <Image src={nextnapImage} alt="nextnapImage" className="project-image1" />
  </div>
</div>



  );
}


export default Projet2