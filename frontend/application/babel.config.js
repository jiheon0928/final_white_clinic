module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      // 필요한 경우 다른 플러그인 추가
    ],
  };
};