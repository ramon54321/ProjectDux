declare namespace Frontend {
  export namespace Bundles {
    type Name = 'app'
  }
  export namespace Components {
    type Name = 'Welcome' | 'NotFound' | 'App'
  }
  export namespace Views {
    type Name = 'index'
    interface Props {
      component: Components.Name
      bundle: Bundles.Name
      initialState: any
    }
  }
}
