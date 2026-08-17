import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
            trim: true,
            default: 'Backend Developer',
        },

        roleHighlight: {
            type: [String],
            default: ['Node.js'],
        },

        leadText: {
            type: String,
            required: true,
            trim: true,
            default:
                "I'm Nada Mahmoud, a Backend Developer focused on building reliable and scalable backend systems.",
        },

        description: {
            type: String,
            required: true,
            trim: true,
            default:
                'I enjoy designing RESTful APIs, authentication systems, and backend architectures with a strong focus on security, performance, and clean code.',
        },

        location: {
            type: String,
            trim: true,
            default: 'Cairo, Egypt',
        },

        focusAreas: {
            type: [String],
            default: ['Scalable APIs', 'Backend Security', 'Clean Architecture'],
        },

        badges: {
            type: [
                {
                    name: { type: String, required: true, trim: true },
                    icon: { type: String, required: true, trim: true },
                },
            ],
            default: [],
        },

        focusCards: {
            type: [
                {
                    icon: { type: String, required: true, trim: true },
                    title: { type: String, required: true, trim: true },
                    description: { type: String, required: true, trim: true },
                },
            ],
            default: [],
        },

        education: {
            type: [
                {
                    dateRange: { type: String, required: true, trim: true },
                    title: { type: String, required: true, trim: true },
                    subtitle: { type: String, required: true, trim: true },
                },
            ],
            default: [],
        },
    },
    {
        collection: 'About',
        timestamps: true,
        strict: true,
    }
);

export const AboutModel =
    mongoose.models.About ||
    mongoose.model('About', aboutSchema);