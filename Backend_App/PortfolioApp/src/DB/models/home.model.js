import mongoose from 'mongoose';

const homeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            default: 'Nada Mahmoud',
        },

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

        bio: {
            type: String,
            required: true,
            trim: true,
        },

        availability: {
            isAvailable: {
                type: Boolean,
                default: true,
            },

            title: {
                type: String,
                default: 'Available for work',
                trim: true,
            },

            description: {
                type: String,
                default: 'Open to new opportunities',
                trim: true,
            },
        },

        profileImage: {
            type: String,
            default: '',
        },

        resume: {
            type: String,
            default: '',
        },

        socialLinks: {
            email: {
                type: String,
                required: true,
                trim: true,
            },

            linkedin: {
                type: String,
                default: '',
                trim: true,
            },

            github: {
                type: String,
                default: '',
                trim: true,
            },
        },

        terminalStack: {
            type: [String],
            default: ['Node.js', 'Express.js', 'NestJS'],
        },
    },
    {
        collection: 'Home',
        timestamps: true,
        strict: true,
    }
);

export const HomeModel =
    mongoose.models.Home ||
    mongoose.model('Home', homeSchema);