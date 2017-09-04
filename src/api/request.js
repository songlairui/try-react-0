import AV from 'leancloud-storage'
const appId = '9XeVw1DEaX6G9hSM165OUIvn-gzGzoHsz'
const appKey = 'i7lRaDmESSFpIp9l1GkpNhCu'
AV.init({ appId, appKey })
console.info('request.js loaded')

export function addNewWork(state) {
  let err
  console.info(state)
  let data = Object.assign(
    {
      title: undefined,
      description: undefined,
      thumb: undefined,
      tags: []
    },
    state
  )
  if (!validForm(data)) {
    return new Promise.resolve({ err: false })
  }

  // 声明类型
  var WebWork = AV.Object.extend('WebWorks')
  // 新建对象
  var webWork = new WebWork()

  webWork.set('title', data.title)
  webWork.set('description', data.description)
  webWork.set('thumb', data.thumb)
  webWork.set('tags', data.tags)
  return webWork.save().then(
    function(oneWork) {
      console.log('oneWork is noted : ' + oneWork.id)
      return { err, result: oneWork, state }
    },
    function(error) {
      console.error(error)
      return { err: error }
    }
  )
}

export function getWorkList() {
  let query = new AV.Query('WebWorks')
  let colmap = ['title', 'screenshot', 'skills', 'time', 'description']

  return query.find().then(results => {
    // window.tmp || (window.tmp = results)
    // return results
    return results.map(result => {
      let formatResult = {}
      formatResult.id = result.id
      colmap.forEach(colname => {
        formatResult[colname] = result.get(colname)
      })
      return formatResult
    })
  })
}

function validForm(formData) {
  if (!formData || !formData.title) {
    return false
  }
  return true
}
