/*const Detail = ({params, searchParams}) => {
    return (
        <div>
           Le parametre vaut {params.id}
           Le parametre de recherche vaut {searchParams.nom}
        </div>
    );
}

export default Detail;*/

import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteATemoignage, getAllTemoignages } from '../store/reducers/temoignageReducer'

import '../TemoignageList.css';


function TemoignageList() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const temoignages = useSelector(state => state.temoignage.temoignages)

    function goToEdit(id) {
        navigate(`/addTemoignage/${id}`)
    }

    function deleteTemoignage(id) {
        dispatch(deleteATemoignage(id))
            .then(res => getTemoignages())
            .catch(err => console.log('Erreur suppression temoignage', err))
    }

    function getTemoignages() {
        dispatch(getAllTemoignages())
            .then(() => { })
            .catch(err => console.log('Erreur lecture des etudiants', err))
    }

    useEffect(() => {
      getTemoignages();
    }, [getTemoignages]);
    

    return (

        <>
    <div className='home' >
    <div className='contour' >

            <h1 className='txt'>Liste des temoignages</h1>
            <table>
                <thead className='zest' >
                    <tr className='tst'>
                        <td >Id</td>
                        <td>Nom</td>
                        <td>Message</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody >
                    {temoignages.map(temoignage => <tr key={temoignage.email}>
                        <td className='tst'>{temoignage.email}</td>
                        <td className='tst'>{temoignage.nom}</td>
                        <td className='tst'>{temoignage.message}</td>
                        <td className='tst'><button className='submit1' onClick={() => goToEdit(temoignage.email)}>Editer</button> <button disabled={temoignages.length < 2} onClick={() => deleteTemoignage(temoignage.email)} className='submit2'>Supprimer</button></td>
                    </tr>)}
                </tbody>
            </table>
            <button onClick={() => navigate('/addTemoignage')} className='submitt' >Ajouter un temoignage</button >
            </div >
            </div >


        </>

    )
}

export default TemoignageList