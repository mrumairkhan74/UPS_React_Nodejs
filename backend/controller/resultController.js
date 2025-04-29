const User = require("../model/Model"); // Adjust path to User model as needed
const Result = require("../model/ResultModel"); // Adjust path to Result model as needed


const createResult = async (req, res) => {
    try {
        const { username, obtainmarks, totalmarks, name } = req.body;

        // Validate if the obtainmarks are less than or equal to totalmarks
        if (parseInt(obtainmarks) > parseInt(totalmarks)) {
            return res.status(400).json({ error: "Obtain marks cannot be greater than total marks." });
        }

        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User with this username not found." });
        }

        // Optional: Ensure the provided name matches the name in the database
        if (user.name !== name) {
            return res.status(400).json({ error: "Provided name does not match the registered name for this username." });
        }

        // Proceed to create the result
        const result = await Result.create(req.body);

        res.status(201).json(result); // Return the created result
    } catch (err) {
        console.error("Create result error:", err);
        res.status(500).json({ error: "Something went wrong on the server." });
    }
};


// for Find All result
const allResult = async (req, res) => {
    try {
        const results = await Result.find();
        if (results.length === 0) return res.status(404).json({ message: "No Result Available" })
        res.status(200).json(results);
    }
    catch {
        res.status(500).json({ err: "Something Went Wrong" })
    }
}

const resultByUsername = async(req,res)=>{
    try{ 
        const user = await User.findOne({username:req.params.username})
        if(!user){
           return res.status(404).json({error:"Student Not Found"})
        }
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({error:"Something went wrong with Internal Server"})
        if (!res.headersSent) {
            return res.status(500).json({ message: "Something went wrong on the server" });
          }
    }
}

// for single student Result to show 
const resultById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Result.find(id);
        if (!result) return res.status(404).json({ message: "Result Not available" })
        res.status(200).json(result);
    }
    catch {
        res.status(500).json({ message: "Something Went Wrong" })
        if (!res.headersSent) {
            return res.status(500).json({ message: "Something went wrong on the server" });
          }
    }
}

// for Delete a single Student Result
const deleteResultById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Result.findByIdAndDelete(id);
        if (!result) return res.status(404).json({ message: "This student Doesn't Registered" });
        res.status(200).json({ message: 'Student Result Successfully Deleted' })
    }
    catch {
        res.status(500).json({ message: 'Something went Wrong' });
    }
}


// For Update Student result
const updateResult = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Result.findByIdAndUpdate(id);
        if (!result) return res.status(500).json({ message: "something went Wrong" })
        res.status(200).json({ message: "Result Updated", result })
    }
    catch {
        res.status(500).json({ message: "Something Went Wrong" })
    }
}

module.exports = {
    createResult,
    allResult,
    updateResult,
    deleteResultById,
    resultById,
    resultByUsername
}