import Vue from 'vue'
import firebase from 'firebase';
import router from './router';

Vue.config.productionTip = false


export default {
  init() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  },
  login(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      res.user.getIdToken().then(token => {
        localStorage.setItem('jwt', token);
        router.push('/top').catch(err => {
          console.log(err);
        })
      })
    },
    err => {
      console.log(err.message);
    })
  },
  logout() {
    firebase.auth().signOut()
    .then(() => {
      localStorage.removeItem('jwt')
    })
  },
  onAuth() {
    firebase.auth().onAuthStateChanged(user => {
      // firebaseにログイン済みであるなら
      console.log('hello');
      if(user){
        if(user.xa) {
          console.log(user.xa);
        }
        console.log(user);
      }else{
        console.log('not users');
      }
    })
  }
}
  