import {createRequire} from "module";
const require = createRequire(import.meta.url);

export default [...new Set(require("./games.json").flatMap(x => x.tags))];