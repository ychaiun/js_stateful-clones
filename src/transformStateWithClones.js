'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      newState = { ...newState, ...extraData };
    }

    if (type === 'removeProperties') {
      newState = removeProperties(newState, keysToRemove);
    }

    if (type === 'clear') {
      newState = {};
    }

    result.push(newState);
  }

  return result;
}

function removeProperties(obj, keysArr) {
  const newObj = { ...obj };

  for (const key of keysArr) {
    delete newObj[key];
  }

  return newObj;
}

module.exports = transformStateWithClones;
