import {
    GET_OWNERS,
    GET_NAME_OWNER,
    FILTER_BY_OWNER,
    GET_PROVIDERS,
    GET_NAME_PROVIDER,
    GET_SERVICE_PROVIDERS,
    FILTER_BY_SERVICE_PROVIDER
} from '../actions/types';

// Definir constante con un objeto de estados iniciales.
const initialState = {
    owners: [],
    copyOwners: [],
    providers: [],
    copyProviders: [],
    services: []
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

        case GET_PROVIDERS:
            return {
                ...state,
                providers: action.payload,
                copyProviders: action.payload
            }

        case GET_NAME_OWNER:
            return {
                ...state,
                copyOwners: action.payload,
            }

        case GET_NAME_PROVIDER:
            return {
                ...state,
                copyProviders: action.payload
            }

            case GET_SERVICE_PROVIDERS:
            return {
                ...state,
                services: action.payload
            }

        case FILTER_BY_OWNER:
            console.log("REDUCER FILTER_BY_OWNER", action.payload);
            console.log("REDUCER state.owners", state.owners);
            return {
                ...state,
                copyOwners: state.owners.filter(o => action.payload)
            }

        case FILTER_BY_SERVICE_PROVIDER:
            console.log("REDUCER FILTER_BY_SERVICE_PROVIDER", action.payload);
            console.log("REDUCER state.providers", state.providers);
            return {
                ...state,
                services: state.providers.filter(p => action.payload)
            }

        default:
            return state;
    }

}

export default rootReducer;