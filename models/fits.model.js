module.exports = (sequelize, Sequelize) => {
  const Fits = sequelize.define("fits", {
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
  return Fits;
};
