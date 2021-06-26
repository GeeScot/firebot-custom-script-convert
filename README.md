## Firebot Custom Script: Convert Imperial/Metric
Convert Imperial to Metric and vice versa as a Firebot command.

### how to use this script
Copy the file src/script.js in to the Firebot custom scripts folder as prompted by Firebot.

### install
```
npm install
```

### build
```
npm run build
```

### test
```
npm test
```

### Firebot types
```js
type FirebotRequest = {
  parameters: { 
    message: string
  },
  trigger: {
    type: string,
    metadata: {
      username: string,
      userCommand: {
        trigger: string,
        args: string[]
      }
    }
  }
}

type FirebotEffectType = 'firebot:chat';
type FirebotChatter = 'Streamer' | 'Bot';

type FirebotEffect = {
  type: FirebotEffectType,
  chatter: FirebotChatter,
  message: string
}

type FirebotResponse = {
  success: boolean,
  effects: FirebotEffect[]
}
```
