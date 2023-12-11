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
    userVideo: {
      type: Sequelize.JSON,
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
