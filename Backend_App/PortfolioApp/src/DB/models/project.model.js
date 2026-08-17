import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        order: {
            type: Number,
            required: true,
            default: 0,
        },

        method: {
            type: String,
            trim: true,
            default: 'GET',
        },

        endpoint: {
            type: String,
            required: true,
            trim: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        points: {
            type: [String],
            default: [],
        },

        tags: {
            type: [String],
            default: [],
        },

        sourceUrl: {
            type: String,
            trim: true,
            default: '',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        collection: 'Projects',
        timestamps: true,
        strict: true,
    }
);

export const ProjectModel =
    mongoose.models.Project ||
    mongoose.model('Project', projectSchema);