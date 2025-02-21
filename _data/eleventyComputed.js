import process from "process";
export default {
    date: (data) => process.env.NODE_ENV === "production" ? "git Last Modified" : undefined
}