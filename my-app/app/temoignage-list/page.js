'use client'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { addTemoignage, getTemoignages, deleteTemoignage } from '../../store/reducers/temoignageReducer'

import './temoignageList.css';
import homecss from '../home/home.css'

const TemoignageList = () => {
    const nomRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const messageRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const dispatch = useDispatch()
    const router = useRouter()

    const temoignages = useSelector(state => state.temoignage.temoignages)
    const [state, setState] = useState({    // Valeurs de chaque champ de la forme
        prenom: '',
        nom: '',
        email: '',
        message: ''
        
    })
    
  const [errors, setErrors] = useState({
    nom: '',
    email: '',
    message: '',
    emailExists: '',
  });
  /*useEffect(() => {
    if (id) {
      dispatch(getTemoignageById(id))
        .then(() => {})
        .catch((err) => console.log('Erreur lecture temoignage', err));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (temoignage && id) {
      setState(temoignage);
    }
  }, [temoignage, id]);*/

  function handleChange(event) {
    const { name, value, checked, type } = event.target;
    setState((previousState) => ({ ...previousState, [name]: type === 'checkbox' ? checked : value }));
    validateField(name, value);
  }
  function validateField(field, value) {
    switch (field) {
      case 'nom':
        if (!nomRegex.test(value)) {
          setErrors((prev) => ({ ...prev, [field]: `${field} n'est pas valide` }));
        } else {
          setErrors((prev) => ({ ...prev, [field]: '' }));
        }
        break;
      case 'email':
        if (!emailRegex.test(value)) {
          setErrors((prev) => ({ ...prev, [field]: `Email n'est pas valide` }));
        } else {
          setErrors((prev) => ({ ...prev, [field]: '' }));
        }
        break;
      case 'message':
        if (value.trim() === '') {
          setErrors((prev) => ({ ...prev, [field]: 'Le champ message est obligatoire' }));
        } else {
          setErrors((prev) => ({ ...prev, [field]: '' }));
        }
        break;
      default:
        break;
    }
  }
  
  function fieldHasError(field) {
    return !!errors[field];
  }

  function isFormValid() {
    const { nom, email, message } = state;
    const isValid = nomRegex.test(nom) && emailRegex.test(email) && messageRegex.test(message);

    if (!isValid) {
      validateField('nom', nom);
      validateField('email', email);
      validateField('message', message);
    }

    return isValid;
  }
    function goToEdit(id) {   // Rediriger vers la page edit-user avec la valeur de l'element clique
        dispatch(getTemoignages(id))
        router.push(`/temoignage-list/${id}`)
    }

    function supprimer(id) {  // Supprimer l'element clique
        dispatch(deleteTemoignage(id))
    }

    function getTemoignages() {
        dispatch(getAllTemoignages())
            .then(() => { })
            .catch(err => console.log('Erreur lecture des etudiants', err))
    }

   
    
    function submit(event) {
        event.preventDefault() // Eviter le rafraichissement de la page ( eviter la soumission)
        dispatch(addTemoignage({ ...state, id: temoignages.length + 1 }))
        setState(prev => ({
            ...prev,
            prenom: '',
            nom: '',
            email: '',
            message:''
           
        }))  // Reinitialiser la forme apres la soumission
    }
    return (
        
        < >
        {temoignages.length ? ( 
            <>
              <div className='home' >
             <div  >
                <h1 className="txt">Liste des temoignage ajoutes</h1>
                <table className='contour' >
                    <thead className="zest">
                        <tr className="tst">
                            <td>Id</td>
                            <td>Prenom</td>
                            <td>Nom</td>
                            <td>Email</td>
                            <td>Message</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {temoignages.map(temoignage => <tr key={temoignage.id}>
                            <td className='tst'>{temoignage.id}</td>
                            <td className='tst'>{temoignage.prenom}</td>
                            <td className='tst'>{temoignage.nom}</td>
                            <td className='tst'>{temoignage.email}</td>
                            <td className='tst'>{temoignage.message}</td>
                            <td className='tst'><button className='submit1' onClick={() => goToEdit(temoignage.id)}>Editer</button> <button className='submit2' onClick={() => supprimer(temoignage.id)}>Supprimer</button></td>
                        </tr>)}
                    </tbody>
                </table>
                </div>
    </div>
            </>

        ) : ''}
      <div className="home">
      <h2 className="txt">ajouter un temoignage</h2>
      <div className="contact-page">
        <form className="form" onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="nom">Nom</label>
            <input
              className={`form-control ${fieldHasError('nom') ? 'is-invalid' : ''}`}
              value={state.nom}
              onChange={handleChange}
              type="text"
              name="nom"
              id="nom"
              placeholder="Entrer le nom"
            />
            {fieldHasError('nom') && <div className="invalid-feedback">{errors.nom}</div>}
          </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className={`form-control ${fieldHasError('email') ? 'is-invalid' : ''}`}
                value={state.email}
                onChange={handleChange}
                type="text"
                name="email"
                id="email"
                placeholder="Entrer l'e-mail"
              />
              {fieldHasError('email') && <div className="invalid-feedback">{errors.email}</div>}
              {errors.emailExists && <div className="invalid-feedback">{errors.emailExists}</div>}
            </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              className={`form-control ${fieldHasError('message') ? 'is-invalid' : ''}`}
              rows="6"
              onChange={handleChange}
              value={state.message}
              name="message"
              placeholder="Message"
            />
            {fieldHasError('message') && <div className="invalid-feedback">{errors.message}</div>}
          </div>
          <button className="submitt">Soumettre</button>
        </form>
      </div>
    </div>
    </>


    )
}

export default TemoignageList