const router = require("express").Router();
const { User, validate } = require("../models/userData");
const bodyParser = require("body-parser");



//const app = express();
router.use(bodyParser.json());


//get all user data by admin
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to get users." });
    }
});

//search user by admin
router.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to get user." });
    }
});


//update user profile by user(farmer,buyer,delivery,expert)
router.put("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to update user." });
    }
});

//delete user by admin
router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user." });
    }
});


//Data get and calculation api
router.get("/user/stats", async (req, res) => {
    try {
        const roles = ["patient", "doctor", "staff", "admin"];
        let stats = {};
        let totalUserCount = 0;
        let totalUserSum = 0;

        for (let role of roles) {
            const users = await User.find({ role });
            const count = users.length;
            totalUserCount += count;

            // Calculate the sum of users for each role
            let userSum = 0;
            users.forEach((user) => {
               
                userSum ++; 
            });

            // Calculate the average for each role
            const average = count > 0 ? userSum / count : 0;
            
            stats[role] = { count, average };
            totalUserSum += userSum;
        }

        // Calculate the total average
        const totalAverage = totalUserCount > 0 ? totalUserSum / totalUserCount : 0;

        stats["total"] = { count: totalUserCount, average: totalAverage };

        res.status(200).json(stats);
    } catch (error) {
        console.error("Failed to get user stats:", error);
        res.status(500).json({ message: "Failed to get user stats." });
    }
});


  
module.exports = router;