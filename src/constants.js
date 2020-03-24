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

export const IMAGES_PER_PAGE = 10;

