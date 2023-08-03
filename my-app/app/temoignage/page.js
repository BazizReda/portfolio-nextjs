'use client'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addTemoignage, getTemoignage, deleteTemoignage, getAllTemoignages } from '../../store/reducers/temoignageReducer'
import './temoignageList.css';
import homecss from '../home/home.css'
const prenomRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const nomRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const Temoignage = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const temoignages = useSelector(state => state.temoignage.temoignages)
    const [state, setState] = useState({    // Valeurs de chaque champ de la forme
        prenom: '',
        nom: '',
        email: '',
        message: ''
        
    })

    function handleChange(event) {
        const { name, value, checked, type } = event.target;
        type !== 'checkbox' && validateField(name, value);
        setState(previousState => ({ ...previousState, [name]: type === 'checkbox' ? checked : value }));
      }
    
      function validateField(field, value) {
        switch (field) {
            case 'prenom':
          if (!prenomRegex.test(value)) setErrors(prev => ({ ...prev, [field]: `${field} n'est pas valide` }));
           else setErrors(prev => ({ ...prev, [field]: '' }));
            break;
          case 'nom':
            if (!nomRegex.test(value)) setErrors(prev => ({ ...prev, [field]: `${field} n'est pas valide `}));
            else setErrors(prev => ({ ...prev, [field]: '' }));
            break;
          case 'email':
            if (!emailRegex.test(value)) setErrors(prev => ({ ...prev, [field]: `Email n'est pas valide `}));
            else setErrors(prev => ({ ...prev, [field]: '' }));
            break;
          case 'message':
            if (value.trim() === '') setErrors(prev => ({ ...prev, [field]: `Le champ message est obligatoire `}));
            else setErrors(prev => ({ ...prev, [field]: '' }));
            break;
          default:
            break;
        }
      }
    
      function fieldHasError(field) {
        return !!errors[field];
      }
    
      function isFormValid() {
        const { prenom,nom, email, message } = state;
        const isValid = Object.values(errors).every(error => error === '') && Object.values(state).every(value => value !== '');
    
        if (!prenom) {
          setErrors(prev => ({ ...prev, prenom: 'Le champ prenom est obligatoire' }));
        }
        if (!nom) {
            setErrors(prev => ({ ...prev, nom: 'Le champ nom est obligatoire' }));
          }
        if (!email) {
          setErrors(prev => ({ ...prev, email: 'Le champ email est obligatoire' }));
        }
        if (!message ) {
          setErrors(prev => ({ ...prev, message: 'Le champ message est obligatoire' }));
        }
    
        return isValid;
      }
    function goToEdit(id) {   // Rediriger vers la page edit-user avec la valeur de l'element clique
        dispatch(getTemoignage(id))
        router.push(`/edit-temoignage/${id}`)
    }

    function supprimer(id) {  // Supprimer l'element clique
        dispatch(deleteTemoignage(id))
    }
    function getTemoignages() {
      dispatch(getAllTemoignages())
          .then(() => { })
          .catch(err => console.log('Erreur lecture des etudiants', err))
  }

    const [errors, setErrors] = useState({
        prenom: '',
        nom: '',
        email: '',
        message: '',
      });

    function submit(event) {
        event.preventDefault() // Eviter le rafraichissement de la page ( eviter la soumission)
        isFormValid() && dispatch(addTemoignage({ ...state, id: temoignages.length + 1 }))
        setState(prev => ({
            ...prev,
            prenom: '',
            nom: '',
            email: '',
            message:''
           
        }))  // Reinitialiser la forme apres la soumission
    }
    return (
        
      <>
      <div className='home'>
        <div className='contour'></div>
        {temoignages.length ? (
          <>
            <h1 className='txt'>Liste des témoignages ajoutés</h1>
            <table>
              <thead className='zest'>
                <tr className='tst'>
                  <td>Id</td>
                  <td>Prénom</td>
                  <td>Nom</td>
                  <td>Email</td>
                  <td>Message</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {temoignages.map(temoignage => (
                  <tr key={temoignage.id}>
                    <td className='tst'>{temoignage.id}</td>
                    <td className='tst'>{temoignage.prenom}</td>
                    <td className='tst'>{temoignage.nom}</td>
                    <td className='tst'>{temoignage.email}</td>
                    <td className='tst'>{temoignage.message}</td>
                    <td>
                      <button className='submit1' onClick={() => goToEdit(temoignage.id)}>Editer</button>
                      <button className='submit2' onClick={() => supprimer(temoignage.id)}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : ''}
        <div className="home">
          <h2 className="txt">Ajouter un témoignage</h2>
          <div >
            <form className="form" onSubmit={submit}>
              <div className="form-group">
                <label className="form-label" htmlFor='prenom'>Prénom</label>
                <input className={`form-control ${fieldHasError('prenom') ? 'is-invalid' : ''}`} value={state.prenom} onChange={handleChange} type='text' name='prenom' id='prenom' placeholder='Entrer le prénom' />
                <div className={fieldHasError('prenom') ? "invalid-feedback" : "valid-feedback"}>{errors.prenom}</div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor='nom'>Nom</label>
                <input className={`form-control ${fieldHasError('nom') ? 'is-invalid' : ''}`} value={state.nom} onChange={handleChange} type='text' name='nom' id='nom' placeholder='Entrer le nom' />
                <div className={fieldHasError('nom') ? "invalid-feedback" : "valid-feedback"}>{errors.nom}</div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor='email'>Email</label>
                <input className={`form-control ${fieldHasError('email') ? 'is-invalid' : ''}`} value={state.email} onChange={handleChange} type='text' name='email' id='email' placeholder="Entrer l'email" />
                <div className={fieldHasError('email') ? "invalid-feedback" : "valid-feedback"}>{errors.email}</div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor='message'>Message</label>
                <textarea className={`form-control ${fieldHasError('message') ? 'is-invalid' : ''}`} value={state.message} onChange={handleChange} type='text' name='message' id='message' placeholder="Entrer le message" />
                <div className={fieldHasError('message') ? "invalid-feedback" : "valid-feedback"}>{errors.message}</div>
              </div>
    
              <button className='submitt'>Soumettre</button>
            </form>
          </div>
    
        </div>
      </div>
    </>
    


    )
}

export default Temoignage