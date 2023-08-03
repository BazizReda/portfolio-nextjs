'use client'

import React, { useState } from 'react';
//import { useRouter } from 'next/router';
import emailjs from 'emailjs-com';
import './Contact.css';
import '../home/home.css';

const SERVICE_ID = 'service_contact';
const TEMPLATE_ID = 'template_dzlkila';
const USER_ID = 'gKgWM-YPUA1R4HlDl';

function Contact() {
  const nomRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const messageRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

  const [state, setState] = useState({
    nom: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    nom: '',
    email: '',
    message: ''
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
    validateField(name, value);
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'nom':
        if (!nomRegex.test(value)) {
          setErrors((prevErrors) => ({ ...prevErrors, [field]: `${field} n'est pas valide` }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
        }
        break;
      case 'email':
        if (!emailRegex.test(value)) {
          setErrors((prevErrors) => ({ ...prevErrors, [field]: `Email n'est pas valide` }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
        }
        break;
      case 'message':
        if (!messageRegex.test(value)) {
          setErrors((prevErrors) => ({ ...prevErrors, [field]: 'Le champ message est obligatoire' }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = Object.values(errors).every((error) => error === '');
    if (isValid) {
      // Envoyer le formulaire ou effectuer une autre action
      sendEmail();
    } else {
      console.log('Le formulaire contient des erreurs');
    }
  };

  const sendEmail = () => {
    emailjs.send(SERVICE_ID, TEMPLATE_ID, state, USER_ID)
      .then((response) => {
        console.log('E-mail envoyé avec succès', response);
        // Réinitialiser le formulaire ou afficher un message de succès
        setState({
          nom: '',
          email: '',
          message: ''
        });
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi de l\'e-mail', error);
        // Afficher un message d'erreur à l'utilisateur
      });
  };

  return (
    <div className="home">
      <div className="contact-page">
        <h1 className="txt1">Contactez-moi</h1>
        <form className="forma" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom :</label>
            <input type="text" id="name" name="nom" placeholder="Votre nom"  value={state.nom} onChange={handleChange} className={errors.nom !== '' ? 'is-invalid' : ''} />
            {errors.nom && <div className="invalid-feedback">{errors.nom}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Votre email"
              value={state.email}
              onChange={handleChange}
              className={errors.email !== '' ? 'is-invalid' : ''}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="message">Message :</label>
            <textarea
              id="message"
              name="message"
              placeholder="Votre message"
              value={state.message}
              onChange={handleChange}
              className={errors.message !== '' ? 'is-invalid' : ''}
            ></textarea>
            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
          </div>
          <button className="submit" type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
