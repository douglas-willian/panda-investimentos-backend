const app = require('./index');

console.log(app);
const PORT = process.env.PORT || 3333;
console.log(PORT);
app.listen(PORT);
