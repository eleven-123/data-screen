export default {
    plugins: [
      // ref: https://umijs.org/plugin/umi-plugin-react.html
      ['umi-plugin-react', {
        antd: true,
        dva: false,
        dynamicImport: false,
        title: '智能零售驾驶舱',
        dll: false,
        routes: {
          exclude: [],
        },
        hardSource: false,
      }],
    ],

  }
  