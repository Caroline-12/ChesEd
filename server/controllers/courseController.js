import prisma from "../prisma.js";

// Create Course
export const createCourse = async (req, res) => {
  const {
    courseID,
    title,
    category,
    description,
    content,
    tutorId,
    adminId,
    price,
  } = req.body;

  try {
    const newCourse = await prisma.course.create({
      data: {
        courseID,
        title,
        category,
        description,
        content,
        tutorId,
        adminId,
        price,
      },
    });

    res.status(201).json({ message: "Course created successfully", newCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get All Courses
export const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Course by ID
export const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
    });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Course
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const {
    courseID,
    title,
    category,
    description,
    content,
    tutorId,
    adminId,
    price,
  } = req.body;

  try {
    const updatedCourse = await prisma.course.update({
      where: { id: parseInt(id) },
      data: {
        courseID,
        title,
        category,
        description,
        content,
        tutorId,
        adminId,
        price,
      },
    });

    res
      .status(200)
      .json({ message: "Course updated successfully", updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Course
export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.course.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
