const {BABEL_ENV, NODE_ENV} = process.env;

const cjs = BABEL_ENV === "cjs" || NODE_ENV === "test";

module.exports = {
    presets: [
        ["@babel/env", {loose: true, modules: false}],
    ],
    plugins: [
        "@babel/proposal-object-rest-spread",
        "@babel/proposal-class-properties",
        cjs && "transform-es2015-modules-commonjs",
    ].filter(Boolean),
}