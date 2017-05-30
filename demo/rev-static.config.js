module.exports = {
    inputFiles: [
        "demo/*.bundle.js",
        "demo/vue/index.ejs.html",
    ],
    excludeFiles: [
        "demo/*-*.*",
        "demo/*.config.js",
    ],
    outputFiles: file => file.replace(".ejs", ""),
    ejsOptions: {
        rmWhitespace: true
    },
    sha: 256,
    customNewFileName: (filePath, fileString, md5String, baseName, extensionName) => baseName + "-" + md5String + extensionName,
    noOutputFiles: [
    ],
};
