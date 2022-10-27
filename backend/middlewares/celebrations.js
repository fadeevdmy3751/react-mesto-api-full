const { celebrate, Joi } = require('celebrate');

const validateUserID = celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
});

const validateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri({ domain: { minDomainSegments: 2 } }),
  }),
});

const validateNewUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri({ domain: { minDomainSegments: 2 } }),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCredentials = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri({ domain: { minDomainSegments: 2 } }),
  }),
});

const validateCardID = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
});

module.exports = {
  validateUserID,
  validateProfile,
  validateAvatar,
  validateCard,
  validateCardID,
  validateNewUser,
  validateCredentials,
};
