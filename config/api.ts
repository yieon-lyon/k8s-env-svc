/**
 * @discription: express api controll
 * @write: yieon
 * @date: 2023-04-24
 */
// @ts-ignore
const { /*getPods,*/ getSecret, getSecretList, updateSecretData } = require('./api/events.ts')

module.exports = (server, handle) => {

  server.get('*', (req, res) => handle(req, res))

  // server.post('/kube/get/pods', getPods)

  server.post('/kube/get/secret', getSecret)

  server.post('/kube/get/secret-list', getSecretList)

  server.put('/kube/update/secret-data', updateSecretData)

};
