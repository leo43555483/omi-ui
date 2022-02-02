import LayOut from './LayOut.vue'

export default function createView (id, Component) {
  return {
    name: id,
    render () {
      return (
        <LayOut>
          <Component />
        </LayOut>
      )
    }
  }
}
