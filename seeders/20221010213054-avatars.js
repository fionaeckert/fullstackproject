'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('avatars', [
      {
        avatar: 'https://joeschmoe.io/api/v1/jia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/jordan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/jed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/jack',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/jon',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/jude',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/jane',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/jodi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/jess',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/josephine',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/joe',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/jeane',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/jacques',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/james',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/jocelyn',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/jaqueline',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/jazebelle',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/jerry',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/jean',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/josh',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/jana',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/jabala',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/jenni',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatar: 'https://joeschmoe.io/api/v1/julie',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        avatar: 'https://joeschmoe.io/api/v1/jai',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        avatar: 'https://joeschmoe.io/api/v1/jeri',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        avatar: 'https://joeschmoe.io/api/v1/jake',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        avatar: 'https://joeschmoe.io/api/v1/jolee',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ])
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
