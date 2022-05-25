import {
    GET_OWNERS,
    GET_NAME_OWNER,
    FILTER_BY_OWNER,
    GET_PROVIDERS,
    GET_NAME_PROVIDER,
    FILTER_BY_PROVIDER
} from '../actions/types';

// Definir constante con un objeto de estados iniciales.
const initialState = {
    owners: [],
    copyOwners: []
};

// Definimos la función reducer
function rootReducer(state = initialState, action) {
    console.log(action.payload, action.type, "estoy en el reducer");

    switch (action.type) {

        case GET_OWNERS:
            return {
                ...state,
                owners: action.payload,
                copyOwners: action.payload
            }

        case GET_NAME_OWNER:
            return {
                ...state,
                copyOwners: action.payload,
            }

        case FILTER_BY_OWNER:
            console.log("REDUCER FILTER_BY_OWNER", action.payload);
            console.log("REDUCER state.owners", state.owners);
            return {
                ...state,
                copyOwners: state.owners.filter(el =>
                    el.owners.map(el => el.name).includes(action.payload)
                )
            }

        //case FILTER_BY_PROVIDER:
        //    return {
        //
        //    }

        default:
            return state;
    }

}

export default rootReducer;