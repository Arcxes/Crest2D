import babel from "rollup-plugin-babel";
import pkg from "./package.json";

const externals = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
]

const makeExternalPredicate = externalsArr => {
    if(externalsArr.length === 0){
        return () => false;
    }
    const externalPattern = new ReqExp(`^(${externalsArr.join('|')})($|/)`);
    return id => externalPattern.test(id);
}

export default {
    input: "src/Crest2D.js",
    external: makeExternalPredicate(externals),
    plugins: [
        babel(),
    ],
    output: [
        {file: pkg.main, name: "Crest", format: "umd"}
    ]
}