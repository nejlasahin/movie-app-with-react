const DARK = "DARK";
const LIGHT = "LIGHT";

const dark = (isDark = true) => ({
  type: DARK,
  payload: isDark,
});

const light = (isDark = false) => ({
  type: LIGHT,
  payload: isDark,
});

const themeReducer = (isDark = false, action) => {
  switch (action.type) {
    case DARK:
      return action.payload;
    case LIGHT:
      return action.payload;
    default:
      return isDark;
  }
};

export default themeReducer;
export { dark, light };