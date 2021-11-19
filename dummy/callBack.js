const students = [{ name: "harry", subject: "Javascript" },
                { name: "Rohan", subject: "Machine Learning" }
]

function enrollStudent(student,callback) {
    setTimeout(function () {
        console.log("I'm inside enrollment");
        students.push(student);
        callback();
    }, 5000)
}

function getStudents() {
    setTimeout(function () {
        console.log("came inside getstudents");
        let str = "";
        students.forEach(function (student) {
            str += "{"+student.name +" "+ student.subject +"}";
        })
        console.log(str);
    }, 2000);
}

let newstudent = {name: "manu", subject: "GoLang"};
enrollStudent(newstudent,getStudents);
