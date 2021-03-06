// CNG 10:45 am CPT this was commented out, I uncommented it because we need it for auth
let db = firebase.firestore()

// cng sign out if you are signed in, else proceed as expected
// window.addEventListener('DOMContentLoaded', async function(user) {
// if (user)
// firebase.auth().signout()
// })

firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in

    console.log('signed in')

    // firebase.auth().signOut()

    // console.log('signed out')

    // Ensure the signed-in user is in the users collection
    db.collection('users').doc(user.uid).set({
      name: user.displayName,
      email: user.email
    })

        // Sign-out button
      //   document.querySelector('.sign-in-or-sign-out').innerHTML = `
      //   <div class="md:mx-0 mx-4"><span class="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Welcome ${user.displayName}!</span></div>
      //   <button class="text-pink-500 underline sign-out">Sign Out</button>
      // `
      // Sign-out button event
      // document.querySelector('.sign-out').addEventListener('click', function(event) {
      //   console.log('sign out clicked')
      //   firebase.auth().signOut()
      //   document.location.href = 'index.html'
      // })

  } else {
    // Signed out
    console.log('signed out')

    // Hide the form when signed-out
   // document.querySelector('form').classList.add('hidden')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'dashboard.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)

 
  }
})
