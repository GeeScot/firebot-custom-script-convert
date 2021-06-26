import { FirebotRequest, FirebotResponse } from 'firebot';

exports.getScriptManifest = () => {
  return {
    name: 'Convert Imperial/Metric',
    description: 'Converts values from imperial to metric and vice versa',
    author: 'GeeScot',
    version: '1.0',
    website: 'https://www.twitch.tv/GeeScot',
    startupOnly: false,
    firebotVersion: '5'
  };
}

exports.run = (runRequest: FirebotRequest) => {
  const command = runRequest.trigger.metadata.userCommand.args.join('');
  let response = "";

  switch (true) {
  case /^-{0,1}[0-9]+[cf]{1}$/i.test(command):
    response = temperature(command);
    break;
  case /^([0-9]{1}[']{1}[0-9]{1,2})$/i.test(command):
    response = feetToCM(command);
    break;
  case /^([0-9]*cm)$/i.test(command):
    response = cmToFeet(command);
    break;
  case /^([0-9]{1,3}[.]{1}[0-9]{1,2}m)$/i.test(command):
    response = metresToFeet(command);
    break;
  case /^([0-9]{1,6}miles)$/i.test(command):
    response = milesToKilometres(command);
    break;
  case /^([0-9]*(km|kilometers|kilometres))$/i.test(command):
    response = kilometresToMiles(command);
    break;
  }

  return createResponse(response);
}

function createResponse(message: string): Promise<FirebotResponse> {
  return new Promise((resolve, reject) => {
    const response: FirebotResponse = {
      success: true,
      effects: [{
        type: 'firebot:chat',
        message: message,
        chatter: 'Bot'
      }] 
    }

    resolve(response);
  });
}

function milesToKilometres(miles: string): string {
  const km = parseFloat(miles) * 1.609;
  return `${miles} = ${km.toFixed(2)}km`;
}

function kilometresToMiles(km: string): string{
  const miles = parseFloat(km) / 1.609;
  return `${km} = ${miles.toFixed(2)} miles`;
}

function temperature(temp: string): string{
  const value = parseFloat(temp);
  if (temp.toLowerCase().endsWith('c')) {
    const fValue = (value * (9 / 5)) + 32;
    return `${temp} = ${fValue.toFixed(2)}F`;
  } else {
    const cValue = (value - 32) * (5/9);
    return `${temp} = ${cValue.toFixed(2)}C`;
  }
}

function feetToCM(height: string): string {
  const [feet, inches] = height.split('\'', 2);
  const heightInCm = (parseInt(feet)*12 + parseInt(inches))*2.54;
  return `${height} = ${heightInCm.toFixed(2)}cm`;
}

function cmToFeet(height: string): string {
  const cmValue = parseFloat(height);
  return `${height} = ${cmToInches(cmValue)}`;
}

function metresToFeet(height: string): string {
  const mValue = parseFloat(height);
  return `${height} = ${cmToInches(mValue*100)}`;
}

function cmToInches(heightCm: number): string {
  const totalInches = heightCm / 2.54;
  const totalFeet = Math.floor(totalInches/12);
  const remainingInches = Math.floor(totalInches % 12);
  return `${totalFeet}'${remainingInches}`;
}
