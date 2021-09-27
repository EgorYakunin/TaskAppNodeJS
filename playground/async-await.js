const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('numbers must be positive')
            }
            resolve(a + b)
        }, 2000)
    })
}

// async makes fincion allways return promise
const doWork = async () => {
    const sum = await add(1, 99)
    return sum
}

doWork().then((result) => {
    console.log('result: ' + result)
}).catch((e) => {
    console.log(e)
})