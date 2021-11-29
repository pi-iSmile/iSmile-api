import * as nodemailer from 'nodemailer';
import { format } from 'date-fns';
import { Logger } from 'tslog';
import config from '../../shared/config/mail';
import { AppointmentEntity } from '../../entity/appointment/appointment.entity';

const hbs = require('nodemailer-express-handlebars');

const log: Logger = new Logger();

export default class MailSender {
  sendCreationMail(appointment: AppointmentEntity) {
    const mailOptions = {
      from: 'iSmile <ismilecontato@gmail.com>',
      to: appointment.patient.email,
      subject: 'Bem vindo ao iSmile!',
      template: 'confirm-appointment',
      context: {
        nome_paciente: appointment.patient.name,
        data_consulta: format(appointment.date, "dd/MM/yyyy 'às' hh:mm."),
        id_consulta: appointment.id,
      },
    };

    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: false,
      auth: {
        user: config.user,
        pass: config.password,
      },
      tls: { rejectUnauthorized: false },
    });

    transporter.use('compile', hbs({
      viewEngine: 'express-handlebars',
      defaultLayout: false,
      viewPath: 'assets/email/',
    }));

    transporter.sendMail(mailOptions, (error, _) => {
      if (error) {
        log.error(error);
      } else {
        log.info('Email enviado com sucesso!');
      }
    });
  }
}
