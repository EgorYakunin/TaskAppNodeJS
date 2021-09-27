require('../src/db/mongoose')
const Task = require('../src/models/task')

// deleteTaskAndCount
const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({ status: false })

    return count
}

deleteTaskAndCount('614f8c6bd8b933286183b39b').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(`Error ${e}`)
})
