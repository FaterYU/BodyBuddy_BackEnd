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
    /**
     * @param {JSON} content
     * @param {Array} content.poseList - List of pose id
     * @param {String} content.description
     * @param {Array} content.class
     * @param {Array} content.suitable
     * @param {Array} content.prepare
     * @param {Array} content.reaction
     */
    content: {
      type: Sequelize.JSON,
    },
    duration: {
      type: Sequelize.INTEGER,
    },
    /**
     * @param {JSON} infomation
     * @param {INTEGER} infomation.calorie
     * @param {INTEGER} infomation.practiced
     * @param {Array} infomation.tags
     * @param {Float} infomation.score
     * @param {INTEGER} infomation.level
     *
     */
    infomation: {
      type: Sequelize.JSON,
    },
  });
  return Courses;
};
