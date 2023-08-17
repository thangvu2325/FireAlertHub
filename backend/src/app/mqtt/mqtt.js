const mqtt = require("mqtt");
const options = require("./mqtt-options");
const User = require("../models/User");
const sendSMS = require("../smsTwilio");

function messaging() {
  let client;

  // Connect to the message broker

  function connectWithPromise() {
    return new Promise((resolve, reject) => {
      try {
        client = mqtt.connect(options.host, options);
      } catch (err) {
        console.log("error connecting!");
        reject(err);
      }
      client.on("connect", function () {
        resolve("Connected!");
      });
    });
  }

  // Subscribe to a topic on to the broker
  function subscribe(topicName) {
    client.subscribe(topicName, function (err) {
      if (err) {
        console.error("Error subscribing to", topicName, err);
      }
    });
  }

  // Publish a message to the broker
  function publish(topicName, message) {
    client.publish(topicName, message, function (err) {
      if (err) {
        console.error("Error subscribing to", topicName, err);
      }
    });
  }
  // Register a function to handle received messages
  function registerMessageHandler(handler) {
    client.on("message", function (topic, message) {
      if (topic === "user/status") {
        const gatewayDisconnect = message.toString();
        User.findOne({ "gateway.name": gatewayDisconnect })
          .populate("roles", "-__v")
          .then((user) => {
            if (user) {
              const objectSMS = {
                body: `Thiết bị của bạn đã bị ngắt kết nối`,
                phone: user.phone,
              };
              console.log(objectSMS);
              sendSMS(objectSMS);
            }
          });
      } else if (
        topic === "messages/dc9d5717-2522-4f39-a899-cce286152284/attributets"
      ) {
        const parts = topic.split("/");
        const json = {
          topic: parts[parts.length - 1],
          content: JSON?.parse(message?.toString()),
        };
        const station = Object.keys(json.content)[0];
        const nodeList = [];
        const listNodeName = Object.keys(
          json.content[Object.keys(json.content)[0]][
            Object.keys(json.content[Object.keys(json.content)[0]])[0]
          ]
        );
        listNodeName.forEach((nodeName) => {
          const data =
            json.content[Object.keys(json.content)[0]][
              Object.keys(json.content[Object.keys(json.content)[0]])[0]
            ][nodeName];
          const dataConfig = {
            Fire_value: {
              x: new Date().toLocaleString("pt-BR"),
              y: data.Fire_value,
            },
            Smoke_value: {
              x: new Date().toLocaleString("pt-BR"),
              y: data.Smoke_value,
            },
            Gas_value: {
              x: new Date().toLocaleString("pt-BR"),
              y: data.Gas_value,
            },
            warning: data.warning,
          };
          nodeList.push({
            node_name: nodeName,
            ...dataConfig,
          });
        });
        const gateway = Object.keys(
          json.content[Object.keys(json.content)[0]]
        )[0];

        const jsonString = JSON.stringify(nodeList);
        handler(station, nodeList, gateway, jsonString);
        User.findOne({ "gateway.name": gateway })
          .populate("roles", "-__v")
          .then((user) => {
            if (user) {
              return handler(
                station,
                nodeList,
                gateway,
                jsonString,
                user.id,
                user.location
              );
            }
          });
      }
    });
  }

  return {
    connectWithPromise: connectWithPromise,
    subscribe: subscribe,
    publish: publish,
    registerMessageHandler: registerMessageHandler,
  };
}

let messagingClient = messaging();
module.exports = messagingClient;
