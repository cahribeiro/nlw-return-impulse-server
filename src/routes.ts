import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailerMailAdapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { SubmitFeedbackService } from './services/submitFeedbackService';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  try {

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitFeedbackService = new SubmitFeedbackService(
      prismaFeedbacksRepository,
      nodemailerMailAdapter
    );

    await submitFeedbackService.execute({
      type,
      comment,
      screenshot,
    });

    return res.status(201).send();

  } catch (error) {
    console.log(error);

    return res.status(500).send();

  }
});