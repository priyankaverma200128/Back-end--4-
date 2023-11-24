const router = require('express').Router()

const userController = require("../apis/user/userController")
const courseController = require("../apis/course/courseController")
const branchController = require('../apis/branch/branchController')
const materialtypeController = require("../apis/materialtype/materialtypeController")
const materialController = require("../apis/material/materialController")
const quizController = require("../apis/quiz/quizController")
const quizquestionController = require("../apis/quizquestion/quizquestionController")
const playedquizController = require("../apis/playedquiz/playedquizController")
const customerController = require('../apis/customer/customerController')




// login 

router .post('/login',userController.login)

// course routes
router.post('/course/all',courseController.getAll)
router.post('/course/single',courseController.getSingle)

// branch routes
router.post('/branch/all',branchController.getAll)
router.post('/branch/single',branchController.getSingle)

// materialtype routes
router.post('/materialtype/all',materialtypeController.all)
router.post('/materialtype/single',materialtypeController.single)


// Customer Routes
router.post('/customer/add',customerController.addCustomer)

//quiz routes
router.post('/quiz/all',quizController.all)

router.use(require('../middleware/tokenChecker'))

// material routes
router.post('/material/add',materialController.add)
router.post('/material/all',materialController.all)
router.post('/material/single',materialController.single)
router.post('/material/update',materialController.update)

// quiz routes

router.post('/quiz/single',quizController.single)

// quizquestion routes
router.post('/quizquestion/all',quizquestionController.all)
router.post('/quizquestion/single',quizquestionController.single )

// playedquiz routes
router.post('/playedquiz/add',playedquizController.add)
router.post('/playedquiz/all',playedquizController.all)
router.post('./playedquiz/single',playedquizController.single)


router.all("*", (req, res)=>{
    res.send({
        success:false,
        status:404,
        message:"Invalid Address"
    })
})
module.exports = router