export const saveModels = (modelsArray) => {
    modelsArray.forEach((elem, index) => {
        elem.save(err => {
            if (err) {
                console.log(err)
            } else console.log(`model number ${index + 1} has saved`)
        })
    })
}