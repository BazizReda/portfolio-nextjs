'use client'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTemoignage } from "@/store/reducers/temoignageReducer";
import { useRouter } from "next/navigation";
//import './edit-temoignage.css'

const EditTemoignage = ({ params }) => {
    const dispatch = useDispatch()
    const { id } = params
    const router = useRouter()
    const temoignage = useSelector(state => state.temoignage.temoignage)
    const [state, setState] = useState({  // Initialisation de state avec la valeur recue
        prenom: '',
        nom: '',
        email: '',
        message: '',
        
    })

    function handleChange(event) {
        const { name, value, checked, type } = event.target
        setState(previsouState => ({ ...previsouState, [name]: type === 'checkbox' ? checked : value }))

    }

    useEffect(() => {
        if (temoignage) setState(temoignage)
    }, [temoignage])

    function submit(event) {
        event.preventDefault()
        id && dispatch(updateTemoignage(state, id))
        router.push('/temoignage')

    }


    return (
        <div className='card mt-5'>
            <h2 className='card-title'>Modifier l'utilisateur</h2>
            <div className='card-body'>
                <form onSubmit={submit}>
                   
                    <div className="mb-3">
                        <label className="form-label" htmlFor='nom'>Nom</label>
                        <input className="form-control" value={state.nom} onChange={handleChange} type='text' name='nom' id='nom' placeholder='Entrer le nom' />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor='email'>Email</label>
                        <input className="form-control" value={state.email} onChange={handleChange} type='email' name='email' id='email' placeholder="Entrer l'email" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor='biographie'>Message</label>
                        <textarea className="form-control" value={state.message} onChange={handleChange} name='message' id='message' placeholder='Entrer un message'></textarea>
                    </div>

                
                    <button className='btn btn-success'>Soumettre</button>
                </form>
            </div>
        </div>
    )
}

export default EditTemoignage;