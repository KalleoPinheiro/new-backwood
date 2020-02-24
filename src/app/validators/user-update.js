import { object, ref, string } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      name: string(),
      email: string().email(),
      oldPassword: string().min(6),
      password: string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: string().when('password', (password, field) =>
        password ? field.required().oneOf([ref('password')]) : field
      ),
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
