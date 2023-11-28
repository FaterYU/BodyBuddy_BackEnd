module.exports = (sequelize, Sequelize) => {
  const Fit = sequelize.define("fit", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    courseId: {
      type: Sequelize.INTEGER,
    },
    poseId: {
      type: Sequelize.INTEGER,
    },
    userVideo: {
      type: Sequelize.STRING,
    },
    score: {
      type: Sequelize.JSON,
    },
    latency: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.STRING,
    },
  });
  return Fit;
};
