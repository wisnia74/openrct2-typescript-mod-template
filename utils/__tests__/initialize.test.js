beforeAll(() => {
  const { createFolder } = require('../functions');
  createFolder(`${__dirname}/test`);
});

// describe('', () => {
//   describe('', () => {
//     it();
//   });
// });

afterAll(() => {
  const { removeFolder } = require('../functions');
  removeFolder(`${__dirname}/test`);
});
