'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        firstName: 'Carlos',
        lastName: 'Hernandez',
        username: 'carlos',
        email: 'carloshdzrco@gmail.com',
        password: 'Ilovecoding123!',
        resetLink: '',
        avatar: 'https://joeschmoe.io/api/v1/jack',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Khanh',
        lastName: 'Trinh',
        username: 'khanh',
        email: 'kqtrinh87@gmail.com',
        password: 'Ilovecoding123!',
        resetLink: '',
        avatar: 'https://joeschmoe.io/api/v1/jake',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Fiona',
        lastName: 'Eckert',
        username: 'fiona',
        email: 'fionameckert@gmail.com',
        password: 'Ilovecoding123!',
        resetLink: '',
        avatar: 'https://joeschmoe.io/api/v1/jazebelle',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Tim',
        lastName: 'Robinson',
        username: 'tim',
        email: 'trobinson@gmail.com',
        password: 'Thisismypassw0rd!',
        resetLink: '',
        avatar: 'https://joeschmoe.io/api/v1/jia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Emma',
        lastName: 'Stone',
        username: 'emma',
        email: 'estone@gmail.com',
        password: 'Abcdef123!',
        resetLink: '',
        avatar: 'https://joeschmoe.io/api/v1/jodi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Tom',
        lastName: 'Hanks',
        username: 'tom',
        email: 'tomhanks@gmail.com',
        password: 'Therealt0mhanks!',
        resetLink: '',
        avatar: 'https://joeschmoe.io/api/v1/jed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Jennifer',
        lastName: 'Lopez',
        username: 'jlo',
        email: 'jlo@gmail.com',
        password: 'passw0rd!?!?',
        resetLink: '',
        avatar: 'https://joeschmoe.io/api/v1/jenni',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Beyonce',
        lastName: 'Knowles',
        username: 'yonce',
        email: 'beyonce@apple.com',
        password: 'passw0rd!?!?',
        resetLink: '',
        avatar: 'https://joeschmoe.io/api/v1/jess',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Dre',
        lastName: 'Taylor',
        username: 'drtaylor',
        email: 'dretaylor@yahoo.com',
        password: 'Codingrox1234!',
        resetLink: '',
        avatar: 'https://joeschmoe.io/api/v1/jordan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Dez',
        lastName: 'Bryan',
        username: 'dezsays',
        email: 'dezthecoder@gmail.com',
        password: 'passw0rd!?!?',
        resetLink: '',
        avatar: 'https://joeschmoe.io/api/v1/jeane',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
