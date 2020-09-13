function formatNumber(number) {
  if (number < 1000) return `${number}`;

  const digits = number.toString().split('').reverse();

  let formattedString = '';

  digits.forEach((digit, index) => {
    let newDigit = digit;

    if (index !== 0 && index % 3 === 0) {
      newDigit = `,${digit}`;
    }

    formattedString += newDigit;
  });

  return formattedString.split('').reverse().join('');
}

export default {
  formatNumber,
};
