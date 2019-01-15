var express = require('express');
var router = express.Router();

var Employee = require('../model/employee.model');

router.get('/', function (req, res, next) {
  Employee.find().exec(function (err, doc) {
    if (err) return res.status(500).json({ error: err });
    else return res.status(200).json(doc);
  });
});
//get individual emp details
router.get('/:id', function (req, res, next) {
  var id = req.params["id"];

  Employee.find({ empId: id }).exec(function (err, doc) {
    if (err) return res.status(500).json({ error: err });
    else return res.status(200).json(doc);
  });
});

//get manager details

router.get('/manager/:id', function (req, res, next) {
  var id = req.params["id"];

  Employee.findOne({ empId: id }).exec(function (err, doc) {
    if (err) return res.status(500).json({ error: err });
    else {

      if (doc == null) return res.status(200).json({ status: 500, error: 'cannot find Employee details' });
      Employee.findOne({ empId: doc.empManagerId }).exec(function (err, doc) {
        if (err) return res.status(500).json({ error: err });
        else {
          return res.status(200).json(doc);
        }
      });
    }
  });

});

router.post('/applyLeave', function (req, res) {
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;
  var leaveType = req.body.leaveType;
  var leaveReason = req.body.leaveReason;
  var id = req.body.empId;

  var leave = {
    startDate: startDate,
    endDate: endDate,
    noOfDays: req.body.noOfDays,
    leaveType: leaveType,
    leaveReason: leaveReason,
    managerComments: '',
    leaveStatus: 'Pending'
  };

  Employee.findOne({ empId: id }, function (err, doc) {
    console.log(doc)
    if (err) return res.status(500).json({ error: err });
    else {

      if (leave != undefined && leave != null) {
        if (!Array.isArray(doc.appliedLeaves)) {
          doc.appliedLeaves = [];
        }
        doc.appliedLeaves.push(leave);
      }
      //Return error if leave balance is 0
      if (doc.leaveBalance <= 0) {
        return res.status(500).json({ error: 'Your leave balance is 0!' });
      }

      if (doc.leaveBalance != undefined && doc.leaveBalance != null) {
        doc.leaveBalance = doc.leaveBalance == 0 ? 0 : doc.leaveBalance - 1;

      }
      doc.save(function (err, doc) {
        if (err) return res.json({ error: err });
        else return res.status(200).json({ msg: 'Successfully saved!!' });
      });
    }
  });
});

module.exports = router;
