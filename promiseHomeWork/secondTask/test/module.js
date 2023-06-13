export function prompt(message, defaultValue) {
    return new Promise((resolve, reject) => {
        process.stdout.write(`${message}\n`);
        let input = '';
  
        process.stdin.on('data', (data) => {
            input += data.toString();
            process.stdin.pause();
  
            let result;
            if(typeof defaultValue === 'number') {
                result = Number(input.trim());
                if(Number.isNaN(result)) {
                   result = defaultValue;
                }
            } else if(typeof defaultValue === 'float') {
                result = Number(input.trim());
                if(Number.isNaN(result)) {
                    result = defaultValue;
                }
            } else if(typeof defaultValue === 'boolean') {
                result = input.trim().toLowerCase() === 'true';
                if (input.trim() !== 'true' && input.trim() !== 'false') {
                    result = defaultValue;
                }
            } else if (Array.isArray(defaultValue)) {
                result = input.trim();
                //Я НЕ ЗНАЮ ПОЧЕМУ НЕ УБИРАЮТСЯ СКОБКИ, КОГДА Я С join(', '); ДЕЛАЮ В СТРОКУ(((
                // result = result.join(', ');
                if (result.length === 1 && result[0] === '') {
                    result = defaultValue;
                }
            } else {
                result = input.trim() || defaultValue;
            }
  
            resolve(result);
        });
  
        process.stdin.on('error', (err) => {
            reject(err);
        });
    });
}
  