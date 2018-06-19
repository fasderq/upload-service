export const imageSchema = {
    properties: {
        fieldname: { type: 'string' },
        originalname: { type: 'string' },
        encoding: { type: 'string' },
        mimetype: { type: 'string', enum: ['image/png', 'image/jpeg'] },
        size: { type: 'number' },
        buffer: { instanceof: 'Buffer' }
    },
    required: ['fieldname', 'originalname', 'encoding', 'mimetype', 'size', 'buffer']
};
