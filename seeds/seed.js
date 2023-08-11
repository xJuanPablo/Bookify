const sequelize = require('../config/connection');
const { Users, Library, Reading_Entry } = require('../models');


const sampleUsers = [
    { firstName: 'Chris', lastName: 'Banta', username: 'ChrisBanta', email: 'john@example.com', password: 'password123' },
];

const sampleReadingEntries = [
    { user_id: 1, date: new Date(), pages_read: 50 },
];

const sampleLibraryEntries = [
    { user_id: 1, book_name: 'Sample Book 1', author: 'Author 1', currently_reading: true, genre: 'Joe Mama', pages: 300, completed: false },
    { user_id: 1, book_name: 'Sample Book 2', author: 'Author 1', currently_reading: true, genre: 'Romance', pages: 250, completed: false },
    { user_id: 1, book_name: 'Sample Book 3', author: 'Author 2', currently_reading: false, genre: 'Non-Fiction', pages: 400, completed: true },
    { user_id: 1, book_name: 'Sample Book 4', author: 'Author 3', currently_reading: true, genre: 'Fiction', pages: 1200, completed: false },
    { user_id: 1, book_name: 'Sample Book 5', author: 'Author 4', currently_reading: false, genre: 'Horror', pages: 940, completed: true },
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Users.bulkCreate(sampleUsers, { individualHooks: true });
  await Reading_Entry.bulkCreate(sampleReadingEntries);
  await Library.bulkCreate(sampleLibraryEntries);

  process.exit(0);
};

seedDatabase();