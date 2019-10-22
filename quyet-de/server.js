const express = require('express');
// const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({ extended: false}));

// app.get('/', (request, response) => {
//     // response.send("<h2>Hello world!!</h2>");
//     // console.log(__dirname)
//     response.sendFile(__dirname + "/btvn/index.html")
// });

// app.use(express.static("fn"));

//router
app.get('/', (request, response) => {
    const fileData = fs.readFileSync("question.json", "utf-8");
    const questionList = JSON.parse(fileData);
    const randomIndex = Math.floor(Math.random() * questionList.length);
    const ramdomQuestion = questionList[randomIndex];

    console.log(ramdomQuestion)

    if(ramdomQuestion) {
        const questionDetailHTML = fs.readFileSync('./views/answer.html', "utf-8")
        const htmlWithData = questionDetailHTML
            .replace("question_content", ramdomQuestion.content)
            .replace("question_index", randomIndex)
            //nó chỉ replace 1 lần
            .replace("question_index", randomIndex)
        
        response.send(htmlWithData);
    }
    
});

app.get('/ask', (request, response) => {
    response.sendFile(__dirname + '/views/ask.html')
});

//question/1378
app.post('/answer/:questionIndex', (request, response) => {
    const fileData = fs.readFileSync("question.json", "utf-8");
    const questionList = JSON.parse(fileData);
    const question = questionList[request.params.questionIndex];
    
    if (request.body.answer == "yes") {
        question.yes += 1;
    } else {
        question.no += 1;
    }

    questionList[request.params.questionIndex] = question;
    fs.writeFileSync("question.json", JSON.stringify(questionList));
    // console.log(request.body);
    response.redirect(`/question/${request.params.questionIndex}`)
})

//params
app.get('/question/:questionIndex', (request, response) => {
    const fileData = fs.readFileSync("question.json", "utf-8");
    const questionList = JSON.parse(fileData);
    const question = questionList[request.params.questionIndex];
    
    if (question) {
        const questionDetailHTML = fs.readFileSync("./views/questionDetail.html", "utf-8")
        const htmlWithData = questionDetailHTML
            .replace("question_content", question.content)
            .replace("total_vote", question.yes + question.no)
            .replace("vote_yes", question.yes)
            .replace("vote_no", question.no)

        // console.log(htmlWithData);
        response.send(htmlWithData)
    } else {
        response.send("Câu hỏi không tồn tại!!")
    }

    // console.log(question);
    // response.sendFile(__dirname + '/views/questionDetail.html')
});

//backend router
app.post('/add-question', (request, response) => {
    // console.log("New question coming soon!")
    // request.on("data", (data) => {
    //     console.log(data + "");
    // })
    // console.log(request.body)
    // console.log(request.body.question)
    const fileData = fs.readFileSync("question.json", "utf-8");
    const questionList = JSON.parse(fileData);
    const questionContent = request.body.question;
    
    // fs.writeFileSync("question.json", questionContent)
    questionList.push({
        content: questionContent,
        yes: 0,
        no: 0,
    });
    fs.writeFileSync("question.json", JSON.stringify(questionList));

    // response.redirect("http://localhost:0808/question")
    response.redirect(`/question/${questionList.length - 1}`);
});

app.listen(6969, (err) => {
    if (err) {
        console.log(err); 
    } else {
        console.log("Server start success!")
    }
})