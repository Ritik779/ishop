const { createSlice } = require('@reduxjs/toolkit')

const UserSlice = createSlice(
    {
        name: "User",
        initialState: {
            data: null,
            timestamp: null
        },
        reducers: {
            lstouser(state) {
                if (localStorage.getItem("user")) {
                    const logintimestamp = localStorage.getItem("user_timestamp")
                    const now = new Date().getTime()
                    const diff = now - logintimestamp
                    if(diff >= Number(process.env.NEXT_PUBLIC_LOGIN_ALLOWED_TIME)){
                        localStorage.removeItem("user")
                        localStorage.removeItem("user_timestamp")
                        return;
                    }
                    state.timestamp = lstouser
                    state.data = JSON.parse(localStorage.getItem("user"))
                }
            },
            updateUserData(state,actions){
                state.data = actions.payload.user
                localStorage.setItem("user",JSON.stringify(actions.payload.user))
            },
            login(state, actions) {
                state.data = actions.payload.user;
                state.timestamp = new Date().getTime()
            },
            logout(state) {
                state.data = null;
                state.timestamp = null;
                localStorage.removeItem("user")
                localStorage.removeItem("user_timestamp")
            }
        }
    }
)

export const { login, logout, lstouser,updateUserData } = UserSlice.actions;
export default UserSlice.reducer;

// console.log(7*24*60*60*1000)
// 604800000 = output
// console.log(2*60*1000)