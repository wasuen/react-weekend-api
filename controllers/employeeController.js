const express = require('express');
// Next we set up the Router
const router = express.Router();

// require Our Model - Remember Model is
// a representation of our data
// The model should capitalized
const Employee = require('../models/employee');
// Creating the index route
// index route should show all the fruits
 router.get('/', async (req, res, next) => {
  // req.body this is from the fetch request
  console.log(req.body, ' this is get all')
     try  {
      const allEmployees = await Employee.find();
      console.log(req.session, ' this is req.session')
      // This is the response to react
      res.json({
        code: 200,
        message: "Success", // everything worked on the server http codes
        data: allEmployees
      });

    } catch (err){

      res.send(err)

    }
});


router.post('/', async (req, res) => {

  try {
    console.log(req.body, ' this is req.body');
    console.log(req.session, ' req.session in post route')
    const createdEmployee = await Employee.create(req.body);
    
    res.json({
      status: {
        code: 201,
        message: "Success"
      },
      data: createdEmployee
    });

  } catch(err){
    console.log(err);
    res.send(err);
  }
});





router.get('/:id', async (req, res, next) => {


     try  {

        const foundEmployee = await Employee.findById(req.params.id);
        res.json({
          status: {
            code: 200,
            message: "Success"
          },
          data: foundEmployee
        });

      } catch (err){
        res.send(err);
      }



});

router.put('/:id', async (req, res) => {

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json({
      status: {
            code: 200,
            message: "resource updated successfully"
          },
      data: updatedEmployee
    });
  } catch(err){
    res.send(err)
  }
});


// Delete route
router.delete('/:id', async (req, res) => {

  try {
     const deletedEmployee = await Employee.findByIdAndRemove(req.params.id);
      res.json({
        status: {
            code: 200,
            message: "resource deleted successfully"
          }
      });
  } catch(err){
    res.send(err);
  }
});



module.exports = router;
