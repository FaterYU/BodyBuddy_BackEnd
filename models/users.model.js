module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    uid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    photo: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
    courses: {
      type: Sequelize.JSON,
    },
    follow: {
      type: Sequelize.JSON,
    },
    calendar: {
      type: Sequelize.JSON,
    },
    infomation: {
      type: Sequelize.JSON,
    },
    level: {
      type: Sequelize.STRING,
    },
    feature: {
      type: Sequelize.JSON,
    },
    lastLogin: {
      type: Sequelize.DATE,
    },
  });
  return Users;
};
