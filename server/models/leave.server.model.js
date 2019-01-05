var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var statusTypes = ['Pending', 'Approved', 'Denied'];
var leaveType = ['EL'];

//Leave object
var leave =  {
	leaveId: Number,
	noOfDays:  {type: Number, required: true },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
	leaveStatus: { type: String, required: true, enum: statusTypes},
	appliedOn: { type: Date, default: Date.now() },
	managerComments: String,
	leaveReason: { type: String, required: true },
	leaveType: { type: String, required: true, enum: leaveType }
};

var employeeSchema = new Schema ({
	empId: Number,
    empName: String,
	empPhone: String,
	empDept: String,
    empEmail: String,
	empDoj: Date,
	leaveBalance: { type: Number, min: 0 },
	empManagerId: Number,
	appliedLeaves : [leave]
});

module.exports = mongoose.model('Employees', employeeSchema);