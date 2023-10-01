import {createSlice} from '@reduxjs/toolkit';

const initialState = {
   userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setCredentials: (state,action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        clearCredentials: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
});

export const {setCredentials,clearCredentials} = loginSlice.actions;
export default loginSlice.reducer;