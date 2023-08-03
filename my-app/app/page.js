import React from 'react';
import Image from 'next/image';
import image1 from '../public/image.jpg';
//import cv from '../public/CV_BAZIZ.pdf';
import homecss from './home/home.css'

const Page = () => {
  return (
    <div className='home'>
      <h1 className='titre'>Hi, I'm reda Welcom to my PORTFOLIO. Enjoy! </h1>
      <p className='para'>
        Passionné par la technologie et doté d'une double compétence en programmation informatique et télécommunication, je suis à
        la recherche d'opportunités stimulantes pour mettre en application mes connaissances. Ma curiosité insatiable me pousse à
        embrasser de nouveaux défis et à apprendre rapidement, transformant la méconnaissance d'un sujet en une opportunité
        d'acquérir de nouvelles compétences. Je suis déterminé à apporter une valeur ajoutée en combinant mes compétences
        techniques avec une approche ouverte et adaptable.
      </p>
      <Image className='image1' src={image1} alt="moi" />
   
    </div>
  );
}

export default Page;
