const calculator = document.querySelector('#calculator')
const keys = calculator.querySelector('#keyboard')
const displayPress = document.querySelector('#last-calc')
const display = document.querySelector('#resul-screen')


keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = displayPress.textContent

        const calculate = (n1, operator, n2) => {
            let result = ''

            if (operator === '+') {
                result = parseFloat(n1) + parseFloat(n2)
            } else if (operator === '-') {
                result = parseFloat(n1) - parseFloat(n2)
            } else if (operator === 'x') {
                result = parseFloat(n1) * parseFloat(n2)
            } else if (operator === '/') {
                result = parseFloat(n1) / parseFloat(n2)
            } else if (operator === '%') {
                result = parseFloat(n1) * (parseFloat(n2) / 100)
            }

            return result
        }

        if (!action) {
            if (
                displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate'
            ) {
                displayPress.textContent = keyContent
            } else {
                displayPress.textContent = displayedNum + keyContent
            }
            calculator.dataset.previousKeyType = 'number'
        }

        if (
            action === '-' ||
            action === '+' ||
            action === 'x' ||
            action === '/' ||
            action === '%' ||
            action === 'plusMinus'
        ) {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                const calcValue = calculate(firstValue, operator, secondValue)
                displayPress.textContent = calcValue

                calculator.dataset.firstValue = calcValue
            } else {
                calculator.dataset.firstValue = displayedNum
            }

            displayPress.textContent = displayedNum + " " + action + " "
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action
        }

        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                displayPress.textContent = displayedNum + '.'
            } else if (
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) {
                displayPress.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal'
        }

        if (action === 'clear') {
            display.textContent = 0
            key.textContent = 'AC'
            calculator.dataset.previousKeyType = 'clear'
        }

        if (action === 'cancelEntry') {
            console.log('cancel Entry!')
        }

        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }

                display.textContent = calculate(firstValue, operator, secondValue)
            }
            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
        }
    }
})