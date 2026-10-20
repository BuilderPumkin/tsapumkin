/**
 * PUMKIN.DEV Academic Standards - WCAG 2.1 AA Contrast Ratio Calculator
 * Implements the official W3C Relative Luminance & Contrast Ratio Formulas:
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 * Target: Normal text contrast >= 4.5:1 (WCAG Level AA)
 */

function hexToRgb(hex) {
    hex = hex.replace('#', '').trim();
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function sRGBtoLin(c) {
    c = c / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(r, g, b) {
    return 0.2126 * sRGBtoLin(r) + 0.7152 * sRGBtoLin(g) + 0.0722 * sRGBtoLin(b);
}

function calculateContrast(hexForeground, hexBackground) {
    const [r1, g1, b1] = hexToRgb(hexForeground);
    const [r2, g2, b2] = hexToRgb(hexBackground);
    const l1 = relativeLuminance(r1, g1, b1);
    const l2 = relativeLuminance(r2, g2, b2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}

const UI_COLOR_PAIRS = [
    {
        element: 'Huy hiệu "Đã kiểm chứng" (.badge-verified)',
        fg: '#065f46',
        bg: '#ecfdf5',
        fgDesc: 'Xanh lục đậm (#065f46)',
        bgDesc: 'Xanh lục nhạt (#ecfdf5)'
    },
    {
        element: 'Huy hiệu "Cần kiểm tra lại" (.badge-needs-review)',
        fg: '#92400e',
        bg: '#fffbeb',
        fgDesc: 'Hổ phách đậm (#92400e)',
        bgDesc: 'Vàng kem nhạt (#fffbeb)'
    },
    {
        element: 'Huy hiệu "Chưa kiểm chứng" (.badge-unsupported)',
        fg: '#334155',
        bg: '#f8fafc',
        fgDesc: 'Xám đá slate (#334155)',
        bgDesc: 'Trắng xám nhạt (#f8fafc)'
    },
    {
        element: 'Nút "Thử lại" (.btn-math-retry)',
        fg: '#ffffff',
        bg: '#dc2626',
        fgDesc: 'Trắng tinh (#ffffff)',
        bgDesc: 'Đỏ tươi đậm (#dc2626)'
    },
    {
        element: 'Nút chính "Giải & Kiểm chứng" (.btn-math-primary)',
        fg: '#ffffff',
        bg: '#1e3a8a',
        fgDesc: 'Trắng tinh (#ffffff)',
        bgDesc: 'Xanh lam hải quân (#1e3a8a)'
    },
    {
        element: 'Banner "Hệ thống hiểu đề là" (.math-restate-banner)',
        fg: '#15803d',
        bg: '#f0fdf4',
        fgDesc: 'Xanh lá rừng (#15803d)',
        bgDesc: 'Xanh lá bạc hà (#f0fdf4)'
    }
];

console.log('========================================================================');
console.log(' PUMKIN.DEV - BẢNG ĐO TỶ LỆ TƯƠNG PHẢN WCAG 2.1 AA (MỤC TIÊU >= 4.5:1)');
console.log('========================================================================');

let allPassed = true;
for (const item of UI_COLOR_PAIRS) {
    const ratio = calculateContrast(item.fg, item.bg);
    const passed = ratio >= 4.5;
    if (!passed) allPassed = false;
    const statusText = passed ? '✅ ĐẠT WCAG AA' : '❌ CHƯA ĐẠT';
    console.log(`\n• Phần tử: ${item.element}`);
    console.log(`  - Màu chữ: ${item.fgDesc} | Màu nền: ${item.bgDesc}`);
    console.log(`  - Tỷ lệ tương phản đo được: ${ratio.toFixed(2)}:1 (Ngưỡng tối thiểu: 4.5:1) -> ${statusText}`);
}

console.log('\n========================================================================');
console.log(`KẾT LUẬN: ${allPassed ? '100% CÁC PHẦN TỬ ĐẠT CHUẨN WCAG 2.1 LEVEL AA' : 'CÓ PHẦN TỬ KHÔNG ĐẠT'}`);
console.log('========================================================================');
