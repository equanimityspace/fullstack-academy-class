// An instructor can only access their own students' data.
const router = require("express").Router();
const db = require("../db");

const { prisma } = require("../common");

// deny access if not logged in with prisma
router.use(async (req, res, next) => {
  try {
    const response = await prisma.user.findUnique({
      where: {
        username: req.user,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

// Get all students
// router.get("/", async (req, res, next) => {
//   try {
//     const { rows: students } = await db.query(
//       "SELECT * FROM student WHERE instructorId = $1",
//       [req.user.id]
//     );
//     res.send(students);
//   } catch (error) {
//     next(error);
//   }
// });

// get all students with prisma
router.get("/", async (req, res, next) => {
  try {
    const response = await prisma.students.findMany({
      where: {
        id: req.user.id,
        name: req.students.name,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

// Get a student by id
// router.get("/:id", async (req, res, next) => {
//   try {
//     const {
//       rows: [student],
//     } = await db.query(
//       "SELECT * FROM student WHERE id = $1 AND instructorId = $2",
//       [req.params.id, req.user.id]
//     );

//     if (!student) {
//       return res.status(404).send("Student not found.");
//     }

//     res.send(student);
//   } catch (error) {
//     next(error);
//   }
// });

// get student by id with prisma
router.get("/:id", async (req, res, next) => {
  try {
    const response = await prisma.user.findUnique({
      where: {
        instructorId: req.user.id,
        studentId: req.params,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

// Create a new student
// router.post("/", async (req, res, next) => {
//   try {
//     const {
//       rows: [student],
//     } = await db.query(
//       "INSERT INTO student (name, cohort, instructorId) VALUES ($1, $2, $3) RETURNING *",
//       [req.body.name, req.body.cohort, req.user.id]
//     );
//     res.status(201).send(student);
//   } catch (error) {
//     next(error);
//   }
// });

// create new student with prisma
router.post("/", async (req, res, next) => {
  try {
    const response = await prisma.student.create({
      data: {
        name: req.body.name,
        courseId: req.body.courseId,
        courseName: req.body.courseName,
        cohort: req.body.cohort,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

// Update a student
// router.put("/:id", async (req, res, next) => {
//   try {
//     const {
//       rows: [student],
//     } = await db.query(
//       "UPDATE student SET name = $1, cohort = $2 WHERE id = $3 AND instructorId = $4 RETURNING *",
//       [req.body.name, req.body.cohort, req.params.id, req.user.id]
//     );

//     if (!student) {
//       return res.status(404).send("Student not found.");
//     }

//     res.send(student);
//   } catch (error) {
//     next(error);
//   }
// });

// update student with prisma
router.put("/:id", async (req, res, next) => {
  try {
    const response = await prisma.student.update({
      where: {
        id: req.params,
      },
      data: {
        name: req.body.name,
        courseId: req.body.courseId,
        courseName: req.body.courseName,
        cohort: req.body.cohort,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

// Delete a student by id
// router.delete("/:id", async (req, res, next) => {
//   try {
//     const {
//       rows: [student],
//     } = await db.query(
//       "DELETE FROM student WHERE id = $1 AND instructorId = $2 RETURNING *",
//       [req.params.id, req.user.id]
//     );

//     if (!student) {
//       return res.status(404).send("Student not found.");
//     }

//     res.send(student);
//   } catch (error) {
//     next(error);
//   }
// });

// delete user by id with prisma
router.delete("/:id", async (req, res, next) => {
  try {
    const resonse = await prisma.student.delete({
      where: {
        id: req.params,
      },
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
