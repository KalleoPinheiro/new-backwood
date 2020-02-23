module.exports = {
  up: (queryInterface, dataTypes) => {
    return queryInterface.createTable('users', {
      id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: dataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      admin: {
        type: dataTypes.BOOLEAN,
        default: false,
        allowNull: false,
      },
      created_at: {
        type: dataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: dataTypes.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
