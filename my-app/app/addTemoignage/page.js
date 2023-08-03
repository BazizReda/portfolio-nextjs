import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTemoignage, getTemoignageById, updateTemoignage } from '../store/reducers/temoignageReducer';

function AddTemoignage() {
  const nomRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const messageRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const temoignage = useSelector((state) => state.temoignage.temoignage);

  const [state, setState] = useState({
    nom: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    nom: '',
    email: '',
    message: '',
    emailExists: '',
  });

  useEffect(() => {
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
  }, [temoignage, id]);

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

  function submit(event) {
    event.preventDefault();

    if (id) {
      if (isFormValid()) {
        dispatch(updateTemoignage(state, id))
          .then((res) => navigate('/TemoignageList'))
          .catch((err) => {
            let errors = {};
            err.response.data.errors.forEach((error) => {
              errors = { ...errors, ...error };
            });
            setErrors(errors);
            console.log('Erreur mise à jour temoignage', err);
          });
      }
    } else {
      if (isFormValid()) {
        const emailExists = temoignage.find((t) => t.email === state.email);

        if (emailExists) {
          setErrors((prev) => ({ ...prev, emailExists: 'Cet e-mail existe déjà' }));
        } else {
          dispatch(addTemoignage(state))
            .then((res) => navigate('/TemoignageList'))
            .catch((err) => {
              let errors = {};

              if (err.response && err.response.data && err.response.data.errors && Array.isArray(err.response.data.errors)) {
                err.response.data.errors.forEach((error) => {
                  errors = { ...errors, ...error };
                });
              }

              setErrors(errors);
              console.log('Erreur ajout temoignage', err.response.data.errors);
            });
        }
      }
    }
  }

  return (
    <div className="home">
      <h2 className="txt1">{id ? 'Modifier un témoignage' : 'Ajouter un témoignage'}</h2>
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
          {!id && (
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
          )}
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
          <button className="submit">{id ? 'Modifier' : 'Soumettre'}</button>
        </form>
      </div>
    </div>
  );
}

export default AddTemoignage;
