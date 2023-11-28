module.exports = (sequelize, Sequelize) => {
  const Pose = sequelize.define("pose", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    photo: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.JSON,
    },
    tags: {
      type: Sequelize.JSON,
    },
    repetition: {
      type: Sequelize.INTEGER,
    },
    like: {
      type: Sequelize.INTEGER,
    },
    practiced: {
      type: Sequelize.INTEGER,
    },
  });
  return Pose;
};
