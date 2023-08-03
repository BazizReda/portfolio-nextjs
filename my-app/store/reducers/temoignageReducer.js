
//1- Les actions (qui modifient le store)

const ADD_TEMOIGNAGE = 'ADD_TEMOIGNAGE'
const DELETE_TEMOIGNAGE = 'DELETE_TEMOIGNAGE'
const UPDATE_TEMOIGNAGE = 'UPDATE_TEMOIGNAGE'
const LIST_TEMOIGNAGE= 'LIST_TEMOIGNAGE'
const CURRENT_TEMOIGNAGE = 'CURRENT_TEMOIGNAGE'

//2 - Createurs d'actions (retournent un objet)

export const addTemoignage = (temoignage) => ({ type: ADD_TEMOIGNAGE, payload: temoignage })

export const updateTemoignage = (temoignage, id) => ({ type: UPDATE_TEMOIGNAGE, payload: { temoignage, id } })

export const deleteTemoignage = id => ({ type: DELETE_TEMOIGNAGE, payload: { id } })

export const getAllTemoignages = (temoignages) => ({ type: LIST_TEMOIGNAGE, payload: temoignages })

export const getTemoignages = id => ({ type: CURRENT_TEMOIGNAGE, payload: { id } })


// Le reducteur pour les etudiants

// --Definir l'etat initial pour l'objet global pour les etudiants

const initialState = {
    temoignages: [],
    temoignage: {}
}

// Faites attention aux comparaison == et === car les types son differents des fois
export const temoignageReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case LIST_TEMOIGNAGE:
            return { ...state, temoignages: payload }
        case CURRENT_TEMOIGNAGE:
            return { ...state, temoignage: state.temoignages.find(temoignage => temoignage.id === payload.id) }

        case ADD_TEMOIGNAGE:
            return { ...state, temoignages: [...state.temoignages, payload] }

        case UPDATE_TEMOIGNAGE:
            return { ...state, temoignages: state.temoignages.map(temoignage => temoignage.id == payload.id ? payload.temoignage : temoignage) }

        case DELETE_TEMOIGNAGE:
            return { ...state, temoignages: state.temoignages.filter(temoignage => temoignage.id !== payload.id) }

        default:
            return state
    }
}
