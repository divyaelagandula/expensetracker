const {Sequelize}=require('sequelize')
const userModel = require('../models/users');
const expenses=require('../models/expenses') // Use a descriptive variable name

const checkingUserIsPremiumOrNot = async (req, res) => {
    try {
        // Renaming the result variable to userResult
        const userResult = await userModel.findByPk(req.user.id, { raw: true }); 
        
        console.log('Checking premium status:', userResult);

        // Now, we correctly use the Express 'res' object to send the response
        res.status(200).json({userResult});
    }
    catch (err) {
        console.error("Error checking premium status:", err);
        // Correctly using the Express 'res' object here too
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
const leaderBoard=async (req,res)=>{
    try{
        const userexpenses=await expenses.findAll({
        attributes:['userId',[Sequelize.fn('SUM', Sequelize.col('amount')), 'total_amount']],
        group:['userId'],
        raw:true,
        order: [
        // ✅ CORRECT WAY: Use Sequelize.literal to reference the aggregate alias
        [Sequelize.literal('total_amount'), 'DESC'] 
    ]
    })
    console.log('list of expenses users>>>',userexpenses)
    const users=await userModel.findAll({raw:true})
    console.log(users)
    for(let userexpense of userexpenses){
        for(let user of users){
            if(user.id===userexpense.userId){
                userexpense.name=user.name
            }
        }
    }
    console.log("userexpenses>>>",userexpenses)
    res.status(200).json({userexpenses})


    }
    catch(err){
        res.status(500).json({error:err})
    }
    
}

module.exports = {
    checkingUserIsPremiumOrNot,
    leaderBoard
};