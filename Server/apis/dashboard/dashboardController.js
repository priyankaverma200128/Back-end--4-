const User = require('../user/userModel')
const Course = require('../course/courseModel')
const Branch = require('../branch/branchModel')
const Material = require('../material/materialModel')
const Materialtype = require('../materialtype/materialtypeModel')
const Quiz = require('../quiz/quizModel')
const Quizquestion = require('../quizquestion/quizquestionModel')
const Playedquiz = require('../playedquiz/playedquizModel')


exports.dashboard = async (req, res) => {
    let totalUser = await User.find({ userType: 2 })
    let totalCourse = await Course.countDocuments()
    let totalBranches = await Branch.countDocuments()
    let totalMaterials = await Material.countDocuments()
    let totalMaterialtypes= await Materialtype.countDocuments()
    let totalQuiz = await Quiz.countDocuments()
    let totalQuizquestion = await Quizquestion.countDocuments()
    let totalPlayedquiz = await Playedquiz.countDocuments()
    res.send({ success: true, status: 200, 
        totalUser: totalUser.length, 
        totalCourse: totalCourse, 
        totalBranches: totalBranches, 
        totalMaterials: totalMaterials, 
        totalMaterialtypes: totalMaterialtypes, 
        totalQuiz: totalQuiz,
        totalQuizquestion: totalQuizquestion,
        totalPlayedquiz: totalPlayedquiz })
}
