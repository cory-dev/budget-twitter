// /.netlify/functions/create_comment
let firebase = require('./firebase')

exports.handler = async function (event) {
  let db = firebase.firestore()
  let newComment = JSON.parse(event.body)

  newComment.timestamp = firebase.firestore.FieldValue.serverTimestamp()

  // cng Saturday, 12:31pm noticed that new tweets were going in the wrong place
  let docRef = await db.collection('comments').add(newComment)
  newComment.id = docRef.id

  return {
    statusCode: 200,
    body: JSON.stringify(newComment)
  }
}