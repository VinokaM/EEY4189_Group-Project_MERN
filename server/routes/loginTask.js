const router = require("express").Router();
const { User } = require("../models/userData");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
	  const { error } = validate(req.body);
	  if (error)
		return res.status(400).send({ message: error.details[0].message });
  
	
	  const user = await User.findOne({ email: req.body.email }).select("+password +role");

	  if (!user)
		return res.status(401).send({ message: "Invalid Email or Password" });
  
	  const validPassword = await bcrypt.compare(
		req.body.password,
		user.password
	  );
	  if (!validPassword)
		return res.status(401).send({ message: "Invalid Email or Password" });
  
	  const token = user.generateAuthToken();
	  res.status(200).send({ token, role: user.role, name: user.firstName,_id: user._id, email: user.email, message: "Logged in successfully" });
	} catch (error) {
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;