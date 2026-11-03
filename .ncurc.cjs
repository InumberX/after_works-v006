// npm-check-updates config
module.exports = {
  // @types/node は実行環境のメジャーバージョンに合わせる
  target: (name) => (name === '@types/node' ? 'minor' : 'latest'),
}
