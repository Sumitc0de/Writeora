export const calculateReadTime = (content) => {
    if (!content) return 1

    try {

        // Avg read time
        const wordPerMinute = 200;

        // Calculate the word count
        const words = content.trim().split(/\s+/).length;
        
        // Calculate the time
        const time = Math.ceil(words / wordPerMinute);

       return  Number(time)
    } catch (error) {
        console.log("Something is wrong with readtime")
    }
}