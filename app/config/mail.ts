interface IMailConfig {
    driver: 'ethereal';

    defaults: {
        from: {
            email: string;
            name: string;
        };
    }
}

export default {
    driver: process.env.MAIL_DRIVER,

    defaults: {
        from: {
            email: 'adller.eel.ufsc@gmail.com',
            name: 'Adller'
        }
    }
} as IMailConfig;