const getCustomConfig = require('~/server/services/Config/getCustomConfig');

async function isUserNameAllowed(email) {
  if (!email) {
    return false;
  }

  const userName = email.split('@')[0];

  if (!userName) {
    return false;
  }

  const customConfig = await getCustomConfig();
  if (!customConfig) {
    return true;
  } else if (!customConfig?.registration?.allowedUserNames) {
    return true;
  }

  return customConfig.registration.allowedUserNames.includes(userName);
}

module.exports = isUserNameAllowed;
