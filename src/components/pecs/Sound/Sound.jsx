export const playSoundNTimes = (src, n) => {
    let count = 0;
    const audio = new Audio(src);

    audio.addEventListener("ended", () => {
        count++;
        if (count < n) {
            audio.currentTime = 0; // tua về đầu
            audio.play();
        }
    });

    audio.play();
}