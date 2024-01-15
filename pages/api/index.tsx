import getNotifications from './mocks/get/getNotifications'
import publicationsMock from './mocks/get/publications'
import home from './mocks/get/home'
import getArticles from './mocks/get/getArticles'
import getArticlesLimit from './mocks/get/getArticlesLimit'
import validateLogin from './mocks/get/validateLogin'
import getChallenges from './mocks/get/getChallenges'
import createTransaction from './mocks/post/createTransaction'
import getCompetitions from './mocks/get/getCompetitions'
import updateExperience from './mocks/post/updateExperience'

export default function handler(req, res) {
  const operationName = req.headers?.['operation-name']
  const variables = req.headers?.['variables']
    ? JSON.parse(req.headers?.['variables'])
    : {}

  switch (operationName) {
    case 'updateExperience':
      res.status(200).json(updateExperience)
      break
    case 'createTransaction':
      res.status(200).json(createTransaction)
      break
    case 'getCompetitions':
      res.status(200).json(getCompetitions)
      break
    case 'getArticles':
      if (variables?.limit === 1) res.status(200).json(getArticlesLimit)
      res.status(200).json(getArticles)
      break
    case 'getChallenges':
      res.status(200).json(getChallenges)
      break
    case 'validateLogin':
      res.status(200).json(validateLogin)
      break
    case 'getNotifications':
      res.status(200).json(getNotifications)
      break
    case 'publications':
      res.status(200).json(publicationsMock)
      break
    case 'home':
      res.status(200).json(home)
      break
    default:
      res.status(200).json({})
  }
}
