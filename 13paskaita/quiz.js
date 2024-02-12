function submit() {
    const question1 = document.getElementById('question1');
    const question2 = document.getElementById('question2');
    const question3 = document.getElementById('question3');
    
    const q1Answers1 = question1.getElementsByClassName('choice');
    const q1Answers2 = question2.getElementsByClassName('choice');
    const q1Answers3 = question3.getElementsByClassName('choice');
    let score = 0;
    
    let allQuestionsAnswered = true;

    if (!isOneChecked(q1Answers1) || !isOneChecked(q1Answers2) || !isOneChecked(q1Answers3)) {
        allQuestionsAnswered = false;
        const result = document.getElementById('result');
        result.textContent = "Reikia atsakyti į visus klausimus!";
        
    }

    if (allQuestionsAnswered) {
        for (let a of q1Answers1) {
            if (a.checked && a.classList.contains('choice-correct')) {
                score++;
                
            }
        }
        

        for (let a of q1Answers1) {
            if (a.checked) {
                if (a.classList.contains('choice-correct')) {
                    score++;
                }
            }
        }
        for (let a of q1Answers2) {
            if (a.checked) {
                if (a.classList.contains('choice-correct')) {
                    score++;
                }
            }
        }

        for (let a of q1Answers3) {
            if (a.checked) {
                if (a.classList.contains('choice-correct')) {
                    score++;
                }
            }
        }
        const result = document.getElementById('result');
        result.textContent = "Your score is: " + score;
    }


    function isOneChecked(answers) {
        for (let a of answers) {
            if (a.checked) {
                return true;
            }
        }
        return false;
    }

}
