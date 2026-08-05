export function validateFeedback(value: string, field: string) {
    const text = value.trim();

    if (!text) {
        return `${field} wajib diisi.`;
    }

    if (text.length > 2000) {
        return `${field} maksimal 2000 karakter.`;
    }

    // Reject non-printable control characters
    if (/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(text)) {
        return `${field} mengandung karakter yang tidak valid.`;
    }

    return null;
}