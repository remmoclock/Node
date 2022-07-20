let testMsg = '2 secondes après le start'
 
console.log('Avant le start')
start()
console.log('Après le start')
 
function getMsg() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(testMsg)
        }, 2000)
    })
}
 
async function start() {
    console.log(await getMsg())
}