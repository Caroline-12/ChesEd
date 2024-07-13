import prisma from "../prisma.js";

// Create Tutor
export const createTutor = async (req, res) => {
  const { userId, bio, expertise } = req.body;

  try {
    const newTutor = await prisma.tutor.create({
      data: {
        userId,
        bio,
        expertise,
      },
    });

    res.status(201).json({ message: "Tutor created successfully", newTutor });
  } catch (error) {
    console.error("Error creating tutor:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get All Tutors
export const getTutors = async (req, res) => {
  try {
    const tutors = await prisma.tutor.findMany();
    res.status(200).json(tutors);
  } catch (error) {
    console.error("Error fetching tutors:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Tutor by ID
export const getTutorById = async (req, res) => {
  const { id } = req.params;

  try {
    const tutor = await prisma.tutor.findUnique({
      where: { id: parseInt(id) },
    });
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }
    res.status(200).json(tutor);
  } catch (error) {
    console.error("Error fetching tutor:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Tutor
export const updateTutor = async (req, res) => {
  const { id } = req.params;
  const { bio, expertise } = req.body;

  try {
    const updatedTutor = await prisma.tutor.update({
      where: { id: parseInt(id) },
      data: { bio, expertise },
    });

    res
      .status(200)
      .json({ message: "Tutor updated successfully", updatedTutor });
  } catch (error) {
    console.error("Error updating tutor:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Tutor
export const deleteTutor = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.tutor.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Tutor deleted successfully" });
  } catch (error) {
    console.error("Error deleting tutor:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
