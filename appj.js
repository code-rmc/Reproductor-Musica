
const primer = [20, 392, 291, 293];
const segundo = [93, 293, 392, 823];
let res = [];
let cont = 0;

primer.forEach((a, i) => {
    if (a > segundo[i]) {
        res = [...res, (a - segundo[i])];
    } else {
        res = [...res, (segundo[i] - a)];
    }
});

cont = res.reduce((acc, valor) => acc += valor, 0);

console.log(cont);