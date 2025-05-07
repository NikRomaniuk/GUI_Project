let result = "";
let copyButton = document.getElementById("copyResult");
copyButton.style.display = "none";

document.querySelector(".form").addEventListener("submit", function(e)
{
    // Prevent page refresh
    e.preventDefault();
    
    // Getting input message
    const inputMessage = document.getElementById("mes").value;
    
    // Getting action (encrypt/decrypt)
    const action = parseInt(document.getElementById("action").value);

    // Getting keyword
    let keyword = document.getElementById("key").value;
    
    // Make sure some message and keyword is inside blank
    if (!inputMessage || !keyword)
    {
        document.querySelector(".vigenere__result-text").textContent = "Some fields are empty. Please enter a value";
        copyButton.style.display = "none";
        return;
    }

    /*
     * (De/En)crypting 
     */

    try
    {
        result = "";

        // Make sure keyword contains only letters / Regex (Regular Expressions)
        if (!/^[a-zA-Z]+$/.test(keyword))
        {
            throw new Error("Invalid keyword");
        }

        // Keyword to Uppercase and all remove non-alphabetic characters
        const key = keyword.toUpperCase().replace(/[^A-Z]/g, '');

        let keyIndex = 0;
        
        for (let i = 0; i < inputMessage.length; i++)
            {
            const char = inputMessage[i];
            
            // Part for letters characters
            if (/[a-zA-Z]/.test(char))
                {
                // Uppercase or Lowercase (It just works)
                const isUpperCase = char === char.toUpperCase();
                const baseCharCode = isUpperCase ? 65 : 97;
                
                // Convert character to 0-25 index
                const charIndex = char.toUpperCase().charCodeAt(0) - 65;
                
                // Get the key character (0-25 index)
                const keyChar = key.charCodeAt(keyIndex % key.length) - 65;
                
                // Encrypt or decrypt
                let resultIndex;
                if (action === 1) {
                    resultIndex = (charIndex + keyChar) % 26;
                } else {
                    resultIndex = (charIndex - keyChar + 26) % 26;
                }
                
                // Convert back to letters and add to result (hooray)
                const resultChar = String.fromCharCode(baseCharCode + resultIndex);
                result += resultChar;
                
                // Move to next key character
                keyIndex++;
            } else {
                // Part for non-alphabetic characters
                result += char;
            }
        }
        
        // Outputing result (and telling user about possible error)
        document.querySelector(".vigenere__result-text").textContent = result;
        // Success: show copy button
        copyButton.style.display = "inline";
    }
    catch (error)
    {
        document.querySelector(".vigenere__result-text").textContent = "Something went wrong. Please check your input fields and try again";
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