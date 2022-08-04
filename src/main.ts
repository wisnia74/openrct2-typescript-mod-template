import { getHandymen, getMechanics, getSecurity, getEntertainers } from './utils';

const main = (): void => {
  console.log(`Hello stranger! Your plug-in has started!`);

  console.log(
    `In your park, there are currently ${map.getAllEntities('guest').length + map.getAllEntities('staff').length} peeps`
  );
  console.log(`${map.getAllEntities('staff').length} of them is your staff.`);

  console.log('Your staff consists of:');
  console.log(`- ${getHandymen().length} handymen`);
  console.log(`- ${getMechanics().length} mechanics`);
  console.log(`- ${getSecurity().length} security`);
  console.log(`- ${getEntertainers().length} entertainers`);
};

export default main;
