module.exports = {
  publicPath: "/ffc/",
  transpileDependencies: ["vuetify"],
  pwa: {
    themeColor: "#363636",
    msTileColor: "#3F51B5",
    manifestOptions: {
      name: "Fancy Flashcard",
      short_name: "Fancy Flashcard",
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Fancy Flashcard";
      return args;
    });
    config.plugin("define").tap((args) => {
      args[0]["process.env"]["VERSION"] = JSON.stringify(
        require("./package.json").version
      );
      return args;
    });
  },
};
