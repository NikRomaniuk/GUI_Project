document.querySelector('.form').addEventListener('submit', function(e) {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    
    // Получаем введенное число
    const inputNumber = document.getElementById('num').value.trim();
    
    // Получаем системы счисления
    const fromSystem = parseInt(document.getElementById('firstSystem').value);
    const toSystem = parseInt(document.getElementById('secondSystem').value);
    
    // Проверяем, что число введено
    if (!inputNumber) {
        document.querySelector('.calc__result-number').textContent = 'Please enter a number';
        return;
    }
    
    try {
        // Конвертируем число
        let result;
        
        // Если исходная и целевая системы одинаковые, просто возвращаем число
        if (fromSystem === toSystem) {
            result = inputNumber;
        } else {
            // Сначала переводим в десятичную систему
            const decimalValue = parseInt(inputNumber, fromSystem);
            
            // Проверяем, что число корректно
            if (isNaN(decimalValue)) {
                throw new Error('Invalid number for the selected number system');
            }
            
            // Затем переводим в целевую систему
            result = decimalValue.toString(toSystem).toUpperCase();
        }
        
        // Выводим результат
        document.querySelector('.calc__result-number').textContent = result;
    } catch (error) {
        document.querySelector('.calc__result-number').textContent = 'Error: ' + error.message;
    }
});