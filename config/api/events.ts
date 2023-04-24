/**
 * @discription: Kubernetes - kubectl command event func
 * @write: yieon
 * @date: 2023-04-24
 */
// @ts-ignore
const shell = require('shelljs');

// @ts-ignore
const getPods = (_req, res) => {
  const pods = shell.exec('kubectl get pods --namespace=default')
  res.json(pods)
}

// @ts-ignore
const getSecret = (req, res) => {
  const secretName = req.body.secretName
  const namespace = req.body.namespace
  const secretData = shell.exec(`kubectl get secret ${secretName} --namespace=${namespace} -o jsonpath=\'{.data}\'`)
  const secretDataJson = JSON.parse(secretData.stdout)
  let decodeSecretData = {}
  Object.keys(secretDataJson).forEach(key => {
    decodeSecretData[key] = shell.exec(`echo ${secretDataJson[key]} | base64 --decode`)
  })
  res.json(decodeSecretData)
}

// @ts-ignore
const getSecretList = (req, res) => {
  const namespace = req.body.namespace
  const secretListJson = shell.exec(`kubectl get secrets -o jsonpath='{.items..metadata.name}' --namespace=${namespace}`)
  res.json(secretListJson.split(' '))
}

// @ts-ignore
const updateSecretData = (req, res) => {
  const data = req.body

  let encodeSecretData = {}
  Object.keys(data.secretValues).forEach(key => {
    encodeSecretData[key] = shell.exec(`echo ${data.secretValues[key]} | base64`).stdout
  })
  const secretPatch = shell.exec(`kubectl patch secret ${data.secretName} --namespace=${data.namespace} --patch="{\"data\": ${JSON.stringify(encodeSecretData)}}"`)
  res.json(secretPatch.stdout)
}

module.exports = { getPods, getSecret, getSecretList, updateSecretData }
