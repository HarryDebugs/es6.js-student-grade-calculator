const marksForm = document.querySelector("#marksForm");
const resultOutput = document.querySelector("#resultOutput");

const subjectIds = ["english", "maths", "science", "computer", "social"];

const getGrade = average => {
    let grade = "F";

    if (average >= 90) {
        grade = "A+";
    } else if (average >= 80) {
        grade = "A";
    } else if (average >= 70) {
        grade = "B";
    } else if (average >= 60) {
        grade = "C";
    } else if (average >= 50) {
        grade = "D";
    }

    return grade;
};

const getStatus = grade => grade === "F" ? "Needs improvement" : "Passed";

const getMarks = () => subjectIds.map(id => Number(document.querySelector(`#${id}`).value));

const calculateResult = marks => {
    const total = marks.reduce((sum, mark) => sum + mark, 0);
    const average = total / marks.length;
    const grade = getGrade(average);

    return { total, average, grade };
};

const renderResult = ({ studentName, total, average, grade }) => {
    const status = getStatus(grade);
    const statusClass = grade === "F" ? "status-message fail" : "status-message";

    resultOutput.innerHTML = `
        <p class="student-name">Student: <strong>${studentName}</strong></p>
        <div class="grade-card">
            <h3>Final Grade</h3>
            <div class="grade-value">${grade}</div>
        </div>
        <ul class="score-list">
            <li><span>Total Marks</span><strong>${total} / 500</strong></li>
            <li><span>Average</span><strong>${average.toFixed(2)}%</strong></li>
            <li><span>Grade</span><strong>${grade}</strong></li>
        </ul>
        <p class="${statusClass}">${status}</p>
    `;
};

marksForm.addEventListener("submit", event => {
    event.preventDefault();

    const studentName = document.querySelector("#studentName").value.trim();
    const marks = getMarks();
    const hasInvalidMark = marks.some(mark => Number.isNaN(mark) || mark < 0 || mark > 100);

    if (hasInvalidMark) {
        resultOutput.innerHTML = `
            <p class="status-message fail">
                Please enter valid marks between 0 and 100 for every subject.
            </p>
        `;
        return;
    }

    const { total, average, grade } = calculateResult(marks);

    renderResult({
        studentName,
        total,
        average,
        grade
    });
});

marksForm.addEventListener("reset", () => {
    resultOutput.innerHTML = `
        <p class="empty-message">Your student's result will appear here after calculation.</p>
    `;
});
