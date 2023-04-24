/**
 * @discription: Kubernetes secret manage component
 * @write: yieon
 * @date: 2023-04-24
 */

import React, {useEffect, useState} from 'react'
import {http} from '../store'

/** TODO: 2023-04-24 @yieon need to styled-component */

const TYPE = {
  KEY: 'KEY',
  VALUE: 'VALUE'
}
const KubeEvents = () => {

  const [namespace, _set_namespace] = useState('default')
  const [secretNameList, setSecretNameList] = useState(['none'])

  const [secretName, setSecretName] = useState(null)
  const [secretValues, setSecretValues] = useState(null)

  useEffect(() => {
    http().post('/kube/get/secret-list', {namespace}).then(res => {
      setSecretNameList(res.data)
    })
  }, [])
  const api_getKubeSecret = async () => {
    if (secretName !== undefined && secretName !== null && secretName !== '') {
      await http().post('/kube/get/secret', {secretName, namespace}).then(res => {
        setSecretValues(res.data)
      })
    } else {
      alert('SECRETNAME을 선택해주세용')
    }
  }

  const api_updateKubeSecret = () => {
    http().put('/kube/update/secret-data', {namespace, secretName, secretValues}).then(() => alert('secret update complete!')).catch(e => console.error(e))
  }

  // TODO: 2023-04-24 yieon need to func-refactoring
  const input_updateSecretValues = (type, val, key) => {
    const updateValues = JSON.parse(JSON.stringify(secretValues))
    if (type === TYPE.KEY) {
      updateValues[val] = updateValues[key]
      delete updateValues[key]
      setSecretValues(updateValues)
    } else if (type === TYPE.VALUE) {
      updateValues[key] = val
      setSecretValues(updateValues)
    }
  }

  return (
    <React.Fragment>
      <div>
        <div>
          <label>NAMESPACE: </label>
          <span>{namespace}</span>
        </div>
        <div>
          SECRET LIST
          {secretNameList.map(secretName => (
            <span key={secretName} onClick={() => setSecretName(secretName)}> | {secretName}</span>
          ))}
        </div>
        {secretName !== null &&
          <div>
            <div>
              <button onClick={() => api_getKubeSecret()}>get data</button>
            </div>
          </div>
        }
        {secretValues !== null &&
          <React.Fragment>
            {Object.keys(secretValues).map(key => (
              <div key={key}>
                <div>
                  <span>KEY</span>
                  <input onInput={event => input_updateSecretValues(TYPE.KEY, event.target['value'], key)} value={key}/>
                </div>
                <div>
                  <span>VALUE</span>
                  <input onInput={event => input_updateSecretValues(TYPE.VALUE, event.target['value'], key)} value={secretValues[key]}/>
                </div>
              </div>
            ))}
            <div>
              <button onClick={() => api_updateKubeSecret()}>secret update</button>
            </div>
          </React.Fragment>
        }
      </div>
    </React.Fragment>
  )
}

export default KubeEvents