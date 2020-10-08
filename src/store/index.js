import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    user: {},
    error: '',
    status: false,
  },
  mutations: {
    updateStatus(state, user) {
      state.user = user,
      state.status = status
    },
    updateError(state, error) {
      state.error = error
    },
  },
  actions: {
    auth: function(context,payload){
      //console.log(payload);
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
            user => {
                if(user){
                  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
                  context.commit('updateStatus',{ token:user.user.xa, email:user.user.email})
                }
            },
            err => {
                this.model.error = err.message
            }        
      )
      console.log('after create');
    },
    authState: function(context){
      firebase.auth().onAuthStateChanged((user) => {
        if(!user){
          //location.href = '.';          
          console.log('your not logind');
        }else{
          console.log('your logind');
          context.commit('updateStatus',{ token:user.xa, email:user.email})
        }
      })
    },
    logout: async function(context){
      await firebase.auth().signOut();
      await context.commit('updateStatus',{token:'',email:''})
      console.log('remove user info');      
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isSignedIn(state) {
      return state.status
    }
  },
  plugins: [createPersistedState({
    key: 'example',
    paths: ['user'],
    storage: window.sessionStorage
  })]
})
