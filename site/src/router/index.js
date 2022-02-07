import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'

Vue.use(VueRouter)
const excludeRoute = ['Home']
function getBaseName (filePath) {
  const re = /(\w+)\.(vue|js)$/gi

  const macthes = re.exec(filePath) || []
  return macthes[1] || ''
}

function importPages () {
  const reader = require.context('../components/', false, /(\.vue|\.js)$/)
  const routes = []
  reader.keys().forEach((item) => {
    let baseName = getBaseName(item)
    if (baseName !== '' && !excludeRoute.includes(baseName)) {
      const comp = reader(item).default
      const id = comp.name
      baseName = baseName.replace(/^\w/, baseName[0].toLowerCase())
      routes.push({
        name: id,
        path: '/' + baseName,
        component: () => createView(id)(comp)
      })
    }
  })
  return routes
}

function createView (id) {
  return (c) => import('../views/createView').then((r) => r.default(id, c))
}

const routers = {
  mode: 'hash',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    ...importPages()
  ]
}
export default new VueRouter(routers)
