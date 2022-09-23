module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: { unique: true, type: DataTypes.STRING },
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'users',
    },
  );

  Users.associate = (models) => {
    Users.hasMany(
      models.Sales,
      { foreignKey: 'userId', as: 'Sales' },
      { foreignKey: 'sellerId', as: 'Sales' },
    );
  };

  return Users;
};
