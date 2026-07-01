export const getStrength = (pass) => {
  let strength = 0;
  if (pass.length >= 6) strength++;
  if (pass.match(/[A-Z]/) && pass.match(/[a-z]/)) strength++;
  if (pass.match(/[\d]/)) strength++;
  if (pass.match(/[^A-Za-z\d]/)) strength++;
  return strength;
};
