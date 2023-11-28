module.exports = (sequelize, Sequelize) => {
  const Courses = sequelize.define("courses", {
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
    duration: {
      type: Sequelize.INTEGER,
    },
  });
  return Courses;
};
