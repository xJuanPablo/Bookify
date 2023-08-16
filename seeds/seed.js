const sequelize = require('../config/connection');
const { Users, Library, Reading_Entry } = require('../models');


const sampleUsers = [
    { firstName: 'Chris', lastName: 'Banta', username: 'ChrisBanta', email: 'john@example.com', password: 'password123' },
    { firstName: 'Jenni', lastName: 'Aguilar', username: 'JenniAguilar', email: 'jenni@example.com', password: 'password123' },
];

const sampleReadingEntries = [
    {
        user_id: 2,
        date: new Date(new Date().setDate(new Date().getDate() - 6)),
        pages_read: 20,
      },
      {
        user_id: 2,
        date: new Date(new Date().setDate(new Date().getDate() - 5)),
        pages_read: 15,
      },
      {
        user_id: 2,
        date: new Date(new Date().setDate(new Date().getDate() - 4)),
        pages_read: 30,
      },
      {
        user_id: 2,
        date: new Date(new Date().setDate(new Date().getDate() - 3)),
        pages_read: 25,
      },
      {
        user_id: 2,
        date: new Date(new Date().setDate(new Date().getDate() - 2)),
        pages_read: 40,
      },
      {
        user_id: 2,
        date: new Date(new Date().setDate(new Date().getDate() - 1)),
        pages_read: 10,
      },
      {
        user_id: 2,
        date: new Date(),
        pages_read: 35,
      },
];

const sampleLibraryEntries = [
    { user_id: 2, book_name: 'The Enigmatic Quest', author: 'Jessica Bennett', currently_reading: false, genre: 'Mystery', pages: 344, completed: true },
    { user_id: 2, book_name: 'Echoes of Eternity', author: 'Alexander Mason', currently_reading: true, genre: 'Fantasy', pages: 512, completed: false },
    { user_id: 2, book_name: 'Whispers in the Wind', author: 'Emily Carter', currently_reading: true, genre: 'Romance', pages: 289, completed: false },
    { user_id: 2, book_name: 'Secrets of the Nightshade Manor', author: 'Jonathan Harris', currently_reading: false, genre: 'Thriller', pages: 421, completed: true },
    { user_id: 2, book_name: 'The Starlight Chronicles', author: 'Sophia Turner', currently_reading: true, genre: 'Science Fiction', pages: 367, completed: false },
    { user_id: 2, book_name: 'Sands of Destiny', author: 'Nathan Parker', currently_reading: false, genre: 'Adventure', pages: 456, completed: true },
    { user_id: 2, book_name: 'Whispers in the Shadows', author: 'Olivia Walker', currently_reading: true, genre: 'Mystery', pages: 298, completed: false },
    { user_id: 2, book_name: 'Eternal Echoes', author: 'William Roberts', currently_reading: false, genre: 'Fantasy', pages: 541, completed: true },
    { user_id: 2, book_name: 'The Last Voyage', author: 'Isabella Scott', currently_reading: true, genre: 'Adventure', pages: 387, completed: false },
    { user_id: 2, book_name: 'Songs of Serenity', author: 'Ethan Turner', currently_reading: false, genre: 'Poetry', pages: 137, completed: true },
    { user_id: 2, book_name: 'Beyond the Horizon', author: 'Olivia Mitchell', currently_reading: true, genre: 'Science Fiction', pages: 432, completed: false },
    { user_id: 2, book_name: 'The Silent Echo', author: 'Lucas Williams', currently_reading: false, genre: 'Mystery', pages: 310, completed: true },
    { user_id: 2, book_name: 'Realm of Dreams', author: 'Sophie Turner', currently_reading: true, genre: 'Fantasy', pages: 523, completed: false },
    { user_id: 2, book_name: 'Whispers in the Mist', author: 'Benjamin Harris', currently_reading: false, genre: 'Thriller', pages: 389, completed: true },
    { user_id: 2, book_name: 'Chronicles of Destiny', author: 'Emma Parker', currently_reading: true, genre: 'Adventure', pages: 456, completed: false },
    { user_id: 2, book_name: 'The Haunting Melody', author: 'Daniel Mitchell', currently_reading: false, genre: 'Horror', pages: 289, completed: true },
    { user_id: 2, book_name: 'Echoes of Tomorrow', author: 'Ava Scott', currently_reading: true, genre: 'Science Fiction', pages: 378, completed: false },
    { user_id: 2, book_name: 'Whispers of Fate', author: 'William Turner', currently_reading: false, genre: 'Fantasy', pages: 491, completed: true },
    { user_id: 2, book_name: 'The Lost Expedition', author: 'Sophia Roberts', currently_reading: true, genre: 'Adventure', pages: 421, completed: false },
    { user_id: 2, book_name: 'Harmony of Words', author: 'Ethan Mitchell', currently_reading: false, genre: 'Poetry', pages: 163, completed: true }
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Users.bulkCreate(sampleUsers, { individualHooks: true });
  await Reading_Entry.bulkCreate(sampleReadingEntries);
  await Library.bulkCreate(sampleLibraryEntries);

  process.exit(0);
};

seedDatabase();