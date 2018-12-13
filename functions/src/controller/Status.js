const admin = require("firebase-admin");

module.exports = {
  findAll: (req, res) => {
    // const ref = admin.database().ref('temperatures').limitToLast(10);
    // ref.on('value', (snapshot) => {
    //   const notes = snapshot.val();
    //   const notesArray = Object.keys(notes).map(i => notes[i])
    //   return res.json(notesArray);
    // });
    status = {
      value: 'ok',
      active: true,
    }

    return res.send(status);
  },

  create: (req, res) => {
    const ref = admin.database().ref('status').push();
    const { value, active } = req.body;

    const status = {
      id: ref.getKey(),
      value,
      active,
    };

    ref.set(status);

    const response = {
      message: 'created',
      status: '201'
    }
    return res.json(response);
  },

  find: (req, res) => {
    console.log('masuk');
    const ref = admin.database().ref();
    const query = ref.child('status').orderByChild('/active').equalTo(true);
    query.once('value', (snapshot) => {
      const notes = snapshot.val();
      const result = Object.keys(notes).map(i => notes[i]);
      return res.json(result);
    });
  }
}
