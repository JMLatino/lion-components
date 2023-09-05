export default {
  error: {
    IsIBAN: 'Введите действительное значение поля {fieldName}.',
    IsCountryIBAN:
      'Введите действительное значение поля {params, select,\n' +
      'AT {Австрийский}\n' +
      'BE {Бельгийский}\n' +
      'CZ {Чешский}\n' +
      'DE {Немецкий}\n' +
      'ES {Испанский}\n' +
      'FR {Французский}\n' +
      'HU {Венгерский}\n' +
      'IT {Итальянский}\n' +
      'NL {Нидерландский}\n' +
      'PL {Польский}\n' +
      'RO {Румынский}\n' +
      'other {{params}}\n' +
      '} {fieldName}.',
    IsNotCountryIBAN:
      '{userSuppliedCountryCode, select,\n' +
      'AT {Австрийский}\n' +
      'BE {Бельгийский}\n' +
      'CZ {Чешский}\n' +
      'DE {Немецкий}\n' +
      'ES {Испанский}\n' +
      'FR {Французский}\n' +
      'HU {Венгерский}\n' +
      'IT {Итальянский}\n' +
      'NL {Нидерландский}\n' +
      'PL {Польский}\n' +
      'RO {Румынский}\n' +
      'other {{userSuppliedCountryCode}}\n' +
      '} {fieldName} не допускается.',
  },
};
