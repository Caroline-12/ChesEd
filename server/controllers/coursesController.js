const Course = require("../model/Courses");

const getAllCourses = async (req, res) => {
  const courses = await Course.find().populate("tutor admin reviews.user");
  if (!courses) return res.status(204).json({ message: "No courses found." });
  res.json(courses);
};

const createNewCourse = async (req, res) => {
  const {
    title,
    description,
    content,
    tutor,
    admin,
    category,
    duration,
    level,
    price,
  } = req.body;

  if (
    !title ||
    !description ||
    !content ||
    !tutor ||
    !admin ||
    !category ||
    !duration ||
    !level ||
    !price
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const result = await Course.create({
      title,
      description,
      content,
      tutor,
      admin,
      category,
      duration,
      level,
      price,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create course" });
  }
};

const updateCourse = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const course = await Course.findOne({ _id: req.body.id }).exec();
  if (!course) {
    return res
      .status(204)
      .json({ message: `No course matches ID ${req.body.id}.` });
  }

  const {
    title,
    description,
    content,
    tutor,
    admin,
    category,
    duration,
    level,
    price,
    isPublished,
  } = req.body;

  if (title) course.title = title;
  if (description) course.description = description;
  if (content) course.content = content;
  if (tutor) course.tutor = tutor;
  if (admin) course.admin = admin;
  if (category) course.category = category;
  if (duration) course.duration = duration;
  if (level) course.level = level;
  if (price) course.price = price;
  if (typeof isPublished !== "undefined") course.isPublished = isPublished;

  try {
    const result = await course.save();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update course" });
  }
};

const deleteCourse = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Course ID required." });

  const course = await Course.findOne({ _id: req.body.id }).exec();
  if (!course) {
    return res
      .status(204)
      .json({ message: `No course matches ID ${req.body.id}.` });
  }
  try {
    const result = await course.deleteOne();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete course" });
  }
};

const getCourse = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Course ID required." });

  const course = await Course.findOne({ _id: req.params.id })
    .populate("tutor admin reviews.user")
    .exec();
  if (!course) {
    return res
      .status(204)
      .json({ message: `No course matches ID ${req.params.id}.` });
  }
  res.json(course);
};

module.exports = {
  getAllCourses,
  createNewCourse,
  updateCourse,
  deleteCourse,
  getCourse,
};
