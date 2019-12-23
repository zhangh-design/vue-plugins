export default {
  // props: ['tag'],
  data () {
    return {
      tag: 'p'
    }
  },
  inject: {
    setChildrenRef: {
      default: () => {}
    }
  },
  methods: {
    getMessage (val) {
      console.info(val);
    }
  },
  render (h) {
    console.info('tag ', this.tag);
    return h(this.tag, {
      on: {
        click: () => {
          this.tag = 'h3'
        }
      },
      directives: [
        {
          name: 'f-ref',
          value: c => this.setChildrenRef('ChildrenJ', c)
          // value: this.getMessage,
          // expression: 'getMessage'
        }
      ]
    }, 'J组件')
  }
}
