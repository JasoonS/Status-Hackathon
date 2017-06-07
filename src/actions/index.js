
export const actions = {
  CUSTOM_ACTION: 'CUSTOM_ACTION',
  SET_SCREEN: 'SET_SCREEN'
};

export function customAction() {
  return { type: actions.CUSTOM_ACTION };
}

export const setScreen = windowNum => {
  console.log("set Screeennn!!!", windowNum)
  return ({
  type: actions.SET_SCREEN,
  windowNum
})}
