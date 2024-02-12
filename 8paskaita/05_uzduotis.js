console.log('1----------------');
for (let i = 1; i <= 4; i++) {
        let line = '';
        for (let j = 0; j < i; j++) {
          line += '1';
        }
        console.log(line);
}

console.log('2----------------');
for (let i = 1; i <= 4; i++) {
        let line = '';
        for (let j = 0; j < i; j++) {
          line += i;
        }
        console.log(line);
}

console.log('3----------------');
for (let i = 1; i <= 4; i++) {
  let spaces = '';
  for (let j = 1; j <= 4 - i; j++) {
    spaces += ' ';
  }

  let line = '';
  for (let k = 1; k <= 2 * i - 1; k++) {
    line += '1';
  }

  console.log(spaces + line);
}

console.log('4----------------');
for (let i = 1; i <= 4; i++) {
  let line = '';
  for (let j = 1; j <= i; j++) {
    line += j;
  }
  console.log(line);
}