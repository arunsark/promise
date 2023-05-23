const MyPromise = require("./MyPromise")


function promiseLand() {
    const p1 =  new Promise((resolve, reject) => {
        console.log("Initial")
        //reject()
        resolve("initial")
    })
    .then((value) => {
        console.log("resolved "+value)
        return value + " first"
    })
    .catch((error) => {
         console.log("errored "+error)
         return error + " error"
    })
    .then((value) => {
        console.log("then after catch "+value)
        return value + " second"
    })
    .finally((value) => {
        console.log(value)
        console.log(p1)
    })
    console.log(p1)

    new MyPromise((resolve, reject) => {
        console.log("Initial MyPromise")
        resolve()        
    })
    .then((value) => {
        console.log("resolved MyPromise")
    })
    .catch((error) => {
        console.log("errored MyPromise")
    })
    .then(() => {
        console.log("then after catch MyPromise")
    })
}

function func1() {
    return new Promise((resolve, reject) => {
        //setTimeout(reject, 100, 'func1')
        resolve('func1')
    })
}

function func2() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 100, 'func2')
    })
}

function otherPromises() {
    Promise.all([func1(), func2(), "no function"]).then(([result1, result2, result3]) => {
        console.log(`${result1} ${result2} ${result3}`)
    }).catch((error) => {
        console.log(`${error}`)
    }).finally(() => {
        console.log('all done!')
    })

    const p = Promise.all([1, 2, 3]);
    const p2 = Promise.all([1, 2, 3, Promise.resolve(444)]);
    const p3 = Promise.all([1, 2, 3, Promise.reject(555)]).catch((error)=> error);
    setTimeout(() => {
      console.log(p);
      console.log(p2);
      console.log(p3);
    });

    try {
    const mixedPromisesArray = [Promise.resolve(33), Promise.reject(44)];
    
    const p1 = Promise.all(mixedPromisesArray).then(([result1, result2])=> {
        console.log(`${result1} ${result2}`)
    }).catch((error) => console.log(error)).then(() => {console.log("then after catch");})

    console.log(`p1 is ${p1}`);
    setTimeout(() => {
      console.log("the queue is now empty");
      console.log(p1);
    });
    } catch(error) {}
}

//promiseLand()
otherPromises()