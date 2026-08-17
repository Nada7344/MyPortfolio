import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            trim: true,
            default: '',
        },

        linkedin: {
            type: String,
            trim: true,
            default: '',
        },

        github: {
            type: String,
            trim: true,
            default: '',
        },

        location: {
            type: String,
            trim: true,
            default: '',
        },

        badgeMethod: {
            type: String,
            trim: true,
            default: 'POST',
        },

        badgeEndpoint: {
            type: String,
            trim: true,
            default: '/contact',
        },

        badgeStatus: {
            type: String,
            trim: true,
            default: '200 OK',
        },

        heading: {
            type: String,
            trim: true,
            default: "LET'S BUILD",
        },

        headingGhost: {
            type: String,
            trim: true,
            default: 'TOGETHER',
        },

        subtitle: {
            type: String,
            trim: true,
            default: 'Open to backend roles and freelance API work — usually replies within 24h.',
        },

        reasonOptions: {
            type: [String],
            default: ['Job Opportunity', 'Freelance Project', 'Collaboration', 'Just Saying Hi'],
        },

        namePlaceholder: {
            type: String,
            trim: true,
            default: 'Your Name',
        },

        emailPlaceholder: {
            type: String,
            trim: true,
            default: 'Your@email.com',
        },

        messagePlaceholder: {
            type: String,
            trim: true,
            default: 'Message',
        },

        showReasonField: {
            type: Boolean,
            default: true,
        },

        showEmailField: {
            type: Boolean,
            default: true,
        },

        showPhoneField: {
            type: Boolean,
            default: false,
        },

        enableFormSubmission: {
            type: Boolean,
            default: true,
        },
    },
    {
        collection: 'Contact',
        timestamps: true,
        strict: true,
    }
);

export const ContactModel =
    mongoose.models.Contact ||
    mongoose.model('Contact', contactSchema);