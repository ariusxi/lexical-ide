import { KEYWORDS } from './keywords';
import FakeAutomata from './sb';

const isKeyword = (string) => KEYWORDS.indexOf(string) !== -1;

const isIdentifier = (string) => {
  let statusTable = [
    [0, 0, 0],
    [0, 2, 0],
    [0, 2, 2],
  ];
  let finalStatus = [2];
  let transitions = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_",
    "0123456789",
  ];

  return FakeAutomata({
    statusTable,
    finalStatus,
    transitions,
    string
  });
}

const isArithmeticOperator = (string) => {
  let statusTable = [
    [0, 0, 0, 0],
    [0, 2, 3, 4],
    [0, 5, 0, 0],
    [0, 0, 6, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  let finalStatus = [2, 3, 4, 5, 6];
  let transitions = [["+"], ["-"], ["*", "/", "%", "="]];

  return FakeAutomata({
    statusTable,
    finalStatus,
    transitions,
    string,
  });
}

const isLogicalOperator = (string) => {
  let statusTable = [
    [0, 0, 0],
    [0, 2, 3],
    [0, 0, 4],
    [0, 0, 4],
    [0, 0, 0],
  ];
  let finalStatus = [2, 4];
  let transitions = [["!", ">", "<"], ["="]];

  return FakeAutomata({
    statusTable,
    finalStatus,
    transitions,
    string,
  });
}

const isOperator = (string) => isArithmeticOperator(string) || isLogicalOperator(string);

const isUnsigned = (string) => {
  let statusTable = [
    [0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0],
    [0, 2, 3, 5, 0],
    [0, 4, 0, 0, 0],
    [0, 4, 0, 5, 0],
    [0, 7, 0, 0, 6],
    [0, 7, 0, 0, 0],
    [0, 7, 0, 0, 0],
  ];
  let finalStatus = [2, 4, 7];
  let transitions = ["0123456789", ".", "Ee", "+-"];

  return FakeAutomata({
    statusTable,
    finalStatus,
    transitions,
    string,
  });
}

const isInteger = (string) => {
  let statusTable = [
    [0, 0, 0, 0, 0, 0],
    [0, 3, 2, 0, 0, 0],
    [0, 2, 2, 0, 0, 0],
    [0, 0, 0, 4, 5, 0],
    [0, 0, 6, 0, 0, 6],
    [0, 5, 0, 0, 5, 0],
    [0, 6, 6, 0, 0, 6],
  ];
  let finalStatus = [2, 3, 5, 6];
  let transitions = ["0", "123456789", "x", "1234567", "abcdefABCDEF"];

  return FakeAutomata({
    statusTable,
    finalStatus,
    transitions,
    string,
  });
}

const isConstant = (string) => isUnsigned(string) || isInteger(string);

const isDelimiter = (string) => {
  if (string.length > 1) return false;
  let delimiters = ",{}[]();";
  return delimiters.indexOf(string) !== -1 ? true : false;
}

const isComment = (string) => {
  let statusTable = [
    [0, 0, 0, 0],
    [0, 2, 0, 0],
    [0, 0, 3, 0],
    [0, 0, 4, 3],
    [0, 5, 4, 3],
    [0, 0, 0, 0],
  ];
  let finalStatus = [5];
  let transitions = ["/", "*", "_others"];

  return FakeAutomata({
    statusTable,
    finalStatus,
    transitions,
    string,
  });
}

const analyzeWord = (word) => {
  if (word.length === 0) {
    return 'tk_empty';
  } else if (isKeyword(word)) {
    return `tk_${KEYWORDS[KEYWORDS.indexOf(word)]}`;
  } else if (isIdentifier(word)) {
    return 'tk_identifier';
  } else if (isOperator(word)) {
    return 'tk_operator';
  } else if (isDelimiter(word)) {
    return 'tk_delimiter';
  } else if (isConstant(word)) {
    return 'tk_constant';
  } else if (isComment(word)) {
    return 'tk_comment';
  } else {
    return 0;
  }
}

const analyzeString = (string) => {
  let content = string.replace(/[\r\n]/g, '');
  let result = [];

  while (content.length > 0) {
    let buffer = content.slice();
    let index = content.length - 1;

    for (; analyzeWord(buffer) === 0 && index > 0; index--) {
      buffer = buffer.substring(0, buffer.length - 1);
    }

    if (index === 0 && analyzeWord(buffer) === 0) {
      content = content.substring(1);
    } else {
      result.push({
        type: analyzeWord(buffer).toUpperCase(),
        content: buffer,
        key: result.length,
      });
      content = content.substring(index + 1);
    }
  }

  return result;
}

export default analyzeString;