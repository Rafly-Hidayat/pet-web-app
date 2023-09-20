module.exports = (sequelize, DataTypes) => {

    // define the table
    const Vet = sequelize.define('vet',
        // define the column of the table
        {
            address: {
                type: DataTypes.TEXT, // set column type
                allowNull: false // set column not null
            },
            experience: {
                type: DataTypes.INTEGER, // set column type
                allowNull: false // set column not null
            },
            specialist: {
                type: DataTypes.TEXT, // set column type
                allowNull: true // set column not null
            },
            treatedAnimals: {
                type: DataTypes.TEXT, // set column type
                allowNull: true // set column not null
            },
        },
        // optional
        {
            freezeTableName: true,
        }
    );

    return Vet;

}