const Announcement = require('../model/AnnouncementModel');


// create announcement
const createAnnouncement = async (req, res) => {
    try {
        const { title, message, author } = req.body;
        const announcement = await Announcement.create({ title, message, author });
        res.status(200).json({ message: "Announcement Created Successfully", announcement })
    }
    catch (error) {
        res.status(500).json({ error: "Something went Wrong" })
    }
}


const getAnnouncement = async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        if (announcements.length === 0) {
            return res.status(404).json({ message: "No Announcement Available" })
        }
        return res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ error: "Something went Wrong" })
    }
}

const deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const announcement = await Announcement.findByIdAndDelete(id);
        if (!announcement) {
            res.status(404).json({ message: 'Incorrect Announcement ID' })
        }
        res.status(200).json({ message: 'Announcement Deleted Successfully' });
    }
    catch (error) {
        res.status(500).json({ error: "Something went Wrong" })
    }
}


module.exports = {
    createAnnouncement,
    getAnnouncement,
    deleteAnnouncement
}