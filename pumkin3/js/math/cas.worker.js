/**
 * PUMKIN.DEV Academic Architecture
 * Module: CAS Web Worker
 * Layer: Background Mathematics Verification
 * Description: Off-main-thread CAS computations with MathJS & LaTeX Translation
 */

// Load dependencies into Worker Global Scope
try {
    importScripts('../../vendor/mathjs/math.min.js');
} catch (e) {
    try {
        importScripts('https://cdnjs.cloudflare.com/ajax/libs/mathjs/12.4.3/math.js');
    } catch (cdnErr) {
        console.error('[CASWorker] Failed to load MathJS:', cdnErr);
    }
}

try {
    importScripts('LaTeXTranslator.js');
    importScripts('CASEngine.js');
} catch (e) {
    console.error('[CASWorker] Failed to load internal CAS modules:', e);
}

self.onmessage = function(event) {
    const data = event.data;
    if (!data || !data.id || !data.type) {
        return;
    }

    const { id, type, payload } = data;

    try {
        let result = null;

        switch (type) {
            case 'ping':
                result = { pong: true, time: Date.now() };
                break;

            case 'verify_equivalence':
                result = self.CASEngine.verifyEquivalence(payload.expr1, payload.expr2, payload.options);
                break;

            case 'check_root':
                result = self.CASEngine.checkRoot(payload.equation, payload.root, payload.options);
                break;

            case 'verify_equation_step':
                result = self.CASEngine.verifyEquationStep(payload.prevStep, payload.nextStep, payload.options);
                break;

            case 'verify_derivative':
                result = self.CASEngine.verifyDerivative(payload.expr, payload.derivative, payload.variable);
                break;

            case 'verify_triangle_inequality':
                result = self.CASEngine.verifyTriangleInequality(payload.a, payload.b, payload.c);
                break;

            case 'verify_vector_collinear':
                result = self.CASEngine.verifyVectorCollinear(payload.u, payload.v);
                break;

            case 'verify_vector_dot':
                result = self.CASEngine.verifyVectorDotProduct(payload.u, payload.v, payload.expectedDot);
                break;

            case 'verify_vector_cross':
                result = self.CASEngine.verifyVectorCrossProduct(payload.u, payload.v, payload.expectedCross);
                break;

            case 'verify_angle_lines':
                result = self.CASEngine.verifyAngleBetweenLines(payload.u1, payload.u2, payload.expectedCos);
                break;

            case 'verify_sphere':
                result = self.CASEngine.verifySphere(payload.a, payload.b, payload.c, payload.d);
                break;

            case 'verify_plane_distance':
                result = self.CASEngine.verifyPlaneDistance(payload.point, payload.planeCoeffs, payload.expectedDist);
                break;

            case 'verify_combinatorics':
                result = self.CASEngine.verifyCombinatorics(payload.n, payload.k, payload.type, payload.expectedVal);
                break;

            case 'verify_circular_arrangement':
                result = self.CASEngine.verifyCircularArrangement(payload.n, payload.options, payload.expectedCount, payload.expectedProb);
                break;

            case 'simplify':
                result = self.CASEngine.simplify(payload.expr);
                break;

            default:
                self.postMessage({
                    id,
                    type,
                    success: false,
                    error: `Loại yêu cầu không được hỗ trợ: ${type}`
                });
                return;
        }

        self.postMessage({
            id,
            type,
            success: true,
            result
        });

    } catch (err) {
        self.postMessage({
            id,
            type,
            success: false,
            error: err.message || 'Lỗi không xác định trong quá trình tính toán CAS Worker'
        });
    }
};
