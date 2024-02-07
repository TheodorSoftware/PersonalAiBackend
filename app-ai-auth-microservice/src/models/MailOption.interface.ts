export interface MailOption {
    from: string | undefined;
    to: string;
    subject: string;
    text?: string;
    html?: string | undefined;
};