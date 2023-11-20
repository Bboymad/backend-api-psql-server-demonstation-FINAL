exports.invalidEndpoint =  (req, res, next) => {
  res.status(404).send({ msg: "Invalid endpoint" })
}