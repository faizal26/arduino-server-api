const admin = require("firebase-admin");

getActiveStatusId = () => {
  return new Promise((resolve) => {
    const ref = admin.database().ref();
    const query = ref.child('status').orderByChild('/active').equalTo(true);
    query.on('value', (snapshot) => {
      const resultArr = snapshot.val();
      const result = Object.keys(resultArr).map(i => resultArr[i]);
      resolve(result[0]);
    });
  });
}

module.exports = {
  good: () => {
    getActiveStatusId().then((result) => {
      const ref = admin.database().ref();
      const { id, value } = result;
      updateDeactive = {
        id,
        value,
        active: false,
      }

      updateGood = {
        id: "-LTS2Pl7Rx-FNzd4d9cT",
        active: true,
        value: 'good',
      }

      updates = {};
      updates['/status/' + id] = updateDeactive;
      updates['/status/-LTS2Pl7Rx-FNzd4d9cT'] = updateGood;

      admin.database().ref().update(updates);
    })
  },

  warning: () => {
    getActiveStatusId().then((result) => {
      const ref = admin.database().ref();
      const { id, value } = result;
      updateDeactive = {
        id,
        value,
        active: false,
      }

      updateWarning = {
        id: "-LTS2i8AHGrmnh7ZMdkg",
        active: true,
        value: 'warning',
      }

      updates = {};
      updates['/status/' + id] = updateDeactive;
      updates['/status/-LTS2i8AHGrmnh7ZMdkg'] = updateWarning;

      admin.database().ref().update(updates);
    })
  },

  danger: () => {
    getActiveStatusId().then((result) => {
      const ref = admin.database().ref();
      const { id, value } = result;
      updateDeactive = {
        id,
        value,
        active: false,
      }

      updateDanger = {
        id: "-LTS2jshYWsnEsfK-k9O",
        active: true,
        value: 'danger',
      }

      updates = {};
      updates['/status/' + id] = updateDeactive;
      updates['/status/-LTS2jshYWsnEsfK-k9O'] = updateDanger;

      admin.database().ref().update(updates);
    })
  }
}