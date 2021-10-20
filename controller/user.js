const User = require("../model/user");

exports.createOne = async (req, res) => {
  const result = await User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    photo: `${req.file.filename}`,
  });
  await result
    .save()
    .then(() => {
      res.status(201).json({ message: "Successfully", data: result });
    })
    .catch((e) => {
      res.status(400).json({ message: "Failed", data: e });
    });
};

exports.getOne = async (req, res) => {
  const result = await User.findById(req.params.id);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "Successfully", data: result });
};

exports.getAll = async (req, res) => {
  const result = await User.find();
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "Successfully", data: result });
};

exports.updateOne = async (req, res) => {
  await User.findById({ _id: req.params.id }).exec((error, data) => {
    if (error) {
      throw error;
    } else {
      const filePath = path.join(__dirname, "../public/uploads/" + data.photo);
      fs.unlink(filePath, async (err) => {
        if (err) throw err;
      });
    }
  });
  const result = await User.findByIdAndUpdate(req.params.id);
  result.name = req.body.name;
  result.email = req.body.email;
  result.password = req.body.password;
  result.photo = `${req.file.filename}`;

  result
    .save()
    .then(() => {
      res.status(200).json({ message: "Successfully", data: result });
    })
    .catch((error) => {
      res.status(400).json({ message: "Badly", data: error });
    });
};

exports.deleteOne = async (req, res, next) => {
  await User.findById({ _id: req.params.id }).exec(async (error, data) => {
    if (error) {
      res.send(error);
    } else {
      const filePath = path.join(__dirname, "../public/uploads/" + data.photo);
      fs.unlink(filePath, async (err) => {
        if (err) throw err;
        await User.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ message: "Successfully", data: [] });
      });
    }
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).json({ message: "Failed" });
  }
  const users = await User.findOne({ email: email }).select("password");
  if (!users) {
    res.status(401).json({ message: "Failed" });
  }
  const isMatch = await users.matchPassword(password);
  if (!isMatch) {
    res.status(401).json({ message: "Failed" });
  }
  const body = await User.findOne({ email: req.body.email });
  if (!isMatch && !users) {
    res.status(401).json({ message: "Failed" });
  } else {
    req.session.user = body;
    req.session.save();
    res.status(200).json({ message: "Successfully" });
  }
};

exports.getMe = async (req, res) => {
    const my = req.session.user._id;
    const user = await User.findById({ _id: my });
    res.status(201).json({ success: true, data: user });
}

exports.logout = async (req, res, next) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.status(200).json({ message: "Successfully - Log out" });
};
