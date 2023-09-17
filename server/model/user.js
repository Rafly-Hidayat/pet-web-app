module.exports = (sequelize, DataTypes) => {

    // define the table
    const User = sequelize.define('user',
        // define the column of the table
        {
            username: {
                type: DataTypes.STRING, // set column type
                allowNull: false // set column not null
            },
            password: {
                type: DataTypes.STRING, // set column type
                allowNull: false // set column not null
            },
            fullName: {
                type: DataTypes.STRING, // set column type
                allowNull: true // set column not null
            },
            email: {
                type: DataTypes.STRING, // set column type
                allowNull: true // set column not null
            },
            role: {
                type: DataTypes.STRING, // set column type
                allowNull: false, // set column not null
                defaultValue: 'user', // set column default value
            },
            idVet: {
                type: DataTypes.INTEGER, // set column type
                allowNull: true // set column not null
            },
        },
        // optional
        {
            freezeTableName: true,
        }
    );

    return User;

}