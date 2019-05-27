const { exec, escape  } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const loginCheck = async (username, password) => {
	//防sql注入
	username = escape(username)

	//生成加密密码
	password = genPassword(password)
	console.log(password)
	password = escape(password)
	const sql = `
		select username, realname from users where username=${username} and password=${password};
	`
	const rows = await exec(sql)
	return rows[0] || {}
	// return exec(sql).then(rows => {
	// 	return rows[0] || {}
	// })
}

module.exports = {
	loginCheck
}