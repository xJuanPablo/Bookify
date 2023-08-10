const Users = require('./Users');
const Library = require('./Library');
const Reading_Entry = require('./Reading_entry');

Users.hasMany(Library, {
        foreignKey: 'user_id' 
    });

Library.belongsTo(Users, { 
        foreignKey: 'user_id' 
    });

Users.hasMany(Reading_Entry, { 
    foreignKey: 'user_id' 
    });

Reading_Entry.belongsTo(Users, { 
    foreignKey: 'user_id' 
    });