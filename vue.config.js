module.exports = {
  publicPath: "/ffc/",
  transpileDependencies: ["vuetify"],
  pwa: {
    themeColor: "#363636",
    msTileColor: "#3F51B5",
    manifestOptions: {
      name: "Fancy Flashcard",
      short_name: "FFC",
    },
  },
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'Fancy Flashcard'
      return args
    })
  },
};
