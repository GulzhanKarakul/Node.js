import Captcha from 'captcha-generator-alphanumeric';
import path from 'path';
export class CaptchaService {
    create(filename) {
        let captcha = new Captcha.default(); // Создание экземпляра CAPTCHA
        let captchaFile = path.join(process.cwd(), 'public', `${filename}`); // Путь к файлу CAPTCHA
        captcha.PNGStream.pipe(captchaOut); // Перенаправление потока CAPTCHA в файл
        let captchaOut = fs.createWriteStream(captchaFile);
        captchaOut.on('finish', () => {

        });
        return captcha.value;
    }
    
    remove(filename) {
        let captchaFile = path.join(process.cwd(), 'public', ${filename}); // Путь к файлу CAPTCHA
        fs.rm(captchaFile);
    }
}