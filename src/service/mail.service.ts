import { TemplateParser } from './template.service';
import type { SendEmailCommandOutput, SendEmailCommandInput } from '@aws-sdk/client-ses';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { AWS_ACCESS_KEY_ID, ENVIRONMENT, FROM_EMAIL, AWS_REGION, AWS_SECRET_ACCESS_KEY } from '../config';
import type { SendEmailParams } from '../models/email/model';

export class EmailService {
    private sesClient: SESClient;

    constructor() {
        if (process.env.NODE_ENV === 'development') {
            throw new Error('Cannot Send Email from Local Server');
        }

        this.sesClient = new SESClient({
            region: AWS_REGION,
            credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY
            }
        });
    }

    public async sendEmail(params: SendEmailParams): Promise<SendEmailCommandOutput> {
        const { from, to, cc, bcc, content } = params;

        const input: SendEmailCommandInput = {
            Source: `${from.name ? `${from.name} <${from.email}>` : from.email}`,
            Destination: {
                ToAddresses: to.map((recipient) => `${recipient.name ? `${recipient.name} <${recipient.email}>` : recipient.email}`),
                CcAddresses: cc?.map((recipient) => `${recipient.name ? `${recipient.name} <${recipient.email}>` : recipient.email}`),
                BccAddresses: bcc?.map((recipient) => `${recipient.name ? `${recipient.name} <${recipient.email}>` : recipient.email}`)
            },
            Message: {
                Subject: { Data: content.subject },
                Body: {
                    Html: { Data: content.body }
                }
            }
        };

        const command = new SendEmailCommand(input);
        return this.sesClient.send(command);
    }
}

export const sendResetEmail = async (email: string, token: string, name: string, userId: string | unknown): Promise<void> => {
    const emailService = new EmailService();
    const resetLink = `${ENVIRONMENT}/reset-password?token=${token}&user=${userId}`;

    const templateParser = new TemplateParser();
    const htmlBody = templateParser.compileEJS('reset-password', { name, resetLink });

    const sendEmailParams: SendEmailParams = {
        from: {
            name: 'Arena Prospect',
            email: FROM_EMAIL
        },
        to: [{ email }],
        content: {
            subject: 'Password Reset Request',
            body: htmlBody
        }
    };

    await emailService.sendEmail(sendEmailParams);
}
