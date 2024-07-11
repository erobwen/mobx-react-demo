
export function validatePassword(password) {
  const errors = [];

  if (password.length < 8) {
    errors.push("Passwords must be at least 8 characters long.");
  }

  if (!containsUppercase(password) || !containsLowercase(password)) {
    errors.push("Passwords must contain upper and lower case letters.");
  }

  if (!containsDigit(password)) {
    errors.push("Passwords must contain at least one digit.");
  }

  if (!containsSymbol(password)) {
    errors.push("Passwords must contain at least one special character.");
  }

  return errors; 
}

function containsUppercase(password) {
  return /[A-Z]/.test(password);
}

function containsLowercase(password) {
  return /[a-z]/.test(password);
}

function containsDigit(password) {
  return /[0-9]/.test(password);
}

function containsSymbol(password) {
  return  /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);
}

export function generatePassword() {
  while(true) {
    const candidate = tryGeneratePassword();
    const errors = validatePassword(candidate);
    if (errors.length === 0) {
      return candidate; 
    }
  }
}

function tryGeneratePassword() {
  let pass = '';
  let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz0123456789@#$';

  for (let i = 1; i <= 8; i++) {
      let char = Math.floor(Math.random()
          * str.length + 1);

      pass += str.charAt(char)
  }

  return pass;
}
