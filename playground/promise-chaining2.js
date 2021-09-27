require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndRemove('614f8c7c6be45178801d53de').then((task) => {
    console.log('Task: ' + task + ' was removed')

    return Task.countDocuments({ status: false })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log('Error: ' + e)
})
