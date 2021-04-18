const quizAttemptsModel = require('../models/quiz-attempts/quiz-attempts-model');

const scoreQuiz = (questions) => {
  let numCorrect = 0;
  questions.forEach(q => {
    if (q.answer === q.correct) {
      numCorrect++;
    }
  });
  return 100 * (numCorrect / questions.length);
}

const findAttemptsForQuiz = (qzid) =>
    quizAttemptsModel.find({quiz: qzid})
    .populate('quiz', 'title _id');

const createAttempt = (qid, attempt) =>
    quizAttemptsModel.create({quiz: qid, answers: attempt, score: scoreQuiz(attempt)});

module.exports = {
  findAttemptsForQuiz,
  createAttempt
}