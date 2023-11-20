exports.invalidEndpoint =  (req, res, next) => {
  res.status(404).send({ msg: "Invalid endpoint" })
}; // do i need this error yet?

exports.handleCustomErrors = (err, req, res, next) => {
  console.log('custom err>>>>>>', err)
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg })
  }
  else next(err);
};
  
exports.handlePsqlErrors = (err, req, res, next) => {
  console.log('PSQL err>>>>>>', err)
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'Bad request' });
  }
};
  
exports.handleServerErrors = (err, req, res, next) => {
  console.log('server err>>>>>>', err);
  res.status(500).send({ msg: 'Internal Server Error' });
};