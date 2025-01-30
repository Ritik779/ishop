import axios from "axios";

const axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL })


const titleToSlug = (title) => {
    return title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}


const timeAgo = (dataString) => {
    const date = new Date(dataString);
    // console.log(date)
    const now = new Date()

    // console.log(now)
    date.setHours(0, 0, 0, 0)
    // console.log(date.setHours(0, 0, 0, 0))
    now.setHours(0, 0, 0, 0);
    // console.log(now.setHours(0, 0, 0, 0));

    const diffTime = Math.abs(now - date);
    // console.log(diffTime);

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffDays);


    if (diffDays === 0) {
        return "Today";
    } else if (diffDays === 1) {
        return "Yesterday";
    } else {
        return `${diffDays} days ago`
    }
}

export { titleToSlug, timeAgo, axiosInstance }