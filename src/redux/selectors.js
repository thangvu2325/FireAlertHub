export const sidebarWidthSelector = (state) => state.persistedReducer.setting.sidebarWidth;
export const themeModeSelector = (state) => state.persistedReducer.setting.themeMode;
export const currentUserSelector = (state) => state.persistedReducer.auth.login.currentUser;
export const adminSelector = (state) => state.persistedReducer.auth.login.currentUser?._doc.roles[0].name;
export const errorMessageSelector = (state) => state.persistedReducer.auth.login.errorMessage;
export const nodesSelector = (state) => state.nodes.data;
export const warningSelector = (state) => state.modalbox.warning;
export const openStatusSelector = (state) => state.modalbox.openStatus;
