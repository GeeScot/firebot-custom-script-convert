const assert = require('assert');
const { run } = require('../src/convert');

function createMessage(message) {
  return {
    parameters: null,
    trigger: {
      type: 'command',
      metadata: {
        username: 'GeeScot',
        userCommand: {
          trigger: '!convert',
          args: [message]
        }
      }
    }
  };
}

async function execute(input, expected) {
  const message = createMessage(input);
  const response = await run(message);

  const actual = response.effects[0].message;
  assert.strictEqual(actual, expected);
}

describe('Convert: Firebot Custom Script Test', () => {
  it('Converts -12C to 10.40F', async () => {
    await execute('-12C', '-12C = 10.40F');
  });

  it('Converts -10F to -23.33C', async () => {
    await execute('-10F', '-10F = -23.33C');
  });

  it('Converts 24C to 75.20F', async () => {
    await execute('24C', '24C = 75.20F');
  });

  it('Converts 60F to 15.56C', async () => {
    await execute('60F', '60F = 15.56C');
  });

  it('Converts 6\'1 to 185.42cm', async () => {
    await execute('6\'1', '6\'1 = 185.42cm');
  });

  it('Converts 186cm to 6\'1', async () => {
    await execute('186cm', '186cm = 6\'1');
  });

  it('Converts 1.86m to 6\'1', async () => {
    await execute('1.86m', '1.86m = 6\'1');
  });

  it('Converts 200miles to 321.80km', async () => {
    await execute('200miles', '200miles = 321.80km');
  });

  it('Converts 200km to 124.30 miles', async () => {
    await execute('200km', '200km = 124.30 miles');
  });

  it('Converts 200kilometers to 124.30 miles', async () => {
    await execute('200kilometers', '200kilometers = 124.30 miles');
  });
});
