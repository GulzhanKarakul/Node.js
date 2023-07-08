import CaptchaGenerator from 'captcha-generator-alphanumeric';
import path from 'path';
import fs from 'fs';

export class CaptchaService {
    constructor() {
        this.captchas = {};
    }

    createCaptcha = async (sid) => {
        const captcha = new CaptchaGenerator.default();
        
        const captchaId = Object.keys(this.captchas).length;
        const captchaUrl = `captcha/${captchaId}.png`;
        const captchaFile = path.join(process.cwd(), 'public', 'captcha', `${captchaId}.png`);

        const captchaObject = { value: captcha.value, file: captchaFile, url: captchaUrl };
        this.captchas[sid] = captchaObject;
        let captchaOut = fs.createWriteStream(captchaFile);
        captcha.PNGStream.pipe(captchaOut); 
        captchaOut.on('finish', () => {
            console.log('finish ');
            console.log(captchaObject);
        });
        return await captchaObject;
    }

    addCaptcha(req, res, sid, data) {
        const captchaObj = this.captchas[sid];
        if (data) {
            const html = data.replace('%src%', captchaObj.url);
            res.status(200).send(html);
        } else {
            res.status(404).send("<h2>Page not found :(</h2>");
        }
    }
      
    remove(captchaFile) {
        // Метод для проверки есть ли такой файл        
        if (fs.existsSync(captchaFile)) {
            // метод unlink для удаления файла
            fs.unlinkSync(captchaFile);
            return true;
        }
        return false;
    }
}
