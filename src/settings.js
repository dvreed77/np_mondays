
console.log('in settings', process)


let API_ROOT
if (process.env.NODE_ENV === 'production') {
  API_ROOT = 'http://carbon.amers2.cis.trcloud:10070'
} else {
  API_ROOT = 'http://127.0.0.1:8000'
}

let RESOURCE_ROOT
if (process.env.NODE_ENV === 'production') {
  RESOURCE_ROOT = 'http://carbon.amers2.cis.trcloud:10070/static'
} else {
  RESOURCE_ROOT = '/data'
}

export {
  API_ROOT,
  RESOURCE_ROOT
}