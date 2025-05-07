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

    // Getting shift number
    let shift = parseInt(document.getElementById("key").value);
    
    // Make sure some message is inside blank
    if (!inputMessage)
    {
        document.querySelector(".ceasar__result-text").textContent = "Field is empty. Please enter a value";
        copyButton.style.display = "none";
        return;
    }

    // If decrypting, convert the shift to its decryption equivalent
    if (action === 0) {shift = (26 - shift) % 26;}

    /*
     * (De/En)crypting 
     */

    try
    {
        result = "";

        // Process every character in the message
        for (let i = 0; i < inputMessage.length; i++) {
            const char = inputMessage[i];
            
            // Part for uppercase letters
            if (char >= 'A' && char <= 'Z')
            {
                const shifted = ((char.charCodeAt(0) - 65 + shift) % 26) + 65;
                result += String.fromCharCode(shifted);
            }
            // Part for lowercase letters
            else if (char >= 'a' && char <= 'z')
            {
                const shifted = ((char.charCodeAt(0) - 97 + shift) % 26) + 97;
                result += String.fromCharCode(shifted);
            }
            // Part for non-alphabetic characters
            else
            {
                result += char;
            }
        }
        
        // Outputing result (and telling user about possible error)
        document.querySelector(".ceasar__result-text").textContent = result;
        // Success: show copy button
        copyButton.style.display = "inline";
    }
    catch (error)
    {
        document.querySelector(".ceasar__result-text").textContent = "Something went wrong. Please check your input and try again";
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