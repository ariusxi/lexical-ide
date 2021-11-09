export default function FakeAutomata(args) {
  const { 
    statusTable,
    finalStatus,
    transitions,
    string,
  } = args;

  let status = 1;
  for (let char of string) {
    let inputStatus = 0;
    for (let i = 0; i < transitions.length; i++) {
      if (transitions[i].indexOf(char) !== -1) {
        inputStatus = i + 1;
        break;
      } else if (i === transitions.length - 1 && transitions[i] === '_others') {
        inputStatus = i + 1;
        break;
      }
    }
    status = statusTable[status][inputStatus];
  }

  return finalStatus.indexOf(status) !== -1;
}