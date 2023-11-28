module.exports = (sequelize, Sequelize) => {
  const Moments = sequelize.define("moments", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: Sequelize.INTEGER,
    },
    photo: {
      type: Sequelize.STRING,
    },
    /**
     * @type {JSON}
     * @param {string} content.title - title of the moment
     * @param {string} content.text - text of the moment
     * @param {string} content.type - type of the moment (photo, video)
     * @param {string[]} content.photo - array of photo url
     * @param {string[]} content.video - array of video url
     * @param {string[]} content.mention - array of mention course id
     * @example
     * {
     * "title": "xxx",
     * "text": "xxx",
     * "type": "photo",
     * "photo": ["string"],
     * "video": [],
     * mention: [x, x],
     * }
     */
    content: {
      type: Sequelize.JSON,
    },
    tags: {
      type: Sequelize.JSON,
    },
    like: {
      type: Sequelize.INTEGER,
    },
    comment: {
      type: Sequelize.JSON,
    },
    lastUpdate: {
      type: Sequelize.DATE,
    },
  });
  return Moments;
};
