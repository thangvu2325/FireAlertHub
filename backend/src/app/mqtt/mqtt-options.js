const options = {
  host: "mqtt://mqtt.innoway.vn",
  username: "Dev_Web",
  password: "b0xgB0OqEtojp89jbKabNeuVuoaw874f",
  clientId: "Dev_Web",
  keepalive: 10,
  protocolId: "MQTT",
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 10000,
  will: {
    topic: "user/status",
    payload: "hihi", // Thông điệp "làm ý cuối" khi client mất kết nối
    qos: 0, // Quality of Service level
    retain: false, // Giữ lại t
  },
  rejectUnauthorized: false,
};
module.exports = options;
