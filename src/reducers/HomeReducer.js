
export const actionTypes = {
    SET_COUNT : "SET_COUNT",
    SET_SECTION: "SET_SECTION"
}
 
export const initialState = {
    count: 0,
    section: 'index'
};
 
 const StateReducer = (state = initialState, action) => {
     switch (action.type) {
        case actionTypes.SET_COUNT:
            return {
                ...state,
                count: action.payload
            };
        case actionTypes.SET_SECTION:
            return {
                ...state,
                section: action.payload
            };
       default:
        return state;
    }
 };
 
export default StateReducer;