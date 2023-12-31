exports.invalidEndpoint =  (req, res, next) => {
  res.status(404).send({ msg: "Invalid endpoint" })
};

exports.handleCustomErrors = (err, req, res, next) => {
  console.log("Custom Err >>>", err)
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg })
  }
  else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  console.log("22P02 err>>>", err)
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'Bad request' });
  } else if (err.status === 404 && err.msg === 'Article not found') {
    res.status(404).send({ msg: 'Article not found' });
  } else if (err.code === '23503') {
    res.status(404).send({ msg: 'Not found' });
  } else {
    next(err);
  } 
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log("500 err>>>", err)

  res.status(500).send({ msg: 'Internal Server Error' });
};