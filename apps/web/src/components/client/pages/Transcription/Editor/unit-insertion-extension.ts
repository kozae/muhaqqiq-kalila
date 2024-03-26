import { autocompletion, type CompletionResult, type CompletionSource } from "@codemirror/autocomplete";

// Define the list of language keywords for autocompletion
const languageKeywords = [
    "function", "return", "if", "else", "while", "for", "break", "continue", "switch", "case", "default", "try", "catch", "finally", "throw", "class", "extends", "constructor", "public", "private", "protected", "static", "import", "export", "var", "let", "const", "console", "log", "error", "typeof", "instanceof", "new", "delete", "void", "in", "of", "await", "async", "yield"
];

// Define the autocompletion source
const languageCompletionSource: CompletionSource = context => {

    if (!context.explicit && context.matchBefore(/\//) === null) {
        return null;
    }

    // Map language keywords to the completion format
    const options = languageKeywords.map(keyword => ({
        label: keyword,
        type: "keyword"
    }));

    return {
        from: context.pos,
        options: options,
        validFor: /^[\w$]*$/
    };
};

// Create the language extension with autocompletion feature
export const unitInsertionExtension =
    autocompletion({
        override: [languageCompletionSource]
    })

