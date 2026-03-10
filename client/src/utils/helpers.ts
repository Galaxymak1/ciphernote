export async function loadWordList(){
    let words: string[] = [];
    await fetch("/diceware_wordlist.txt")
        .then(res => res.text())
        .then(text => {
            words = text
                .split("\n")
                .map(line => line.split(/\s+/)[1])
                .filter(Boolean);
        });
    return words
}