class Configs {
    public host = 'smtp.gmail.com';

    public port = 587;

    public user = process.env.EMAIL_USER;

    public password = process.env.EMAIL_PASSWORD;
}

export default new Configs();
