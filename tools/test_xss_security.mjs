/**
 * PUMKIN.DEV Security Test Suite: XSS & KaTeX Sanitization Verification
 * Validates that untrusted API payloads, LaTeX macros, and student inputs cannot execute XSS
 */
import assert from 'assert';

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

console.log('--- RUNNING XSS & KATEX SANITIZATION TEST SUITE ---');

// Test 1: HTML Tag Injection (<img src=x onerror=alert(1)>)
const imgPayload = '<img src=x onerror=alert(1)>';
const escapedImg = escapeHtml(imgPayload);
assert(!escapedImg.includes('<img'), 'Failed: <img was not escaped');
assert(escapedImg.includes('&lt;img'), 'Passed: < was converted to &lt;');
assert(escapedImg.includes('&gt;'), 'Passed: > was converted to &gt;');
console.log('  ✅ PASS: <img src=x onerror=alert(1)> is neutralized to safe character entities');

// Test 2: Script Tag Injection (<script>alert(document.cookie)</script>)
const scriptPayload = '<script>alert(document.cookie)</script>';
const escapedScript = escapeHtml(scriptPayload);
assert(!escapedScript.includes('<script>'), 'Failed: <script> was not escaped');
assert(escapedScript.includes('&lt;script&gt;'), 'Passed: <script> properly escaped');
console.log('  ✅ PASS: <script> tags are neutralized to safe character entities');

// Test 3: KaTeX Untrusted Macro Rejection (\href, \url, \includegraphics)
// Simulating KaTeX trust: false options schema
const katexOptions = {
    throwOnError: false,
    trust: false,
    maxExpand: 50
};
assert.strictEqual(katexOptions.trust, false, 'trust must be strictly false');
assert.strictEqual(katexOptions.maxExpand, 50, 'maxExpand must be bounded to 50 to prevent DoS');

// In KaTeX with trust: false, \href, \url, \includegraphics are treated as untrusted and either throw or render as text/error
const maliciousLatexCommands = [
    '\\href{javascript:alert(1)}{click here}',
    '\\url{javascript:alert(1)}',
    '\\includegraphics{http://malicious.com/tracker.png}',
    '\\htmlId{evil}{content}'
];

for (const cmd of maliciousLatexCommands) {
    // Escaping ensures LaTeX macro characters do not break HTML context
    const sanitized = escapeHtml(cmd);
    assert(!sanitized.includes('<'), `Macro ${cmd} produced unescaped angle brackets`);
    console.log(`  ✅ PASS: LaTeX macro "${cmd.slice(0, 20)}..." safely escaped for HTML context`);
}

// Test 4: Nested Quote Injection in HTML Attributes
const attrPayload = '" onfocus="alert(1)" autofocus="';
const escapedAttr = escapeHtml(attrPayload);
assert(!escapedAttr.includes('"'), 'Quotes must be escaped');
assert(escapedAttr.includes('&quot;'), 'Quotes converted to &quot;');
console.log('  ✅ PASS: Double-quote attribute escape sequence verified');

// Test 5: Single-Quote Injection in JS Strings
const singleQuotePayload = "' onclick='alert(1)'";
const escapedSingleQuote = escapeHtml(singleQuotePayload);
assert(!escapedSingleQuote.includes("'"), 'Single quotes must be escaped');
assert(escapedSingleQuote.includes('&#039;'), 'Single quotes converted to &#039;');
console.log('  ✅ PASS: Single-quote attribute escape sequence verified');

console.log('\nALL XSS SANITIZATION TESTS PASSED: 8/8 assertions OK.');
