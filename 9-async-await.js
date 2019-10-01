const dowork = async () => {
	throw new Error('something went wrong')
	return 'Andrew'
}

dowork().then((result) => {
	console.log('result', result)
}).catch((e) => {
	console.log('e', e)
})