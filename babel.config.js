module.exports = function (api) {
  api.cache(true);
  let plugins = ['@babel/plugin-transform-async-generator-functions'];

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins,
  };
};
