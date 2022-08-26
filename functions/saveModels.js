export const saveModels = async (modelsArray) => {
    modelsArray.forEach(async (elem, index) => {
        elem.save(err => {
            if (err) {
                console.log(err)
            } else console.log(`model number ${index + 1} has saved`)
        })
    })
}