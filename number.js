let result = 0;
let copyButton = document.getElementById("copyResult");
copyButton.style.display = "none";

document.querySelector(".form").addEventListener("submit", function(e)
{
    // Prevent page refresh
    e.preventDefault();
    
    // Finding element containing input number
    const inputNumber = document.getElementById("num").value.trim();
    
    // Finding elements containing number sustems we need to convert from and to
    const fromSystem = parseInt(document.getElementById("firstSystem").value);
    const toSystem = parseInt(document.getElementById("secondSystem").value);
    
    // Make sure some number is inside blank
    if (!inputNumber)
    {
        document.querySelector(".calc__result-number").textContent = "Field is empty. Please enter a value";
        copyButton.style.display = "none";
        return;
    }
    
    /*
     * Converting
     */

    try
    {
        // Allowing special digits (charachters) for certain number systems / Regex (Regular Expressions)
        const regex = 
        { 
            2: /^[01]+$/, // Binary
            8: /^[0-7]+$/, // Octal
            10: /^[0-9]+$/, // Decimal
            16: /^[0-9A-Fa-f]+$/ // Hexadecimal
        };

        // Telling user about error if any
        if (!regex[fromSystem].test(inputNumber))
        {
            throw new Error("Invalid conversion");
        }
        
        // If both number systems are the same: return value :P
        if (fromSystem === toSystem)
        {
            result = inputNumber;
        }
        else
        {
            // Convert input number to decimal first
            const decimalValue = parseInt(inputNumber, fromSystem);

            
            // NaN
            if (isNaN(decimalValue))
            {
                throw new Error("Invalid conversion");
            }
            
            // Then convert decimal to selected number system
            result = decimalValue.toString(toSystem).toUpperCase();
        }
        
        // Outputing result (and telling user about possible error)
        document.querySelector(".calc__result-number").textContent = result;
        // Success: show copy button
        copyButton.style.display = "inline";
    }
    catch (error)
    {
        document.querySelector(".calc__result-number").textContent = "Invalid number. Please check your input and try again";
        // Fail: hide copy button
        copyButton.style.display = "none";
    }
});

    /*
     * Copy to Clipboard event
     */

copyButton.addEventListener("click", function()
{
    // Copy result to clipboard
    navigator.clipboard.writeText(result);

    // Change Button content after
    copyButtonState(copyButton, true);
    // And bring back to normal after short delay
    setTimeout(() => {copyButtonState(copyButton, false);}, 1000);
});

function copyButtonState(button, copied)
{
    if(copied)
    {
        button.className = "button-success";
        button.textContent = "Copied! :)";
        button.disabled = true;
    }
    else
    {
        button.className = "button";
        button.textContent = "Copy Result to Clipboard";
        button.disabled = false;
    }
}