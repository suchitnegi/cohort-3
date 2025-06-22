// function durat(resolve) {
//     console.log("time out chlra hai");
//     setTimeout(resolve,3000);
// }

function setTimeOutPro(duration) {

    return new Promise(function(resolve,reject){
        console.log("time out chlra hai");
        reject("i am rejecting this")
        setTimeout(resolve,3000);
    });
}

function abc() {
    console.log("time out chal gya");
}

const duration = 3000;
setTimeOutPro(duration).then(abc).catch(function(e){
    console.log(e);
})

// setTimeout(abc, 5000)
// console.log("hello sb chal gya")