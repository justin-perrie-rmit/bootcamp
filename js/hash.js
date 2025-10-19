function nonNegativeHashCode(s)
{
    let h = 0;
    for (let char of s)
    {
        h = (31 * h + char.charCodeAt(0)) % 0x100000000;  // Simulate 32-bit integer overflow
    }
    return Math.abs(h);
}

function removePunctuation(input)
{
    console.log(input);
    // Remove all questions (?)
    let stringWithoutQuestions = input.replace(/\?/g, '');
    
    // Remove full stops (.) or exclamation marks (!) at the end of sentences
    let stringWithoutPunctuation = stringWithoutQuestions.replace(/([^.!?]+)[.!?]?$/, '$1');
    
    return stringWithoutPunctuation;
}