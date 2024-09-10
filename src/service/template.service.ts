import ejs from 'ejs';
import fs from 'fs';
import { type EmailData } from '../models/email/model';

export class TemplateParser {

    compileEJS = (fileName: string, data: EmailData) => {
        const plainHTML = fs.readFileSync(`./src/utils/helpers/templates/${fileName}.ejs`, 'utf8');
        const template = ejs.compile(plainHTML)
        const htmlWithData = template(data);
        return htmlWithData;
    }
}
