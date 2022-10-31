// eslint-disable-next-line
const patternEmail = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
const patternPhone = /^[\\+]{0,1}380([0-9]{9})$/i;

const isValidLength = (str: string, min: number, max: number):boolean => (
  str.length >= min && str.length <= max
)

export const isValidName = (name: string):boolean => isValidLength(name, 2, 60);

export const isValidPhone = (phone: string):boolean => patternPhone.test(phone);

export const isValidEmail = (email: string):boolean => (
  isValidLength(email, 2, 100) && patternEmail.test(email)
)
