const Course = require('../model/CourseModel');
const mongoose = require('mongoose')

const createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(200).json({ message: 'Course Created Successfully' })
    }
    catch {
        res.status(500).json({ error: "Something Thing went Wrong" })
    }
};
const allCourse = async (req, res) => {
    try {
        const course = await Course.find();
        if (course.length === 0) {
            return res.status(404).json({ Message: "Course not Available" })
        }
        res.status(200).json({ message: "Here Are All Courses", course })
    }
    catch (err) {
        res.status(500).json({ error: "Something went Wrong" })
    }
}

const courseById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid course ID" });
        }

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json(course);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};



const deleteCourseById = async (req, res) => {
    try {
        let { id } = req.params;
        const course = await Course.findByIdAndDelete({ id });
        if (!course) {
            res.status(404).json({ message: "Course Doesn't Available" })
        }
        res.status(200).json({ message: "Course Successfully Deleted" })
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}
const updateCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ message: "Course successfully updated", course: updatedCourse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }

}


const applyCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { studentID } = req.body;

        if (!studentID) {
            return res.status(400).json({ error: "Student ID is required" });
        }

        // Verify JWT token and get student info
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "Not authorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const student = await StudentModel.findById(decoded._id); // Assuming you use _id in the token

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        // Now that the student is verified, you can save their application
        const course = await CourseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Assuming you're adding the student to an 'applications' array in the course
        course.applications.push(student._id);
        await course.save();

        res.status(200).json({ message: "Successfully applied for the course" });
    } catch (err) {
        console.error("Error applying for course:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
};




const acceptApplication = async (req, res) => {
    try {
        // PATCH /api/courses/:courseId/applications/:studentId
        const { courseId, studentId } = req.params;
        const { status } = req.body;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).send('Course not found');

        const application = course.applications.find(app =>
            app.student.toString() === studentId
        );
        if (!application) return res.status(404).send('Application not found');

        application.status = status;
        await course.save();
        res.send('Status updated');

    }
    catch {
        res.status(500).json({ Error: "Something Went Wrong" })
    }
}
module.exports = {
    createCourse,
    allCourse,
    deleteCourseById,
    updateCourseById,
    courseById, applyCourse, acceptApplication

}