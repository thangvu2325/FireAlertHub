const User = require("../models/User");
const Sensor = require("../models/Sensor");
const messagingClient = require("../mqtt/mqtt");
class apiControllers {
  publishUsertoDevice(req, res) {
    User.findById(req.query.id)
      .then((user) => {
        if (user) {
          const Lattitude = user.location.split(",")[0];
          const Longitude = user.location.split(",")[1];
          const jsonString = JSON.stringify({
            [user.gateway.name]: {
              Lattitude: Number(Lattitude),
              Longitude: Number(Longitude),
            },
          });
          messagingClient.publish(
            `messages/dc9d5717-2522-4f39-a899-cce286152284/${user.gateway.name}`,
            jsonString,
            { qos: 0, retain: true }
          );
        }
      })
      .then(() => {
        return res.status(200).json({ status: "Gửi thành công!" });
      })
      .catch((error) => {
        return res.status(500).json({ error: "Lỗi máy chủ nội bộ." });
      });
  }
  // addSmokeValueinArrayValue(req, res) {
  //   const data = { ...req.body };
  //   User.findById(req.query.id)
  //     .populate("roles", "-__v")
  //     .then((user) => {
  //       if (!user) {
  //         return res.status(404).json({ error: "Không tìm thấy user" });
  //       }
  //       if (user.sensors.length === 0) {
  //         return res
  //           .status(404)
  //           .json({ error: "Không có sensor nào được liên kết với user" });
  //       }
  //       user.sensors[0].smoke_value.push(data);
  //       return user.sensors[0].save();
  //     })
  //     .then(() => {
  //       res.status(200).send("Cập nhật thành công");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json({ error: "Lỗi máy chủ nội bộ." });
  //     });
  // }
  // setLocation(req, res) {
  //   User.findById(req.query.id)
  //     .populate("roles", "-__v")
  //     .populate("gateway.nodes", "-__v")
  //     .then((user) => {
  //       if (user) {
  //         const data = user.gateway.nodes[0].nodes;
  //         return res.status(200).json({ data });
  //       }
  //     })
  //     .catch((error) => {
  //       return res.status(500).json({ error: "Internal Server Error" });
  //     });
  // }
  getNodesOfUser(req, res) {
    User.findById(req.query.id)
      .populate("roles", "-__v")
      .populate("gateway.nodes", "-__v")
      .then((user) => {
        if (user) {
          const data = user.gateway.nodes[0].nodes;
          return res.status(200).json({ data });
        }
      })
      .catch((error) => {
        return res.status(500).json({ error: "Internal Server Error" });
      });
  }
  getAllUserinUserManager(req, res) {
    User.findById(req.query.id)
      .populate("usersManager", "-__v")
      .then((user) => {
        if (user) {
          return res.status(200).json(user.usersManager[0].Users);
        }
      })
      .catch((error) => {
        return res.status(500).json({ error: "Internal Server Error" });
      });
  }
  getAllUserWarninginUserManager(req, res) {
    User.findById(req.query.id)
      .populate("usersManager", "-__v")
      .populate("gateway.nodes", "-__v")
      .then((user) => {
        if (user) {
          const userWarning = user.usersManager[0]?.Users.filter((user) => {
            let isWarning = false;
            user.nodes.forEach((e) => {
              if (e.warning === true) {
                isWarning = true;
              }
            });
            return isWarning;
          });
          return res.status(200).json(userWarning);
        }
      });
  }
  getLocationofAllUser(req, res) {
    User.find()
      .populate("roles", "-__v")
      .populate("usersManager", "-__v")
      .populate("gateway.nodes", "-__v")
      .then((users) => {
        const data = {
          users: [],
          fireStation: [],
        };
        users.forEach((user) => {
          if (user.roles[0].name === "user") {
            const lat = user.location.split(",")[0];
            const lng = user.location.split(",")[1];
            data.users.push({
              location: {
                lat: lat,
                lng: lng,
              },
              email: user.email,
              phone: user.phone,
              gateway: user.gateway.name,
              userId: user.id,
            });
          } else {
            const lat = user.location.split(",")[0];
            const lng = user.location.split(",")[1];
            data.fireStation.push({
              location: {
                lat: lat,
                lng: lng,
              },
              userId: user.id,
            });
          }
        });
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(500).json({ error: error });
      });
  }
  // Inbox
  getInbox(req, res) {
    User.findById(req.params.userId)
      .then((user) => {
        if (user) {
          return res.status(200).json(user.inbox.reverse());
        }
      })
      .catch((error) => {
        return res.status(500).json({ error: "Internal Server Error" });
      });
  }
  handleCheckInbox(req, res) {
    User.findById(req.params.userId)
      .then((user) => {
        if (user) {
          const inboxSelect = user.inbox.find(
            (inbox) => inbox.id === req.params.inboxId
          );

          if (inboxSelect) {
            inboxSelect.check = true;

            user
              .save()
              .then(() => {
                res.status(200).json({
                  status: "Thông báo này đã được đánh dấu là đã xem.",
                });
              })
              .catch((saveError) => {
                console.error("Error saving user:", saveError);
                res.status(500).json({
                  error: "Error saving user after marking inbox as checked.",
                });
              });
          } else {
            res.status(404).json({ status: "Không tìm thấy thông báo này." });
          }
        } else {
          res.status(404).json({ status: "Không tìm thấy người dùng." });
        }
      })
      .catch((findError) => {
        console.error("Error finding user:", findError);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
  handleDeleteInbox(req, res) {
    User.findById(req.params.userId)
      .then((user) => {
        if (user) {
          user.inbox = user.inbox.filter(
            (inbox) => inbox.id !== req.params.inboxId
          );

          user
            .save()
            .then(() => {
              res
                .status(200)
                .json({ message: "Inbox message deleted successfully." });
            })
            .catch((saveError) => {
              console.error("Error saving user:", saveError);
              res.status(500).json({
                error: "Error saving user after deleting inbox message.",
              });
            });
        } else {
          res.status(404).json({ error: "User not found." });
        }
      })
      .catch((findError) => {
        console.error("Error finding user:", findError);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
}

module.exports = new apiControllers();
