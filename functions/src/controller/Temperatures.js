const admin = require("firebase-admin");

const NotificationService = require('../services/Notifications');
const UpdateStatusService = require('../services/UpdateStatus');

module.exports = {
  findAll: (req, res) => {
    const ref = admin.database().ref('temperatures').limitToLast(10);
    ref.on('value', (snapshot) => {
      const notes = snapshot.val();
      const notesArray = Object.keys(notes).map(i => notes[i])
      return res.json(notesArray);
    });
  },

  create: (req, res) => {
    const ref = admin.database().ref('temperatures').push();
    const { temperature, arduinoId } = req.body;

    // warning notification
    if (temperature > 45 && temperature < 50) {
      NotificationService.warning(arduinoId);
      UpdateStatusService.warning();
    } 
    
    // danger notification
    if (temperature >= 50  ) {
      NotificationService.danger(arduinoId);
      UpdateStatusService.danger();
    }

    if (temperature <= 30) {
      UpdateStatusService.good();
    }

    const temperatures = {
      id: ref.getKey(),
      arduinoId: req.body.arduinoId,
      temperature: req.body.temperature,
      timestamp: Date.now(),
    };

    ref.set(temperatures);

    const response = {
      message: 'created',
      status: '201'
    }
    return res.json(response);
  }
}
