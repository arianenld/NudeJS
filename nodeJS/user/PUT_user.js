// PUT_user.js
exports.PUT_user  =  function (req, res, _dbConnection, next) {
	//call update user
	updateUser(req, res, _dbConnection, next)
}

function  updateUser (req, res, _dbConnection, next) {
	//passes req.body so we can only type body in the future
	let body =  req.body
	console.log(body)

	//initialize sqlData array
	let sqlData = []

	//count request body
	//we need to count the body so we will know if there will be a next field to be added in the query.
	let count=0;
	for(let prop in body) {
		if (body.hasOwnProperty(prop)) {
			count++;
			console.log("request in")
		}
	}

	//UPDATE USERTABLE SET USER_ISDEL = ? WHWRE USER ID = ?
	//inside the updateUser function
	//make update sql query
	let sqlQuery = ''
	if(!body.hehe){
	 	sqlQuery =  ` UPDATE user_tbl
		SET `
	}

	else{
		sqlQuery = `UPDATE user_tbl SET user_isdel = ?`
		sqlData.push(body.user_isdel)
		console.log("Pumasok")
	}
	//concat user_fname if not empty to the sql query
	if (body.user_fname) {
		sqlQuery +=  ` user_fname = ?`
		sqlData.push(body.user_fname)

		//check if the body object we count is above 1 then we will add a comma
		if(count >  1){
			sqlQuery +=  `,`
			count--;
			console.log("first name in")
		}
	}
	//concat user_lname if not empty to the sql query
	if (body.user_lname) {
		sqlQuery +=  ` user_lname = ? `
		sqlData.push(body.user_lname)

		//check if the body object we count is above 1 then we will add a comma
		if(count >  1){
			sqlQuery +=  `,`
			count--;
			console.log("last name in")
		}
	}

	//concat user_isdel if not empty to the sql query
	//is user_isdel is one, delete.
	console.log(body.hehe)
	if (body.user_isdel) {
		
			sqlQuery +=  ` user_isdel = ? `
			sqlData.push(body.user_isdel)
			console.log(sqlQuery + " sd " + body.user_isdel)
		

		//check if the body object we count is above 1 then we will add a comma
		if(count >  1){
			sqlQuery +=  `,`
			count--;
		}
	}

	/*if (body.hehe) {
		
		sqlQuery +=  ` user_isdel = ? `
		sqlData.push(body.user_isdel)
		console.log(sqlQuery + " NASA BODY.HEHE " + body.user_isdel)
	

	//check if the body object we count is above 1 then we will add a comma
		if(count >  1){
			sqlQuery +=  `,`
			count--;
		}
	}*/
	//concat user_email if not empty to the sql query
	if (body.user_email) {
		sqlQuery +=  ` user_email = ? `
		sqlData.push(body.user_email)

		//check if the body object we count is above 1 then we will add a comma
		if(count >  1){
			sqlQuery +=  `,`
			count--;
			console.log("user name in")
		}
	}
	//concat user_role if not empty to the sql query
	if (body.user_role) {
		sqlQuery +=  ` user_role = ? `
		sqlData.push(body.user_role)

		//check if the body object we count is above 1 then we will add a comma
		if(count >  1){
			sqlQuery +=  `,`
			count--;
			console.log("role in")
		}
	}

	//add WHERE query in which id we will be updating
	//req.params.userId will be fetching the userId
	sqlData.push(req.params.userId)
	sqlQuery +=  ` WHERE user_id = ? `

	_dbConnection.query(sqlQuery, sqlData, function (err, result) {
	if (err) {
		let err = {}
		console.log('error: updateUser Err : '  + err)
		err.status  =  '500'
		err.message  =  'Internal Server Error'
		res.send(err)
	} else {
		sqlQuery = 'SELECT * FROM user_tbl WHERE user_id = ?' 
		_dbConnection.query(sqlQuery, function(err, result){
			let resp = {status: '200', user: result}
			res.send(resp)  
		})
	}
})

}

