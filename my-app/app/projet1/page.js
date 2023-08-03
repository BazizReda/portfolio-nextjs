import React from 'react';
import Project1css from './projet1.css';
import saaqImage from '../../public/saaq.png';
import Image from 'next/image';

const Projet1 = () => {
  return (
    <div className="project-container2">
      <div className="project-details2">
        <h4 className='txt2'>SAAQ</h4>
        <p>
          Description "Notre site dédié à l'apprentissage théorique et à la planification des examens de conduite pour les
          véhicules automobiles et les motos. Notre plateforme vous offre la possibilité de vous préparer efficacement aux
          examens de la SAAQ en passant des questionnaires théoriques interactifs.Grâce à notre vaste bibliothèque de
          questions et de cas pratiques, vous pouvez tester vos connaissances et vous familiariser avec les règles de la
          circulation routière spécifiques aux automobiles et aux motos. Notre système vous fournit des réponses détaillées
          et des explications pour vous aider à comprendre les concepts importants. En plus des questionnaires théoriques,
          notre site vous permet également de prendre des rendez-vous pour passer vos examens de conduite. Vous pouvez
          choisir une date et une heure qui vous conviennent, en évitant les tracas liés à la planification en personne.
          Cette fonctionnalité facilite la gestion de votre emploi du temps et vous aide à obtenir rapidement un rendez-vous
          pour votre examen.
        </p>
        <div className="technologies-container2">
          <h3>Technologies utilisées :</h3>
          <ul>
            <li>Csharp</li>
          </ul>
        </div>
      </div>
      <div className="project-image-container2">
        <Image src={saaqImage} alt="saaqImage" className="project-image2" />
      </div>
    </div>
  );
};

export default Projet1;
