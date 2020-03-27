const altImage = require('../assets/images/notfound.png');

export const ALT_IMAGE = altImage;

export const BREEDS = {
  CHIHUAHUA: 'chihuahua',
  HUSKY: 'husky',
  PUG: 'pug',
  LABRADOR: 'labrador'
};

export const BREEDS_LIST = Object.keys(BREEDS).map(breed => ({
  label: BREEDS[breed],
  value: BREEDS[breed]
}));


export const GOBACK_ICON_NAME = "arrow-back";
export const LOGOUT_ICON_NAME = "exit-run";



