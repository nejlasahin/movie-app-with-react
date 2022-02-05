import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import loginReducer from './login';
import userReducer from './user';
import favoritesReducer from './favorites';
import seenlistReducer from './seenlist';
import themeReducer from './theme';

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  seenlist: seenlistReducer,
  favorites: favoritesReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login', 'user', 'seenlist', 'favorites', 'theme'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(logger));

export const persistor = persistStore(store);
export default store;
