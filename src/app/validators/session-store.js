import { object, string } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      email: string()
        .required()
        .email(),
      password: string()
        .required()
        .min(8),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res.status(400).json({
      error: 'Validation fail!',
      messages: error.inner.map(err => err.message).join(', '),
    });
  }
};
