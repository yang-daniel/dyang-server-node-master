const quizAttemptDao = require('../daos/quiz-attempts-dao');

module.exports = (app) => {
  const createAttempt = (req, res) => {
    const qid = req.params['qid'];
    const attempt = req.body;
    quizAttemptDao.createAttempt(qid, attempt)
    .then(attempt => res.send(attempt));
  }

  const findAttemptsForQuiz = (req, res) => {
    const qid = req.params['qid'];
    quizAttemptDao.findAttemptsForQuiz(qid)
    .then(attempts => res.send(attempts));
  }

  app.post('/api/quizzes/:qid/attempts', createAttempt);
  app.get('/api/quizzes/:qid/attempts', findAttemptsForQuiz);
}